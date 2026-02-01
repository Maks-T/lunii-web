import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface AppButtonProps {
    href?: string;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'outline' | 'ghost';
    onClick?: () => void;
}

export const AppButton = ({ href, children, className, variant = 'primary', onClick }: AppButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-4 text-[11px] md:text-[12px] font-bold tracking-[0.15em] transition-all duration-300 uppercase";

    const variants = {
        primary: "bg-[#1A1A1C] text-white hover:bg-[#2A2A2D] shadow-lg hover:shadow-xl",
        outline: "border border-slate-200 text-[#1A1A1C] hover:bg-slate-50",
        ghost: "text-[#1A1A1C] hover:bg-slate-100"
    };

    const combinedClasses = cn(baseStyles, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    );
};
