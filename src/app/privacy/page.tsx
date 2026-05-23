import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Nyota Fund',
  description: 'Privacy Policy for Nyota Fund loan services',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-bold mb-4 font-government">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed font-light">
            How we protect and use your personal information
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto bg-cardbg rounded-3xl shadow-2xl p-8 border border-border">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary mb-4 font-government">Information We Collect</h2>
            <p className="text-textlight mb-4">
              We collect personal information including your name, email, phone number, ID number, and financial information necessary for processing your loan application.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4 font-government">How We Use Your Information</h2>
            <p className="text-textlight mb-4">
              Your information is used solely for processing loan applications, communication regarding your applications, and compliance with regulatory requirements.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4 font-government">Data Protection</h2>
            <p className="text-textlight">
              We implement appropriate security measures to protect your personal data against unauthorized access, alteration, or destruction.
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