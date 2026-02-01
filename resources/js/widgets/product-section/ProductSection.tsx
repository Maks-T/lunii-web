import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowUpRight} from 'lucide-react';
import {ProductCard} from '@/entities/product/ui/ProductCard';
import {ProductCardSkeleton} from '@/entities/product/ui/ProductCardSkeleton';

interface Label {
  id: number;
  name: string;
  code: string;
  color: string;
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

interface ProductSectionProps {
  title: string;
  count?: number;
  icon?: React.ReactNode;
  viewAllHref: string;
  products: Product[];
  isLoading?: boolean;
}

export const ProductSection = ({
                                 title,
                                 count,
                                 icon,
                                 viewAllHref,
                                 products,
                                 isLoading = false
                               }: ProductSectionProps) => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            {icon && <div className="text-[#1A1A1C]">{icon}</div>}
            <h2 className="text-[28px] md:text-[42px] font-bold text-[#1A1A1C] leading-none flex items-start">
              {title}
              {count !== undefined && (
                <sup className="text-[14px] md:text-[18px] ml-1 font-medium opacity-40 translate-y-3 md:translate-y-4">
                  {count}
                </sup>
              )}
            </h2>
          </div>

          <Link
            href={viewAllHref}
            className="group flex items-center gap-2 text-[13px] md:text-[15px] font-medium text-slate-400 hover:text-[#1A1A1C] transition-colors uppercase tracking-wider"
          >
            Смотреть Все
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </Link>
        </div>

        {/* Сетка товаров */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {isLoading ? (
            [...Array(4)].map((_, i) => <ProductCardSkeleton key={i}/>)
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                image={product.image ? `/storage/${product.image}` : undefined}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
