'use client';

export default function SuccessTick({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        className="w-8 h-8 rounded-full bg-green-600/10 border border-green-600/25 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-8.002 8.127a1 1 0 0 1-1.42-.01L3.29 10.844a1 1 0 1 1 1.416-1.4l3.003 3.06 7.296-7.41a1 1 0 0 1 1.399-.794Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {message ? <p className="text-sm font-semibold text-green-700">{message}</p> : null}
    </div>
  );
}
