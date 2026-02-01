import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowDownRight, Instagram, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const PromoGrid = () => {
  const cardTransition = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full">

          {/* КАРТОЧКА 01: Хиты/Новинки */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={cardTransition}
            className="relative min-h-[350px] md:h-[480px] rounded-[30px] overflow-hidden bg-[#F3F3F3] p-8 flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0">
              <img src="/images/promo/card-1-bg.png" className="w-full h-full object-cover" alt="" />
            </div>

            <div className="relative z-10">
                            <span className="inline-flex items-center justify-center px-4 py-1 border border-white/40 rounded-full text-white text-[14px] font-medium backdrop-blur-sm">
                                01
                            </span>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Маленькие превью товаров (аватарки) */}
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src={`/images/promo/thumb-${i}.png`} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Хиты', href: '/catalog?label=hit' },
                  { name: 'Новинки', href: '/catalog?label=new' },
                  { name: 'Скидки', href: '/catalog?label=sale' }
                ].map((btn) => (
                  <Link
                    key={btn.name}
                    href={btn.href}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[14px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                  >
                    {btn.name} <ArrowDownRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* КАРТОЧКА 02: Категории (Градиент) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={cardTransition}
            className="relative min-h-[350px] md:h-[480px] rounded-[30px] overflow-hidden bg-gradient-to-br from-[#FF9E7A] via-[#FF5C35] to-[#E040FB] p-8 flex flex-col justify-between"
          >
            {/* Текстура */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('/images/hero-texture-overlay.png')] bg-cover" />

            <div className="relative z-10">
                            <span className="inline-flex items-center justify-center px-4 py-1 border border-white/40 rounded-full text-white text-[14px] font-medium backdrop-blur-sm">
                                02
                            </span>
            </div>

            <div className="relative z-10 w-full">
              <ul className="space-y-0">
                {[
                  { name: 'Кремы', slug: 'creams' },
                  { name: 'Сыворотки', slug: 'serums' },
                  { name: 'Маски и патчи', slug: 'masks' },
                  { name: 'Бьюти-девайсы', slug: 'devices' }
                ].map((item) => (
                  <li key={item.slug} className="border-b border-white/20">
                    <Link
                      href={`/catalog?category=${item.slug}`}
                      className="flex items-center justify-between py-5 text-white group"
                    >
                      <span className="text-[20px] md:text-[24px] font-bold tracking-tight">{item.name}</span>
                      <ArrowDownRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* КАРТОЧКА 03: Instagram (Фиолетовый) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={cardTransition}
            className="relative min-h-[350px] md:h-[480px] rounded-[30px] overflow-hidden bg-gradient-to-br from-[#E040FB] via-[#9C27B0] to-[#00E5FF] p-8 flex flex-col justify-between"
          >
            <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-[url('/images/hero-texture-overlay.png')] bg-cover" />

            <div className="relative z-10 flex justify-between items-start">
                            <span className="inline-flex items-center justify-center px-4 py-1 border border-white/40 rounded-full text-white text-[14px] font-medium backdrop-blur-sm">
                                03
                            </span>

              {/* Кнопка Вверх (как на макете) */}
              <button className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-black transition-all">
                <ArrowUp className="w-6 h-6" />
              </button>
            </div>

            <div className="relative z-10 space-y-6">
              <Instagram className="w-16 h-16 md:w-24 md:h-24 text-white stroke-[1.2]" />
              <p className="text-white text-[16px] md:text-[18px] font-medium leading-relaxed max-w-[280px]">
                Подписывайтесь на LUNII в Instagram
                <a href="#" className="border-b border-white mx-1 hover:opacity-70 transition-opacity">@lunii.by</a>,
                чтобы первыми узнавать о новинках.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
