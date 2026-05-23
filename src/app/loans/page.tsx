import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loan Products | Nyota Fund',
  description: 'Explore our comprehensive loan products including personal, business, education, and agricultural loans for Kenyan youth.',
};

export default function LoansPage() {
  const loanProducts = [
    {
      id: 'personal',
      title: 'Personal Loans',
      icon: '🏠',
      description: 'Get funds for personal expenses, education, medical bills, or home improvements.',
      features: ['Up to KSh 220,000', 'Flexible repayment terms', 'Quick approval', 'Low interest rates'],
      requirements: ['Kenyan citizen aged 18-35', 'Valid ID', 'Proof of income', 'Bank account'],
      interestRate: '8% p.a.',
      maxAmount: 'KSh 220,000',
      processingTime: '24 hours'
    },
    {
      id: 'business',
      title: 'Business Loans',
      icon: '💼',
      description: 'Grow your business with our tailored financing solutions for startups and expansion.',
      features: ['Up to KSh 500,000', 'Business mentorship', 'Growth support', 'Flexible terms'],
      requirements: ['Registered business', 'Business plan', '6 months operation', 'Financial records'],
      interestRate: '10% p.a.',
      maxAmount: 'KSh 500,000',
      processingTime: '48 hours'
    },
    {
      id: 'education',
      title: 'Education Loans',
      icon: '🎓',
      description: 'Invest in your future with our education loans covering tuition and living expenses.',
      features: ['Up to KSh 300,000', 'Tuition coverage', 'Living expenses', 'Career guidance'],
      requirements: ['Admission letter', 'Academic records', 'Guardian guarantee', 'Age 16-30'],
      interestRate: '6% p.a.',
      maxAmount: 'KSh 300,000',
      processingTime: '72 hours'
    },
    {
      id: 'agricultural',
      title: 'Agricultural Loans',
      icon: '🚜',
      description: 'Support your farming activities with loans for equipment, seeds, and livestock.',
      features: ['Up to KSh 400,000', 'Equipment financing', 'Technical support', 'Market access'],
      requirements: ['Land ownership', 'Farming experience', 'Agricultural plan', 'Cooperative membership'],
      interestRate: '7% p.a.',
      maxAmount: 'KSh 400,000',
      processingTime: '36 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="mb-8">
            <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Loan Products
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 font-government">Flexible Financing Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Tailored loan products designed to meet the diverse needs of Kenyan youth across various sectors
          </p>
        </div>
      </section>

      {/* Loan Products Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loanProducts.map((loan) => (
              <div key={loan.id} className="group">
                <div className="bg-cardbg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border hover:border-primary/20 transform hover:-translate-y-2">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 border-b border-border">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            {loan.id === 'personal' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                            {loan.id === 'business' && <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>}
                            {loan.id === 'education' && <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>}
                            {loan.id === 'agricultural' && <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>}
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary font-government">{loan.title}</h3>
                          <p className="text-sm text-textlight font-medium">{loan.maxAmount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">{loan.interestRate}</div>
                        <p className="text-xs text-textlight">Interest Rate</p>
                      </div>
                    </div>
                    <p className="text-textlight leading-relaxed text-lg mb-6">{loan.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span className="text-sm text-green-600 font-medium">Available</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        <span className="text-sm text-blue-600 font-medium">{loan.processingTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-4 font-government">Key Features</h4>
                        <ul className="space-y-3">
                          {loan.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                              </svg>
                              <span className="text-textlight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-4 font-government">Requirements</h4>
                        <ul className="space-y-3">
                          {loan.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                              </svg>
                              <span className="text-textlight">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-8 pb-8">
                    <div className="flex space-x-4">
                      <Link href="/apply" className="flex-1 bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                        Apply Now
                      </Link>
                      <Link href="/calculator" className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-center">
                        Calculate
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6 font-government">Compare Loan Products</h2>
            <p className="text-xl text-textlight max-w-3xl mx-auto leading-relaxed font-light">
              Choose the right loan product based on your specific needs and requirements
            </p>
          </div>
          
          <div className="bg-cardbg rounded-3xl shadow-2xl overflow-hidden border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Loan Type</th>
                    <th className="px-6 py-4 text-center font-semibold">Max Amount</th>
                    <th className="px-6 py-4 text-center font-semibold">Interest Rate</th>
                    <th className="px-6 py-4 text-center font-semibold">Processing Time</th>
                    <th className="px-6 py-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loanProducts.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accentDark rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              {loan.id === 'personal' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                              {loan.id === 'business' && <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>}
                              {loan.id === 'education' && <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>}
                              {loan.id === 'agricultural' && <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>}
                            </svg>
                          </div>
                          <span className="font-semibold text-primary">{loan.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-primary">{loan.maxAmount}</td>
                      <td className="px-6 py-4 text-center font-bold text-accent">{loan.interestRate}</td>
                      <td className="px-6 py-4 text-center text-textlight">{loan.processingTime}</td>
                      <td className="px-6 py-4 text-center">
                        <Link href={`/apply?type=${loan.id}`} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">
                          Apply
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
