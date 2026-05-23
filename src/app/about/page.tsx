import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Nyota Fund | Kenyan Youth Empowerment',
  description: 'Learn about Nyota Fund - Official Kenyan government youth empowerment program providing financial support and business opportunities.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">About Nyota Fund</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
          <p className="text-textlight mb-6">
            Nyota Fund is the official Kenyan government initiative dedicated to empowering youth through financial support, 
            business training, and mentorship opportunities.
          </p>
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Vision</h2>
          <p className="text-textlight">
            To create a generation of financially independent Kenyan youth who can contribute meaningfully to the nation's economic growth.
          </p>
        </div>
      </div>
    </div>
  );
}
