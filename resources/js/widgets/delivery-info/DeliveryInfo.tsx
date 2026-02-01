import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const DeliveryInfo = () => {
  // Варианты анимации для плавного появления
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#F8F9FB] overflow-hidden font-sans">
      {/* Декоративные бежевые круги (абсолютное позиционирование) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[20%] left-[40%] w-6 h-6 rounded-full bg-[#D4C3B3] opacity-60" />
        <div className="absolute bottom-[20%] left-[48%] w-5 h-5 rounded-full bg-[#D4C3B3] opacity-50" />
        <div className="absolute bottom-[15%] left-[55%] w-6 h-6 rounded-full bg-[#D4C3B3] opacity-60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-12 md:gap-32">

          {/* Блок 1: Доставка по Беларуси */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariant}
            className="flex items-start gap-6"
          >
            {/* Иконка-круг BY */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#1A1A1C] flex items-center justify-center shrink-0">
              <span className="text-[18px] md:text-[22px] font-black tracking-tighter text-[#1A1A1C]">BY</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-[20px] md:text-[26px] font-bold leading-tight uppercase tracking-wide text-[#1A1A1C]">
                Доставка <br /> по всей Беларуси
              </h3>

              {/* Методы доставки */}
              <ul className="space-y-2">
                {['Почта', 'Европочта'].map((method) => (
                  <li key={method} className="flex items-center gap-3 group">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4C3B3] transition-transform group-hover:scale-125" />
                    <span className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.15em] text-[#1A1A1C]/70 group-hover:text-[#1A1A1C] transition-colors">
                                            {method}
                                        </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Блок 2: Бесплатная доставка */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariant}
            className="flex items-start gap-6"
          >
            {/* Иконка-круг FREE */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#1A1A1C] flex items-center justify-center shrink-0">
              <span className="text-[14px] md:text-[16px] font-black tracking-widest text-[#1A1A1C]">FREE</span>
            </div>

            <div className="pt-2 md:pt-4">
              <h3 className="text-[20px] md:text-[26px] font-bold leading-tight uppercase tracking-wide text-[#1A1A1C]">
                Бесплатная доставка <br /> от 100 BYN
              </h3>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
