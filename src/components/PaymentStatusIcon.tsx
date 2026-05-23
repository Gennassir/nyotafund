'use client';

type PaymentStatusVariant = 'success' | 'failed' | 'cancelled';

const config: Record<
  PaymentStatusVariant,
  { ring: string; bg: string; icon: string; label: string }
> = {
  success: {
    ring: 'border-green-600/30',
    bg: 'bg-green-600/10',
    icon: 'text-green-600',
    label: 'Success',
  },
  failed: {
    ring: 'border-red-500/30',
    bg: 'bg-red-500/10',
    icon: 'text-red-600',
    label: 'Failed',
  },
  cancelled: {
    ring: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    icon: 'text-amber-600',
    label: 'Cancelled',
  },
};

export default function PaymentStatusIcon({
  variant,
  title,
  description,
}: {
  variant: PaymentStatusVariant;
  title?: string;
  description?: string;
}) {
  const { ring, bg, icon, label } = config[variant];
  const displayTitle = title ?? label;

  return (
    <div className="flex flex-col items-center text-center py-4">
      <div
        aria-hidden="true"
        className={`w-24 h-24 rounded-full border-4 ${ring} ${bg} flex items-center justify-center mb-4`}
      >
        {variant === 'success' && (
          <svg className={`w-12 h-12 ${icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {variant === 'failed' && (
          <svg className={`w-12 h-12 ${icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {variant === 'cancelled' && (
          <svg className={`w-12 h-12 ${icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-primary font-government">{displayTitle}</h3>
      {description && <p className="text-textlight mt-2 max-w-sm text-sm">{description}</p>}
    </div>
  );
}
