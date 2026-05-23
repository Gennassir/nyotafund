'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('10');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const loanTypes = [
    { type: 'Personal', rate: 8, maxAmount: 220000 },
    { type: 'Business', rate: 10, maxAmount: 500000 },
    { type: 'Education', rate: 6, maxAmount: 300000 },
    { type: 'Agricultural', rate: 7, maxAmount: 400000 }
  ];

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) || 0;
    
    if (principal > 0 && rate > 0 && term > 0) {
      const payment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const total = payment * term;
      const interest = total - principal;
      
      setMonthlyPayment(payment);
      setTotalPayment(total);
      setTotalInterest(interest);
      setShowResults(true);
    }
  };

  const selectLoanType = (rate: number, maxAmount: number) => {
    setInterestRate(rate.toString());
    setLoanAmount(maxAmount.toString());
  };

  const resetCalculator = () => {
    setLoanAmount('');
    setLoanTerm('');
    setInterestRate('10');
    setMonthlyPayment(0);
    setTotalPayment(0);
    setTotalInterest(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h1 className="text-5xl font-bold mb-6 font-government">Loan Calculator</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Calculate your monthly payments and total loan costs with our interactive loan calculator
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <div className="bg-cardbg rounded-3xl shadow-2xl p-8 border border-border">
                <h2 className="text-3xl font-bold text-primary mb-8 font-government">Calculate Your Loan</h2>
                
                {/* Quick Loan Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-4">Quick Select Loan Type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {loanTypes.map((loan) => (
                      <button
                        key={loan.type}
                        onClick={() => selectLoanType(loan.rate, loan.maxAmount)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-center"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accentDark rounded-lg flex items-center justify-center mx-auto mb-2">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            {loan.type === 'Personal' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                            {loan.type === 'Business' && <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>}
                            {loan.type === 'Education' && <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>}
                            {loan.type === 'Agricultural' && <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>}
                          </svg>
                        </div>
                        <div className="text-sm font-semibold text-primary">{loan.type}</div>
                        <div className="text-xs text-textlight">{loan.rate}% p.a.</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan Parameters */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Loan Amount (KSh)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-semibold"
                        placeholder="50000"
                        min="1000"
                        max="500000"
                      />
                      <span className="absolute right-4 top-4 text-gray-400">KSh</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Loan Term (months)</label>
                    <div className="grid grid-cols-4 gap-3">
                      {[6, 12, 24, 36].map((months) => (
                        <button
                          key={months}
                          onClick={() => setLoanTerm(months.toString())}
                          className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                            loanTerm === months.toString()
                              ? 'bg-primary text-white'
                              : 'border-2 border-gray-200 hover:border-primary'
                          }`}
                        >
                          {months}m
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full mt-3 px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-semibold"
                      placeholder="12"
                      min="1"
                      max="60"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Interest Rate (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-semibold"
                        placeholder="10"
                        min="1"
                        max="20"
                        step="0.1"
                      />
                      <span className="absolute right-4 top-4 text-gray-400">%</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={calculateLoan}
                    className="flex-1 bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                  >
                    Calculate Loan
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="px-6 py-4 border-2 border-border rounded-xl hover:border-gray-400 font-semibold transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              {showResults && (
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-24">
                  <h3 className="text-2xl font-bold text-primary mb-6 font-government">Loan Summary</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-6 text-center">
                      <div className="text-sm font-medium mb-2">Monthly Payment</div>
                      <div className="text-4xl font-bold">KSh {monthlyPayment.toFixed(2)}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-textlight mb-1">Principal</div>
                        <div className="text-xl font-bold text-primary">KSh {parseFloat(loanAmount).toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-textlight mb-1">Total Interest</div>
                        <div className="text-xl font-bold text-accent">KSh {totalInterest.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 rounded-xl p-4 text-center">
                      <div className="text-sm text-textlight mb-1">Total Payment</div>
                      <div className="text-2xl font-bold text-primary">KSh {totalPayment.toFixed(2)}</div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-primary mb-3">Payment Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-textlight">Principal Amount</span>
                          <span className="font-semibold">KSh {parseFloat(loanAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-textlight">Interest Amount</span>
                          <span className="font-semibold text-accent">KSh {totalInterest.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span>Total Amount</span>
                          <span className="text-primary">KSh {totalPayment.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Link href="/apply" className="w-full bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center block">
                      Apply for This Loan
                    </Link>
                    <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
                      Save Calculation
                    </button>
                  </div>
                </div>
              )}
              
              {!showResults && (
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">No Calculation Yet</h3>
                  <p className="text-textlight mb-6">
                    Enter your loan details and click "Calculate Loan" to see your payment breakdown
                  </p>
                  <div className="bg-primary/10 rounded-xl p-4">
                    <h4 className="font-semibold text-primary mb-2">Quick Tips:</h4>
                    <ul className="text-sm text-textlight space-y-1 text-left">
                      <li>• Lower interest rates mean lower monthly payments</li>
                      <li>• Longer terms reduce monthly payments but increase total interest</li>
                      <li>• Consider your monthly income when choosing loan terms</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center font-government">Understanding Your Loan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Principal Amount</h3>
              <p className="text-textlight">The original amount you borrow. This is the base amount on which interest is calculated.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Interest Rate</h3>
              <p className="text-textlight">The percentage charged on the principal amount. Our rates are competitive and fixed.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Loan Term</h3>
              <p className="text-textlight">The duration over which you'll repay the loan. Longer terms mean lower monthly payments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
