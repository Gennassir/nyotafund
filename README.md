# NYOTA Fund Application Portal

A Next.js application replicating the official NYOTA Fund government youth empowerment program portal.

## Features

- **Personal Information Form**: Collects user details as they appear on National ID
- **Loan Purpose Selection**: Multiple options including business startup, expansion, education, medical, and emergency needs
- **Amount Selection**: Choose from KSh 50,000 to KSh 220,000 grants
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Government Styling**: Professional appearance matching the official portal

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management for form interactions

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main application page
├── components/           # Reusable components (if needed)
└── ...

package.json             # Dependencies and scripts
tailwind.config.js       # Tailwind configuration
tsconfig.json           # TypeScript configuration
next.config.js          # Next.js configuration
```

## Features Implemented

- ✅ Exact replica of the original NYOTA Fund portal design
- ✅ Interactive form with state management
- ✅ Responsive grid layouts for features and options
- ✅ Professional government-style UI
- ✅ Form validation and user feedback
- ✅ Hover effects and transitions
- ✅ Mobile-responsive design

## Deployment

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`.
