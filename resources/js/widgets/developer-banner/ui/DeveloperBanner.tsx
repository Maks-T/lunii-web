import React from 'react';
import { motion } from 'framer-motion';
import { AppButton } from '@/components/shared/ui/AppButton';

export const DeveloperBanner = () => {
  const marqueeText = " — двойное сияние вашей кожи";

  // Настройки пружины для максимальной плавности
  const springConfig = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1
  };

  // @ts-ignore
  return (
    <section className="relative w-full py-40 md:py-60 overflow-hidden bg-white font-sans">

      {/* 1. БЕГУЩАЯ СТРОКА */}
      <div className="absolute inset-0 flex items-center z-0 opacity-[0.07] pointer-events-none select-none">
        <div className="animate-marquee-slow flex items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              <img src="/images/star.svg" alt="" className="w-12 h-12 md:w-24 md:h-24 mx-10 md:mx-20 grayscale" />
              <div className="flex items-baseline gap-4 md:gap-8 whitespace-nowrap font-orbitron text-[#1A1A1C]">
                <span className="text-[40px] md:text-[100px] font-black uppercase tracking-tighter">LUNII</span>
                <span className="text-[20px] md:text-[50px] font-medium lowercase tracking-tight">{marqueeText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ОБЩИЙ КОНТЕЙНЕР (Ловит наведение на всю область) */}
      <div className="container relative z-10 mx-auto px-4 flex justify-center">
        <motion.div
          initial="initial"
          whileHover="hover"
          className="relative flex flex-col items-center"
          style={{ width: '470px', height: '500px' }}
        >

          {/* ЦВЕТНАЯ КАРТОЧКА */}
          <motion.div
            variants={{
              initial: { rotate: 5 },
              hover: { rotate: -5 }
            }}
            transition={springConfig}
            className="absolute inset-0 shadow-2xl bg-gradient-to-br from-[#E040FB] via-[#FF4081] to-[#FFD54F] will-change-transform"
            style={{
              borderRadius: '60px',
              paddingTop: '80px',
              paddingLeft: '40px',
              paddingRight: '40px'
            }}
          >
            {/* Текстура */}
            <div
              className="absolute inset-0 bg-[url('/images/catalog-banner-bg.png')] bg-cover opacity-60 mix-blend-overlay pointer-events-none"
              style={{ borderRadius: '60px' }}
            />

            {/* Контент */}
            <div className="relative z-10 space-y-10">
              <h3 className="text-white text-[28px] md:text-[32px] font-extrabold leading-tight tracking-tight">
                Разработка и Дизайн:
              </h3>
              <div className="space-y-6">
                {['Сайты', 'Лендинги'].map((item) => (
                  <div key={item} className="relative flex items-center justify-between pb-3">
                    <span className="text-white text-[22px] md:text-[26px] font-medium">{item}</span>
                    <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* БЕЛАЯ ПЛАШКА (Вынесена из-под родителя наклона для стабильности) */}
          <motion.div
            variants={{
              initial: { rotate: 0, y: 0 },
              hover: { rotate: 0, y: 5 } // Легкое смещение вниз при наведении для глубины
            }}
            transition={springConfig}
            className="absolute -bottom-20 w-[85%] bg-white/90 rounded-[45px] p-8 flex flex-col items-center text-center shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/60 z-20 will-change-transform"
          >
            <p className="text-[#1A1A1C] text-[18px] md:text-[20px] font-bold mb-6 leading-snug">
              Понравился сайт? <br />
              <span className="font-medium opacity-70">Напиши мне</span>
            </p>

            <AppButton
              href="https://t.me/your_telegram"
              target="_blank"
              variant="primary"
              className="w-full h-[60px] text-[14px] tracking-[0.2em]"
            >
              КОНТАКТ
            </AppButton>
          </motion.div>

        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
          display: flex;
          width: max-content;
        }
      `}} />
    </section>
  );
};
