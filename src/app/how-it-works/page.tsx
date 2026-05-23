import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Nyota Fund',
  description: 'Learn how Nyota Fund works - from application to disbursement. Simple steps to access youth empowerment funds.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Register Your Account',
      description: 'Create your Nyota Fund account with your personal details and national ID information.'
    },
    {
      number: 2,
      title: 'Choose Your Loan Type',
      description: 'Select from personal, business, education, or agricultural loans based on your needs.'
    },
    {
      number: 3,
      title: 'Submit Application',
      description: 'Fill out the application form with required documents and submit for review.'
    },
    {
      number: 4,
      title: 'Get Approval',
      description: 'Your application will be reviewed and approved within 24-48 hours.'
    },
    {
      number: 5,
      title: 'Receive Funds',
      description: 'Approved funds are disbursed directly to your M-Pesa account within minutes.'
    }
  ];

  return (
    <div className="min-h-screen bg-lightbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">How It Works</h1>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-textlight">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
