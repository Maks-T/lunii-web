import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { ProductLabels } from '@/entities/product/ui/ProductLabels';
import { AppButton } from '@/components/shared/ui/AppButton';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Show({ product }: any) {
  const [activeImg, setActiveImg] = useState(
    product.images.find((i: any) => i.is_main)?.path || product.images[0]?.path
  );

  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : null;

  return (
    <MainLayout>
      <Head title={product.name} />

      <section className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-16">

          {/* ГЛАВНАЯ СЕТКА: 12 колонок */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-24">

            {/* --- ЛЕВАЯ ЧАСТЬ (Галерея): 5 колонок --- */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">

                {/* Главное фото */}
                <div className="relative aspect-square bg-[#F8F8F8] overflow-hidden rounded-sm border border-slate-50">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={`/storage/${activeImg}`}
                      className="w-full h-full object-contain p-6 md:p-10"
                      alt={product.name}
                    />
                  </AnimatePresence>

                  <ProductLabels
                    labels={product.labels}
                    discount={discount}
                    className="absolute top-0 left-0"
                  />

                  <button className="absolute top-6 right-6 text-[#C4C4C4] hover:text-[#FF5C35] transition-colors cursor-pointer">
                    <Heart className="w-8 h-8 stroke-[1.2]" />
                  </button>
                </div>

                {/* Миниатюры */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(img.path)}
                      className={cn(
                        "w-20 h-20 md:w-24 md:h-24 border-2 transition-all shrink-0 bg-[#F8F8F8] p-2",
                        activeImg === img.path ? "border-[#C2B09A]" : "border-transparent opacity-60"
                      )}
                    >
                      <img src={`/storage/${img.path}`} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>

                {/* Блок доставки под фото (Desktop) */}
                <div className="hidden lg:flex items-center gap-10 pt-10 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-[11px] font-black italic">BY</div>
                    <span className="text-[11px] font-bold uppercase tracking-widest leading-tight">Доставка <br/> по всей РБ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-[11px] font-black italic">FREE</div>
                    <span className="text-[11px] font-bold uppercase tracking-widest leading-tight">Бесплатно <br/> от 100 BYN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- ПРАВАЯ ЧАСТЬ (Инфо): 7 колонок --- */}
            <div className="lg:col-span-7">
              <div className="flex flex-col h-full">

                {/* Шапка контента с названием и ценой */}
                <div className="relative mb-12 border-b border-slate-200 pb-8 pr-4">
                  <p className="text-[14px] text-slate-400 uppercase tracking-[0.2em] mb-4 font-medium">
                    {product.category}
                  </p>

                  <h1 className="text-[32px] md:text-[44px] font-black text-[#1A1A1C] leading-[1.1] tracking-tight pr-36">
                    {product.name}
                  </h1>

                  {/* Цена (Позиционирование как в дизайне) */}
                  <div className="absolute top-0 right-0 text-right">
                    <div className={cn(
                      "text-[28px] md:text-[38px] font-black leading-none",
                      product.old_price ? "text-[#FF5C35]" : "text-[#C5B4A2]"
                    )}>
                      {product.price} BYN
                    </div>
                    {product.old_price && (
                      <div className="text-[18px] md:text-[20px] text-slate-300 line-through font-medium mt-2">
                        {product.old_price} BYN
                      </div>
                    )}
                  </div>
                </div>

                {/* Таблица характеристик */}
                <div className="space-y-0 mb-10">
                  {product.attributes.map((attr: any, i: number) => (
                    <div key={i} className="flex justify-between items-baseline py-5 border-b border-slate-100 gap-8">
                      <span className="text-[15px] md:text-[16px] font-black text-[#1A1A1C] uppercase tracking-widest whitespace-nowrap">
                        {attr.name}
                      </span>
                      <span className="text-[15px] md:text-[17px] text-slate-500 text-right font-light italic leading-snug">
                        {attr.values.toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Описание */}
                <div className="space-y-6 mb-16">
                  <h4 className="text-[16px] font-black uppercase tracking-[0.15em] text-[#1A1A1C]">
                    Подробные характеристики:
                  </h4>
                  <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600 font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Кнопка покупки */}
                <div className="mt-auto">
                  <AppButton
                    className="w-full h-[64px] md:h-[76px] text-[15px] md:text-[17px] tracking-[0.25em] shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all"
                    disabled={!product.is_available}
                  >
                    {product.is_available ? 'ДОБАВИТЬ В КОРЗИНУ' : 'ОЖИДАЕТСЯ'}
                  </AppButton>
                </div>

              </div>
            </div>
            {/* Конец правой колонки */}

          </div>
          {/* Конец главной сетки */}
        </div>
        {/* Конец контейнера */}
      </section>
    </MainLayout>
  );
}
