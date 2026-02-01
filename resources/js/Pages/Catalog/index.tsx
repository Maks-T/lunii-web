import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { CatalogHero } from '@/features/catalog/components/CatalogHero';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { CatalogFilters } from "@/features/catalog/components/CatalogFilters";
import { CatalogPills } from "@/features/catalog/components/CatalogPills";

// 1. Описываем вложенные интерфейсы
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

// 2. Описываем структуру активных фильтров из URL
interface ActiveFilters {
  category?: string;
  label?: string;
  attr?: Record<string, string[]>; // Пример: { skin_type: ['dry', 'oily'] }
}

// 3. Описываем пропсы страницы (стандартная пагинация Laravel)
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

  // Определяем заголовок страницы на основе активной категории
  const activeCategoryName = categories.find(c => c.slug === activeFilters.category)?.name;
  const activeLabelName = activeFilters.label ? (activeFilters.label === 'sale' ? 'Скидки' :
    activeFilters.label === 'new' ? 'Новинки' : 'Хиты') : null;

  return (
    <MainLayout>
      <Head title="Каталог корейской косметики LUNII" />

      <CatalogHero />

      <section className="container mx-auto px-4 pb-24">
        {/* Верхние фильтры-пилюли */}
        <CatalogPills
          categories={categories}
          activeFilters={activeFilters}
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1C] leading-none">
              {activeCategoryName || activeLabelName || 'Все товары'}
            </h2>
            <span className="text-lg md:text-xl font-medium text-slate-300">
                            {products.total}
                        </span>
          </div>

          {/* Заглушка для будущей сортировки */}
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 cursor-not-allowed">
            <span>Сортировать по цене</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Боковая панель фильтров */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <CatalogFilters
                filters={filters}
                activeFilters={activeFilters}
              />
            </div>
          </aside>

          {/* Сетка товаров */}
          <div className="lg:col-span-3">
            {products.data.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-20">
                {products.data.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    // Путь к картинке обрабатываем здесь, чтобы ProductCard был чище
                    image={product.image ? `/storage/${product.image}` : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="text-xl text-slate-400 font-medium">К сожалению, по вашему запросу ничего не найдено</p>
                <button
                  onClick={() => window.location.href = route('catalog')}
                  className="mt-4 text-[#BFA68A] font-bold uppercase tracking-widest border-b border-[#BFA68A]"
                >
                  Сбросить все фильтры
                </button>
              </div>
            )}

            {/* Здесь в будущем будет компонент пагинации */}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
