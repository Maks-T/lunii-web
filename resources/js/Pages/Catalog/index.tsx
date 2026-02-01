import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Filter, X } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { CatalogHero } from '@/features/catalog/components/CatalogHero';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { CatalogFilters } from "@/features/catalog/components/CatalogFilters";
import { CatalogPills } from "@/features/catalog/components/CatalogPills";
import ResponsiveModal from "@/components/shared/ui/ResponsiveModal";

// --- Интерфейсы ---
interface Label {
  id: number;
  name: string;
  code: string;
  color: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  old_price?: number;
  description?: string;
  image?: string;
  is_available: boolean;
  labels: Label[];
}

interface FilterOption {
  id: number;
  label: string;
  slug: string;
}

interface FilterAttribute {
  id: number;
  name: string;
  code: string;
  options: FilterOption[];
}

interface ActiveFilters {
  category?: string;
  label?: string;
  attr?: Record<string, string[]>;
}

interface Props {
  categories: Category[];
  filters: FilterAttribute[];
  products: {
    data: Product[];
    total: number;
    current_page: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
  };
  activeFilters: ActiveFilters;
}

export default function Catalog({ categories, filters, products, activeFilters }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Определяем заголовки
  const activeCategoryName = categories.find(c => c.slug === activeFilters.category)?.name;
  const activeLabelName = activeFilters.label ? (
    activeFilters.label === 'sale' ? 'Скидки' :
      activeFilters.label === 'new' ? 'Новинки' : 'Хиты'
  ) : null;

  // Считаем активные фильтры для бейджа
  const activeFiltersCount = Object.values(activeFilters.attr || {}).flat().length;

  return (
    <MainLayout>
      <Head title="Каталог корейской косметики LUNII" />

      <CatalogHero />

      <section className="container mx-auto px-4 pb-24">

        {/* 1. Блок Пилюль */}
        <div className="py-8 md:py-12">
          <CatalogPills
            categories={categories}
            activeFilters={activeFilters}
          />
        </div>

        {/* 2. Заголовок и Кнопка фильтров */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="flex items-baseline gap-3">
            <h2 className="text-[32px] md:text-[44px] font-black text-[#1A1A1C] leading-none tracking-tight">
              {activeCategoryName || activeLabelName || 'Все товары'}
            </h2>
            <span className="text-lg md:text-xl font-medium text-slate-300">
              {products.total}
            </span>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t border-slate-100 pt-6 md:border-none md:pt-0">

            {/* КНОПКА ФИЛЬТРОВ (lg:hidden - скрыта на десктопе от 1024px) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden relative flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1C] text-white rounded-full text-[13px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all z-10"
            >
              <Filter className="w-4 h-4" />
              Фильтры
              {activeFiltersCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#BFA68A] text-[10px] text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Сортировка */}
            <div className="flex items-center gap-2 text-[12px] md:text-sm font-bold uppercase tracking-widest text-slate-400 cursor-not-allowed">
              <span className="hidden sm:inline">Сортировать</span>
              <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Основная сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Десктопный сайдбар (3 колонки из 12) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 custom-scrollbar">
              <CatalogFilters
                filters={filters}
                activeFilters={activeFilters}
              />
            </div>
          </aside>

          {/* Сетка товаров (9 колонок из 12) */}
          <div className="lg:col-span-9 min-h-[600px]">
            {products.data.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-20">
                {products.data.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    image={product.image ? `/storage/${product.image}` : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                <p className="text-xl text-slate-400 font-medium">Ничего не найдено</p>
                <button onClick={() => window.location.href = route('catalog')} className="mt-4 text-[#BFA68A] font-bold uppercase border-b border-[#BFA68A]">Сбросить</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* МОДАЛКА */}
      <ResponsiveModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Фильтры"
        description=""
      >
        <div className="px-6 py-6 pb-32">
          <CatalogFilters
            filters={filters}
            activeFilters={activeFilters}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 z-50">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full py-5 bg-[#1A1A1C] text-white font-black uppercase tracking-[0.2em] rounded-2xl text-[14px] shadow-2xl"
          >
            Показать ({products.total})
          </button>
        </div>
      </ResponsiveModal>
    </MainLayout>
  );
}
