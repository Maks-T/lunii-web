import React from 'react';
import { cn } from '@/lib/utils';

// Определяем типы разделов
type HeroVariant = 'catalog' | 'info' | 'docs';

interface PageHeroProps {
  variant: HeroVariant;
  title: string; // То что пишется сверху: • КАТАЛОГ • и т.д.
}

export const PageHero = ({ variant, title }: PageHeroProps) => {

  // Карта градиентов
  const gradients = {
    catalog: "from-[#E040FB] via-[#9C27B0] to-[#00E5FF]", // Маджента -> Циан
    info: "from-[#FB40D0] via-[#FF4081] to-[#E2FD52]",    // Маджента -> Желтый (Лайм)
    docs: "from-[#00E5FF] via-[#40FFD0] to-[#E2FD52]",    // Циан -> Желтый (Лайм)
  };

  const marqueeText = " — двойное сияние вашей кожи";

  return (
    <section className={cn(
      "relative w-full h-[280px] md:h-[420px] overflow-hidden flex flex-col justify-between bg-gradient-to-r",
      gradients[variant]
    )}>

      {/* 1. УНИВЕРСАЛЬНАЯ ТЕКСТУРА (Overlay) */}
      {/* Просим дизайнера дать этот файл прозрачным */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center mix-blend-soft-light opacity-50"
        style={{ backgroundImage: "url('/images/hero-texture-overlay.png')" }}
      />

      {/* 2. Хлебные крошки / Динамический заголовок */}
      <div className="relative z-10 container mx-auto px-4 pt-10 md:pt-16">
        <div className="flex items-center text-white">
                    <span className="text-[12px] md:text-[15px] font-bold tracking-[0.3em] uppercase opacity-90">
                        • {title} •
                    </span>
        </div>
      </div>

      {/* 3. Бегущая строка */}
      <div className="relative z-10 w-full pb-8 md:pb-12 overflow-hidden">
        <div className="animate-marquee flex items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              <img
                src="/images/star.svg"
                alt="star"
                className="w-10 h-10 md:w-20 md:h-20 mx-6 md:mx-12 shrink-0 brightness-0 invert"
              />
              <div className="flex items-baseline gap-4 md:gap-6 whitespace-nowrap font-orbitron text-white">
                                <span className="text-[32px] md:text-[72px] font-black uppercase tracking-tighter">
                                    LUNII
                                </span>
                <span className="text-[18px] md:text-[38px] font-medium lowercase tracking-tight opacity-90">
                                    {marqueeText}
                                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: flex;
                    width: max-content;
                }
            `}} />
    </section>
  );
};
