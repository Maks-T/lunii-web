import React from 'react';

export const CatalogBanner = () => {
  // Текст для бегущей строки
  const marqueeText = " — двойное сияние вашей кожи";

  return (
    <section
      className="relative w-full h-[280px] md:h-[420px] overflow-hidden flex flex-col justify-between bg-gradient-to-r from-[#E040FB] via-[#9C27B0] to-[#00E5FF]"
    >
      {/* 1. Задний фон (картинка поверх градиента) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{ backgroundImage: "url('/images/catalog-banner-bg.png')" }}
      >
        {/* Легкое затемнение для читаемости текста */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* 2. Хлебные крошки */}
      <div className="relative z-10 container mx-auto px-4 pt-10 md:pt-16">
        <div className="flex items-center text-white">
                    <span className="text-[12px] md:text-[14px] font-bold tracking-[0.3em] uppercase opacity-90">
                        • КАТАЛОГ •
                    </span>
        </div>
      </div>

      {/* 3. Бегущая строка */}
      <div className="relative z-10 w-full pb-8 md:pb-12 overflow-hidden">
        <div className="animate-marquee flex items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              {/* Звезда из вашего файла */}
              <img
                src="/images/star.svg"
                alt="star"
                className="w-10 h-10 md:w-20 md:h-20 mx-6 md:mx-12 shrink-0 brightness-0 invert"
              />

              <div className="flex items-baseline gap-4 md:gap-6 whitespace-nowrap font-orbitron text-white">
                {/* LUNII - Orbitron Uppercase */}
                <span className="text-[32px] md:text-[72px] font-black uppercase tracking-tighter">
                                    LUNII
                                </span>
                {/* Описание - Orbitron Lowercase */}
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
