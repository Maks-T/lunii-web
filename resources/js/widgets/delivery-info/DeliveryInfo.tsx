import React from 'react';
import {motion} from 'framer-motion';
import {Link} from '@inertiajs/react';
import {ShieldCheck} from 'lucide-react';
import {DeliveryBackground} from './DeliveryBackground';

export const DeliveryInfo = () => {
  // Анимация появления блоков контента
  const itemVariant = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6}}
  };

  return (
    <section className="relative py-24 md:py-40 bg-page-bg overflow-hidden font-sans">

      {/* Анимированный фон */}
      <DeliveryBackground/>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: "-100px"}}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 items-start"
        >

          {/* Блок 1: Гарантия */}
          <motion.div variants={itemVariant} className="flex items-center gap-6">
            <div
              className="w-[104px] h-[104px] rounded-full border border-[#1E1E2C] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-10 h-10 stroke-[1.2] text-[#1E1E2C]"/>
            </div>
            <h3 className="font-montserrat font-normal text-[28px] leading-[100%] uppercase text-[#1E1E2C]">
              Гарантия <br/> качества продукции
            </h3>
          </motion.div>

          {/* Блок 2: Доставка по всей Беларуси */}
          <motion.div variants={itemVariant} className="flex items-start gap-6">
            <div
              className="w-[104px] h-[104px] rounded-full border border-[#1E1E2C] flex items-center justify-center shrink-0">
              <span className="font-montserrat font-bold text-[24px] text-[#1E1E2C]">BY</span>
            </div>
            <div className="space-y-6">
              <h3 className="font-montserrat font-normal text-[28px] leading-[100%] uppercase text-[#1E1E2C]">
                Доставка <br/> по всей Беларуси
              </h3>
              <ul className="space-y-4">
                {['Почта', 'Европочта', 'Курьер - Могилев'].map((item) => (
                  <li key={item} className="flex items-center gap-4 group">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4C3B3]"/>
                    <span className="font-montserrat font-normal text-[24px] leading-[100%] uppercase text-[#1E1E2C]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Блок 3: Бесплатная доставка */}
          <motion.div variants={itemVariant} className="flex items-center gap-6">
            <div
              className="w-[104px] h-[104px] rounded-full border border-[#1E1E2C] flex items-center justify-center shrink-0">
              <span className="font-montserrat font-bold text-[18px] text-[#1E1E2C] tracking-widest">FREE</span>
            </div>
            <h3 className="font-montserrat font-normal text-[28px] leading-[100%] uppercase text-[#1E1E2C]">
              Бесплатная доставка <br/> от 100 BYN
            </h3>
          </motion.div>

        </motion.div>

        {/* Кнопка ПОДРОБНЕЕ */}
        <div className="mt-20 flex justify-end">
          <Link
            href="/delivery"
            className="group flex items-center gap-6 font-montserrat font-medium text-[24px] leading-[100%] uppercase text-[#1E1E2C] hover:opacity-60 transition-opacity"
          >
            Подробнее
            <div className="w-[72px] h-[72px] flex items-center justify-center">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none"
                   className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
                <path d="M21 21H51V51" stroke="#1E1E2C" strokeWidth="3.375" strokeLinecap="round"
                      strokeLinejoin="round"/>
                <path d="M21 51L51 21" stroke="#1E1E2C" strokeWidth="3.375" strokeLinecap="round"
                      strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};
