'use client';

import Link from 'next/link';
import LoanPackageGrid from '@/components/LoanPackageGrid';
import { MIN_LOAN_AMOUNT } from '@/lib/loan-packages';

export default function Home() {
  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <main>
        {/* Hero Section */}
        <section className="relative text-white py-32 overflow-hidden">
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
                Get the financial support you need with flexible repayment options and competitive
                interest rates. Your dreams are within reach with Nyota Fund.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/#loan-packages"
                  className="bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
                >
                  Apply for Loan
                </Link>
                <Link
                  href="/calculator"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
                >
                  Loan Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Packages — quick selection */}
        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-primary/5 to-secondary/5" id="loan-packages">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                Loan Packages
              </span>
              <h2 className="text-5xl font-bold text-primary mb-6 font-government">
                Choose Your Loan Amount
              </h2>
              <p className="text-xl text-textlight max-w-3xl mx-auto leading-relaxed font-light">
                 Select a package below to start your application. Each package includes a one-time
                 processing fee. Loans from KSh{' '}
                {MIN_LOAN_AMOUNT.toLocaleString()} upwards.
              </p>
            </div>
            <LoanPackageGrid />
            <div className="text-center mt-12">
              <Link
                href="/apply"
                className="inline-block bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl"
              >
                Open Full Application Form
              </Link>
            </div>
          </div>
        </section>

        {/* Our Loan Products Section */}
        <section className="py-24 px-6 sm:px-8 lg:px-12 bg-lightbg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-primary mb-6 font-government">Our Loan Products</h2>
              <p className="text-xl text-textlight max-w-4xl mx-auto leading-relaxed font-light">
                We offer a variety of loan products tailored to meet your specific needs. Each
                designed with flexible terms and competitive rates to support your financial journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">
                  Personal Loans
                </h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Get funds for personal expenses, education, medical bills, or home improvements
                  with flexible repayment terms.
                </p>
              </div>

              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">
                  Business Loans
                </h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Grow your business with our tailored financing solutions for startups, expansion,
                  or working capital.
                </p>
              </div>

              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">
                  Education Loans
                </h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Invest in your future with our education loans covering tuition, books, and living
                  expenses.
                </p>
              </div>

              <div className="group bg-cardbg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-border hover:border-primary/20 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center font-government">
                  Agricultural Loans
                </h3>
                <p className="text-textlight leading-relaxed text-center text-lg">
                  Support your farming activities with loans for equipment, seeds, livestock, and farm
                  expansion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 sm:px-8 lg:px-12 bg-cardbg border-y border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-4 font-government">Ready to Apply?</h2>
             <p className="text-lg text-textlight mb-8">
               Complete your application online to get started.
             </p>
            <Link
              href="/apply"
              className="inline-block bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl"
            >
              Start Application
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-accent rotate-45">
            <path
              fill="currentColor"
              d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-accent mb-4">Nyota Fund</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Empowering Kenyan youth with financial opportunities and business support through
                accessible funding solutions.
              </p>
              <div className="text-sm text-gray-400">
                <p>Government of Kenya</p>
                <p>Ministry of Youth Affairs & Sports</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-accent mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-accent transition-colors">
                    About Nyota Fund
                  </Link>
                </li>
                <li>
                  <Link href="/#loan-packages" className="text-gray-300 hover:text-accent transition-colors">
                    Loan Packages
                  </Link>
                </li>
                <li>
                  <Link href="/loans" className="text-gray-300 hover:text-accent transition-colors">
                    Loan Products
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="text-gray-300 hover:text-accent transition-colors">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-gray-300 hover:text-accent transition-colors">
                    Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-accent mb-4">Contact Info</h3>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>Ministry of Youth Affairs & Sports, Nairobi, Kenya</p>
                <p>+254 20 123 456 · info@nyotafund.go.ke</p>
                <p>Mon – Fri: 8:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            &copy; 2024 Nyota Fund - Ministry of Youth Affairs & Sports. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
