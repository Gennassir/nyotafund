import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions - Nyota Fund',
  description: 'Terms and Conditions for Nyota Fund loan services',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-bold mb-4 font-government">Terms and Conditions</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Terms governing the use of Nyota Fund services
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto bg-cardbg rounded-3xl shadow-2xl p-8 border border-border">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary mb-4 font-government">Acceptance of Terms</h2>
            <p className="text-textlight mb-4">
              By using Nyota Fund services, you agree to be bound by these terms and conditions.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4 font-government">Loan Processing Fee</h2>
             <p className="text-textlight mb-4">
               All loan applications require a non-refundable processing fee.
             </p>

            <h2 className="text-2xl font-bold text-primary mb-4 font-government">Eligibility</h2>
            <p className="text-textlight">
              You must be a Kenyan citizen, at least 18 years old, and provide valid identification to apply for our loan services.
            </p>

            <div className="mt-8 text-center">
              <Link href="/" className="text-accent hover:text-accentDark font-semibold transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}