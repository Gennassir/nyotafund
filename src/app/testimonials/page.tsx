import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Success Stories | Nyota Fund',
  description: 'Read inspiring success stories from Kenyan youth who have benefited from Nyota Fund loans and transformed their lives.',
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Mary Wanjiru',
      loanType: 'Business Loan',
      amount: 'KSh 150,000',
      story: 'With Nyota Fund, I started my own tailoring business. Now I employ 3 people and my income has tripled.',
      location: 'Nairobi',
      rating: 5,
      date: 'March 2024',
      avatar: 'MW'
    },
    {
      name: 'John Kamau',
      loanType: 'Agricultural Loan',
      amount: 'KSh 100,000',
      story: 'I bought modern farming equipment and my harvest increased by 60%. Nyota Fund changed my life.',
      location: 'Nakuru',
      rating: 5,
      date: 'February 2024',
      avatar: 'JK'
    },
    {
      name: 'Grace Achieng',
      loanType: 'Education Loan',
      amount: 'KSh 80,000',
      story: 'I completed my degree in Business Administration and now work at a leading bank in Kenya.',
      location: 'Kisumu',
      rating: 5,
      date: 'January 2024',
      avatar: 'GA'
    },
    {
      name: 'David Mutiso',
      loanType: 'Personal Loan',
      amount: 'KSh 50,000',
      story: 'I used the loan to complete my house and provide better living conditions for my family.',
      location: 'Machakos',
      rating: 5,
      date: 'December 2023',
      avatar: 'DM'
    },
    {
      name: 'Sarah Wanjiku',
      loanType: 'Business Loan',
      amount: 'KSh 200,000',
      story: 'I expanded my small shop into a supermarket. Now I serve over 100 customers daily and created 8 jobs.',
      location: 'Eldoret',
      rating: 5,
      date: 'November 2023',
      avatar: 'SW'
    },
    {
      name: 'Michael Ochieng',
      loanType: 'Education Loan',
      amount: 'KSh 120,000',
      story: 'I pursued my master\'s degree in Engineering and now work as a senior engineer at a leading firm.',
      location: 'Mombasa',
      rating: 5,
      date: 'October 2023',
      avatar: 'MO'
    }
  ];

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <h1 className="text-5xl font-bold mb-6 font-government">Transforming Lives</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Real stories from Kenyan youth who have transformed their dreams into reality with Nyota Fund support
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                {/* iOS-style Card */}
                <div className="bg-cardbg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border hover:border-primary/20 transform hover:-translate-y-2">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-accentDark rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-primary font-government">{testimonial.name}</h3>
                          <p className="text-sm text-textlight font-medium">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                        <p className="text-xs text-textlight">{testimonial.date}</p>
                      </div>
                    </div>
                    
                    {/* Loan Type Badge */}
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        {testimonial.loanType}
                      </span>
                      <span className="text-sm font-bold text-primary">{testimonial.amount}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <svg className="w-8 h-8 text-accent/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                    <p className="text-textlight leading-relaxed text-lg italic group-hover:text-primary transition-colors">
                      "{testimonial.story}"
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-textlight font-medium">Verified Success Story</span>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span className="text-xs text-green-600 font-medium">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6 font-government">Start Your Success Story</h2>
          <p className="text-xl text-textlight mb-8 leading-relaxed font-light">
            Join thousands of Kenyan youth who have already transformed their dreams into reality with Nyota Fund
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/apply" className="bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg">
              Apply Now
            </Link>
            <Link href="/calculator" className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Calculate Loan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
