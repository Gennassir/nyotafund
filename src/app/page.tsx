'use client';

import { useState } from 'react';
import Link from 'next/link';
import './globals.css';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    purpose: '',
    amount: '',
    mpesaNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment processed successfully!');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <main>
        {/* Hero Section */}
        <section className="relative text-white py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50"></div>
            <img 
              src="/flag.jpeg" 
              alt="Kenyan Flag Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl lg:text-7xl font-bold mb-8 font-government leading-tight">
                Affordable Loans for Kenyans
              </h1>
              <p className="text-xl lg:text-2xl mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                Get the financial support you need with flexible repayment options and competitive interest rates. Your dreams are within reach with Nyota Fund.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/apply" className="bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg">
                  Apply for Loan
                </Link>
                <Link href="/calculator" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg">
                  Loan Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Loan Products Section */}
        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-lightbg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-primary mb-6 font-government">Our Loan Products</h2>
              <p className="text-xl text-textlight max-w-4xl mx-auto leading-relaxed font-light">
                We offer a variety of loan products tailored to meet your specific needs. Each designed with flexible terms and competitive rates to support your financial journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Personal Loans Card */}
              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">Personal Loans</h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Get funds for personal expenses, education, medical bills, or home improvements with flexible repayment terms.
                </p>
              </div>

              {/* Business Loans Card */}
              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">Business Loans</h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Grow your business with our tailored financing solutions for startups, expansion, or working capital.
                </p>
              </div>

              {/* Education Loans Card */}
              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">Education Loans</h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Invest in your future with our education loans covering tuition, books, and living expenses.
                </p>
              </div>

              {/* Agricultural Loans Card */}
              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">Agricultural Loans</h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Support your farming activities with loans for equipment, seeds, livestock, and farm expansion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-primary mb-6 font-government">Apply for NYOTA Fund</h2>
              <p className="text-xl text-textlight max-w-3xl mx-auto leading-relaxed font-light">
                Complete your application in just a few simple steps. Our streamlined process ensures quick approval and disbursement.
              </p>
            </div>

            <div className="bg-cardbg rounded-3xl shadow-2xl p-12 border border-border">
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-primary mb-4 font-government">Personal Information</h3>
                <p className="text-textlight mb-8 text-lg">Please provide your details as they appear on your National ID Card</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="National ID number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      placeholder="07XX XXX XXX"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-primary mb-4 font-government">Select Loan Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { id: 'personal', title: 'Personal Loan' },
                    { id: 'business', title: 'Business Loan' },
                    { id: 'education', title: 'Education Loan' },
                    { id: 'agricultural', title: 'Agricultural Loan' }
                  ].map((loan) => (
                    <div key={loan.id} className="relative">
                      <input
                        type="radio"
                        id={loan.id}
                        name="purpose"
                        value={loan.id}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={loan.id}
                        className="block p-6 border-2 border-border rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:border-primary transition-all text-center font-semibold text-lg"
                      >
                        {loan.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-primary mb-4 font-government">Select Amount</h3>
                <p className="text-textlight mb-8 text-lg">Choose the loan amount that suits your needs</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {['50000', '100000', '150000', '220000'].map((amount) => (
                    <div key={amount} className="relative">
                      <input
                        type="radio"
                        id={`amount${amount}`}
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={`amount${amount}`}
                        className="block p-6 border-2 border-border rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:border-primary transition-all text-center font-bold text-xl"
                      >
                        KSh {parseInt(amount).toLocaleString()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-primary mb-4 font-government">M-Pesa Payment</h3>
                <p className="text-textlight mb-8 text-lg">Enter your M-Pesa registered phone number to proceed</p>
                <div className="max-w-2xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">M-Pesa Phone Number</label>
                  <input
                    type="tel"
                    name="mpesaNumber"
                    value={formData.mpesaNumber}
                    onChange={handleInputChange}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg mb-8"
                    required
                  />
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing Application...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-12 relative overflow-hidden">
        {/* Background star graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-accent rotate-45">
            <path fill="currentColor" d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nyota Fund Section */}
            <div>
              <h3 className="text-xl font-bold text-accent mb-4">Nyota Fund</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Empowering Kenyan youth with financial opportunities and business support through accessible funding solutions.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com/nyotafund" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accentDark transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/nyotafund" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accentDark transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/nyotafund" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accentDark transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
              </div>
              <div className="text-sm text-gray-400">
                <p>Government of Kenya</p>
                <p>Ministry of Youth Affairs & Sports</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-xl font-bold text-accent mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors">About Nyota Fund</Link></li>
                <li><Link href="/loans" className="text-gray-300 hover:text-accent transition-colors">Loan Products</Link></li>
                <li><Link href="/how-it-works" className="text-gray-300 hover:text-accent transition-colors">Application Process</Link></li>
                <li><Link href="/testimonials" className="text-gray-300 hover:text-accent transition-colors">Success Stories</Link></li>
                <li><Link href="/calculator" className="text-gray-300 hover:text-accent transition-colors">Loan Calculator</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div>
              <h3 className="text-xl font-bold text-accent mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Ministry of Youth Affairs & Sports</p>
                    <p className="text-gray-400 text-sm">Nairobi, Kenya</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">+254 20 123 456</p>
                    <p className="text-gray-400 text-sm">+254 712 345 678</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">info@nyotafund.go.ke</p>
                    <p className="text-gray-400 text-sm">support@nyotafund.go.ke</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-400 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2024 Nyota Fund - Ministry of Youth Affairs & Sports. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-accent transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-accent transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="text-gray-400 hover:text-accent transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
