import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface AppButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export const AppButton = ({
                            href,
                            children,
                            className,
                            variant = 'primary',
                            onClick,
                            target,
                            rel,
                            disabled=false
                          }: AppButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-4 text-[11px] md:text-[12px] font-bold tracking-[0.15em] transition-all duration-300 uppercase whitespace-nowrap cursor-pointer";

  const variants = {
    primary: "bg-[#1A1A1C] text-white hover:bg-[#2A2A2D] shadow-lg hover:shadow-xl",
    outline: "border border-slate-200 text-[#1A1A1C] hover:bg-slate-50",
    ghost: "text-[#1A1A1C] hover:bg-slate-100"
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

  // 1. Если это внешняя ссылка (начинается с http) или указан target
  // Мы используем обычный <a>, чтобы Inertia не перехватывала клик
  const isExternal = href?.startsWith('http') || target;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          // Автоматически добавляем безопасность для внешних ссылок
          rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
          className={combinedClasses}

        >
          {children}
        </a>
      );
    }

    // 2. Внутренняя ссылка для SPA-переходов
    return (
      <Link href={href} className={combinedClasses} disabled={disabled}>
        {children}
      </Link>
    );
  }

  // 3. Обычная кнопка
  return (
    <button onClick={onClick} className={combinedClasses} type="button"  disabled={disabled}>
      {children}
    </button>
  );
};
