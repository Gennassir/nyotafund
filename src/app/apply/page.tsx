'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  LOAN_PACKAGES,
  formatPackageOption,
  getProcessingFee,
} from '@/lib/loan-packages';
import SuccessTick from '@/components/SuccessTick';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    county: '',
    phoneNumber: '',
    dateOfBirth: '',
    loanType: '',
    loanAmount: '',
    loanPurpose: '',
    monthlyIncome: '',
    employmentStatus: '',
    businessName: '',
    businessType: '',
    businessDuration: '',
    mpesaNumber: '',
    agreeTerms: false,
  });

  const loanTypes = [
    'Personal Loan',
    'Business Loan',
    'Education Loan',
    'Agricultural Loan',
  ];

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kitale',
    'Thika', 'Malindi', 'Garissa', 'Wajir', 'Mandera', 'Marsabit',
    'Isiolo', 'Meru', 'Embu', 'Kitui', 'Machakos', 'Makueni',
    'Kajiado', 'Kericho', 'Bomet', 'Kakamega', 'Vihiga', 'Bungoma',
    'Busia', 'Siaya', 'Kisii', 'Nyamira', 'Nyandarua', 'Laikipia',
    'Nyeri', 'Kirinyaga', 'Muranga', 'Kiambu', 'Turkana', 'West Pokot',
    'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet', 'Nandi',
    'Baringo', 'Koibatek', 'Tana River', 'Lamu', 'Taita Taveta', 'Kwale',
    'Kilifi', 'Homa Bay', 'Migori',
  ];

  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<string | null>(null);
  const [submittedMpesa, setSubmittedMpesa] = useState('');
  const [submittedProcessingFee, setSubmittedProcessingFee] = useState<number | null>(null);

  const selectedProcessingFee = useMemo(
    () => getProcessingFee(formData.loanAmount),
    [formData.loanAmount]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    setSubmittedApplicationId(null);
    setSubmittedMpesa('');
    setSubmittedProcessingFee(null);

    const processingFee = getProcessingFee(formData.loanAmount);
    if (!processingFee) {
      alert('Please select a valid loan package.');
      return;
    }

    if (!isSupabaseConfigured()) {
      alert(
        'Applications cannot be saved: Supabase is not configured. Add environment variables in Vercel.'
      );
      return;
    }

    try {
      const loanAmount = Number(formData.loanAmount);
      const placeholderEmail = `${formData.idNumber.replace(/\s/g, '')}@nyota-applicant.local`;

      const { data, error } = await getSupabase()
        .from('loan_applications')
        .insert([
          {
            full_name: formData.fullName,
            id_number: formData.idNumber,
            phone_number: formData.phoneNumber,
            email: placeholderEmail,
            date_of_birth: formData.dateOfBirth,
            county: formData.county,
            sub_county: '—',
            ward: '—',
            loan_type: formData.loanType,
            loan_amount: loanAmount,
            loan_purpose: formData.loanPurpose,
            monthly_income: parseFloat(formData.monthlyIncome),
            employment_status: formData.employmentStatus,
            business_name: formData.businessName || null,
            business_type: formData.businessType || null,
            business_duration: formData.businessDuration || null,
            mpesa_number: formData.mpesaNumber,
            status: 'pending',
          },
        ])
        .select();

      if (error) {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please try again.');
        return;
      }

      const applicationId = data?.[0]?.id as string | undefined;
      setSubmittedApplicationId(applicationId ?? null);
      setSubmittedMpesa(formData.mpesaNumber || formData.phoneNumber);
      setSubmittedProcessingFee(processingFee);
      setShowSuccess(true);

      setFormData({
        fullName: '',
        idNumber: '',
        county: '',
        phoneNumber: '',
        dateOfBirth: '',
        loanType: '',
        loanAmount: '',
        loanPurpose: '',
        monthlyIncome: '',
        employmentStatus: '',
        businessName: '',
        businessType: '',
        businessDuration: '',
        mpesaNumber: '',
        agreeTerms: false,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-bold mb-4 font-government">Apply for Nyota Fund</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Complete your loan application in just a few simple steps
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-cardbg rounded-3xl shadow-2xl p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-8">
              {showSuccess && submittedProcessingFee && (
                <div className="bg-green-600/5 border border-green-600/20 rounded-2xl p-4 space-y-4">
                  <SuccessTick />
                  <p className="text-center text-textlight text-sm">
                    Pay the KSh {submittedProcessingFee.toLocaleString()} processing fee for your
                    selected loan package.
                  </p>
                  <Link
                    href={`/pay?purpose=processing_fee&amount=${submittedProcessingFee}&phone=${encodeURIComponent(submittedMpesa)}${submittedApplicationId ? `&applicationId=${submittedApplicationId}` : ''}`}
                    className="block w-full text-center bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all"
                  >
                    Pay Processing Fee (M-Pesa)
                  </Link>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 font-government">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full name as per ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      National ID Number *
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your ID number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      County *
                    </label>
                    <select
                      name="county"
                      value={formData.county}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select County</option>
                      {counties.map((county) => (
                        <option key={county} value={county}>
                          {county}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 font-government">
                  Contact &amp; Financial Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Income (KSh) *
                    </label>
                    <input
                      type="number"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your monthly income"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary mb-6 font-government">
                  Loan Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Type *
                    </label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Loan Type</option>
                      {loanTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Package *
                    </label>
                    <select
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select loan package</option>
                      {LOAN_PACKAGES.map((pkg) => (
                        <option key={pkg.amount} value={pkg.amount}>
                          {formatPackageOption(pkg)}
                        </option>
                      ))}
                    </select>
                    {selectedProcessingFee !== null && (
                      <p className="mt-2 text-sm text-accent font-medium">
                        Processing fee: KSh {selectedProcessingFee.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Employment Status *
                    </label>
                    <select
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Status</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="business-owner">Business Owner</option>
                      <option value="student">Student</option>
                      <option value="unemployed">Unemployed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      M-Pesa Number *
                    </label>
                    <input
                      type="tel"
                      name="mpesaNumber"
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Purpose *
                  </label>
                  <textarea
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe how you plan to use the loan funds"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                  />
                  <label htmlFor="agreeTerms" className="ml-3 text-sm text-textlight">
                    I confirm that all information provided is accurate and I agree to the{' '}
                    <Link href="/terms" className="text-accent hover:text-accentDark transition-colors">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-accent hover:text-accentDark transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit Application
                </button>
                <Link
                  href="/calculator"
                  className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Calculate Loan
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
