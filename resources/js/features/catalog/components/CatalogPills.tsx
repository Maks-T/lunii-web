import React from 'react';
import { router } from '@inertiajs/react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface Props {
  categories: Category[];
  activeFilters: any;
}

export const CatalogPills = ({ categories, activeFilters }: Props) => {
  const currentCategory = activeFilters?.category;
  const currentLabel = activeFilters?.label;

  // Базовые стили пилюли
  const basePill = "flex items-center h-[46px] md:h-[68px] rounded-full border border-[#E5DCD3] bg-white transition-all duration-300 hover:border-[#BFA68A] shrink-0 overflow-hidden";
  const activePill = "bg-[#C2B09A] border-transparent text-white";

  const updateFilter = (type: 'category' | 'label' | 'all', value?: string) => {
    const params: any = { ...activeFilters };
    if (type === 'all') {
      delete params.category;
      delete params.label;
    } else if (type === 'category') {
      currentCategory === value ? delete params.category : (params.category = value, delete params.label);
    } else {
      currentLabel === value ? delete params.label : (params.label = value, delete params.category);
    }

    router.get(route('catalog'), params, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      only: ['products', 'activeFilters']
    });
  };

  return (
    <div className="mb-12 pb-12 pt-12">
      {/* Контейнер со скроллом */}
      {/* -mx-4 md:mx-0 и px-4 md:px-0 позволяют скроллу на мобилках доходить до краев экрана */}
      <div className="flex flex-nowrap md:flex-wrap items-center gap-3 md:gap-x-4 md:gap-y-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">

        {/* 1. Группа системных кнопок */}
        <button onClick={() => updateFilter('all')} className={cn(basePill, "px-6 md:px-12", !currentCategory && !currentLabel && activePill)}>
          <span className="text-[12px] md:text-[15px] font-bold uppercase tracking-[0.1em]">Все</span>
        </button>

        <button onClick={() => updateFilter('label', 'hit')} className={cn(basePill, "px-5 md:px-10", currentLabel === 'hit' && activePill)}>
          <Flame className={cn("w-5 h-5 md:w-8 md:h-8", currentLabel === 'hit' ? "fill-white" : "fill-[#1A1A1C]")} />
        </button>

        <button onClick={() => updateFilter('label', 'new')} className={cn(basePill, "px-5 md:px-10", currentLabel === 'new' && activePill)}>
          <span className="text-[12px] md:text-[15px] font-bold uppercase tracking-[0.1em]">New</span>
        </button>

        <button onClick={() => updateFilter('label', 'sale')} className={cn(basePill, "px-5 md:px-10", currentLabel === 'sale' && activePill)}>
          <span className="text-[18px] md:text-[24px] font-bold">%</span>
        </button>

        {/* 2. Динамические Категории */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilter('category', cat.slug)}
            className={cn(basePill, "pl-0 pr-5 md:pr-10 gap-3 md:gap-6", currentCategory === cat.slug && activePill)}
          >
            <div className="w-[46px] h-[46px] md:w-[68px] md:h-[68px] rounded-full overflow-hidden shrink-0 border-r border-[#E5DCD3] bg-white flex items-center justify-center -ml-[1px]">
              {cat.image ? (
                <img src={`/storage/${cat.image}`} alt={cat.name} className="w-full h-full object-contain p-2" />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#FDFCFB] to-[#E2D1C3] flex items-center justify-center">
                                    <span className={cn("text-[13px] md:text-[14px] font-bold", currentCategory === cat.slug ? "text-[#C2B09A]" : "text-slate-300")}>
                                        {cat.name.charAt(0)}
                                    </span>
                </div>
              )}
            </div>
            <span className="text-[13px] md:text-[16px] font-medium whitespace-nowrap">
                            {cat.name}
                        </span>
          </button>
        ))}
      </div>

      {/* Стиль для скрытия полосы прокрутки, но сохранения функционала */}
      <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
    </div>
  );
};
