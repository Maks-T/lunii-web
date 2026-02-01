import React from 'react';
import {router} from '@inertiajs/react';
import {Flame} from 'lucide-react';
import {cn} from '@/lib/utils';

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

export const CatalogPills = ({categories, activeFilters}: Props) => {
  const currentCategory = activeFilters?.category;
  const currentLabel = activeFilters?.label;

  // Добавлен duration-300 и transition-all для плавности
  const basePill = "flex items-center h-[46px] md:h-[68px] rounded-full border border-[#E5DCD3] transition-all duration-300 hover:border-[#BFA68A] shrink-0 overflow-hidden cursor-pointer";

  const activeClass = "bg-[#C2B09A] border-[#C2B09A] text-white";
  const inactiveClass = "bg-white text-[#1A1A1C]";

  const updateFilter = (type: 'category' | 'label' | 'all', value?: string) => {
    const params: any = {...activeFilters};

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
      preserveState: true, // Важно: сохраняет состояние React-компонентов
      replace: true,
      // КЛЮЧЕВОЙ МОМЕНТ: Запрашиваем у сервера ТОЛЬКО эти данные
      // Это предотвращает пересчет тяжелых фильтров и категорий
      only: ['products', 'activeFilters'],
    });
  };

  return (
    <div className="mb-12">
      <div
        className="flex flex-nowrap md:flex-wrap items-center gap-3 md:gap-x-4 md:gap-y-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">

        {/* 1. Кнопка "Все" */}
        <button
          onClick={() => updateFilter('all')}
          className={cn(
            basePill,
            "px-8 md:px-12",
            (!currentCategory && !currentLabel) ? activeClass : inactiveClass
          )}
        >
          <span className="text-[12px] md:text-[15px] font-bold uppercase tracking-[0.1em]">Все</span>
        </button>

        {/* 2. Кнопка "Хит" */}
        <button
          onClick={() => updateFilter('label', 'hit')}
          className={cn(
            basePill,
            "px-5 md:px-10",
            currentLabel === 'hit' ? activeClass : inactiveClass
          )}
        >
          <Flame className={cn(
            "w-5 h-5 md:w-8 md:h-8 transition-colors duration-300",
            currentLabel === 'hit' ? "fill-white text-white" : "fill-[#1A1A1C]"
          )}/>
        </button>

        {/* 3. Кнопка "New" */}
        <button
          onClick={() => updateFilter('label', 'new')}
          className={cn(
            basePill,
            "px-6 md:px-10",
            currentLabel === 'new' ? activeClass : inactiveClass
          )}
        >
          <span className="text-[12px] md:text-[15px] font-bold uppercase tracking-[0.1em]">New</span>
        </button>

        {/* 4. Кнопка "Скидки" */}
        <button
          onClick={() => updateFilter('label', 'sale')}
          className={cn(
            basePill,
            "px-6 md:px-10",
            currentLabel === 'sale' ? activeClass : inactiveClass
          )}
        >
          <span className="text-[18px] md:text-[24px] font-bold leading-none">%</span>
        </button>

        {/* Категории */}
        {categories.map((cat: {
          slug: string | undefined;
          id: React.Key | null | undefined;
          image?: string
          name: string;
        }) => {
          const isActive = currentCategory === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.slug)}
              className={cn(basePill, "pl-0 pr-5 md:pr-10 gap-3 md:gap-6", isActive ? activeClass : inactiveClass)}
            >
              <div className={cn(
                "w-[46px] h-[46px] md:w-[68px] md:h-[68px] rounded-full overflow-hidden shrink-0 border-r border-[#E5DCD3] transition-colors flex items-center justify-center -ml-[1px]",
                isActive ? "bg-white" : "bg-white" // Круг всегда белый
              )}>
                {cat.image ? (
                  <img src={`/storage/${cat.image}`} alt={cat.name} className="w-full h-full object-contain p-2"/>
                ) : (
                  <div
                    className="w-full h-full bg-linear-to-br from-[#FDFCFB] to-[#E2D1C3] flex items-center justify-center font-bold text-slate-300">
                    {cat.name?.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-[13px] md:text-[16px] font-medium whitespace-nowrap">{cat.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
};
