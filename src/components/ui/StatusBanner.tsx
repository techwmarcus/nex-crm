import * as React from 'react';
import { cn } from '../../utils/cn';

type StatusBannerProps = {
  message: string;
  variant?: 'warning' | 'info' | 'error';
};

const variantStyles: Record<NonNullable<StatusBannerProps['variant']>, string> = {
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  error: 'bg-red-50 text-red-700 border-red-200',
};

export function StatusBanner({ message, variant = 'warning' }: StatusBannerProps) {
  return (
    <div className={cn(
      'rounded-xl border px-4 py-3 text-sm font-medium',
      variantStyles[variant],
    )}>
      {message}
    </div>
  );
}
