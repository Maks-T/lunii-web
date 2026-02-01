import React from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppButton } from '@/components/shared/ui/AppButton';
import {ProductLabels} from "@/entities/product/ui/ui/ProductLabels";

interface Label {
    id: number;
    name: string;
    code: string;
    color: string;
}

interface ProductCardProps {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    old_price?: number;
    image?: string;
    labels?: Label[];
    is_available?: boolean;
    className?: string;
}

export const ProductCard = ({
                                name,
                                slug,
                                description,
                                price,
                                old_price,
                                image,
                                labels = [],
                                is_available = true,
                                className
                            }: ProductCardProps) => {

    const discount = old_price ? Math.round(((old_price - price) / old_price) * 100) : null;

    return (
        <div className={cn("group flex flex-col h-full bg-white", className)}>
            {/* Контейнер изображения */}
            <div className="relative aspect-square bg-[#F8F8F8] overflow-hidden mb-6">
                <Link href={`/product/${slug}`} className="block w-full h-full">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-[#F3F4F6]">
                            <img src="/images/logo.svg" className="w-16 opacity-10 grayscale" alt="No image" />
                        </div>
                    )}
                </Link>

                {/* Метки */}
                <ProductLabels
                    labels={labels}
                    discount={discount}
                    className="absolute top-0 left-0"
                />

                {/* Избранное */}
                <button className="absolute top-4 right-4 p-1 text-[#C4C4C4] hover:text-[#FF5C35] transition-colors">
                    <Heart className="w-7 h-7 stroke-[1.2]" />
                </button>
            </div>

            {/* Контентная часть */}
            <div className="flex flex-col flex-1 px-1">
                {/* Описание / Категория (Верхний мелкий текст) */}
                <p className="text-[13px] md:text-[14px] text-[#4B4B4B] uppercase tracking-[0.02em] font-normal leading-[1.3] mb-3">
                    {description || 'Дневной крем для нормальной кожи, 75 ml'}
                </p>

                {/* Название товара */}
                <Link href={`/product/${slug}`} className="block mb-6">
                    <h3 className="text-[22px] md:text-[26px] font-bold text-[#1A1A1C] leading-[1.15] tracking-tight">
                        {name}
                    </h3>
                </Link>

                {/* Цены */}
                <div className="mt-auto mb-6 flex items-baseline gap-4">
                    <span className={cn(
                        "text-[24px] md:text-[28px] font-bold leading-none",
                        old_price ? "text-[#FF5C35]" : "text-[#1A1A1C]"
                    )}>
                        {price} BYN
                    </span>
                    {old_price && (
                        <span className="text-[16px] md:text-[19px] text-[#1A1A1C]/40 line-through font-medium">
                            {old_price} BYN
                        </span>
                    )}
                </div>

                {/* Кнопка */}
                {is_available ? (
                    <button
                        onClick={() => console.log('Add to cart')}
                        className="w-full h-[54px] md:h-[60px] bg-[#1A1A21] text-white text-[13px] md:text-[14px] font-bold tracking-[0.15em] uppercase transition-colors hover:bg-[#2A2A35]"
                    >
                        В КОРЗИНУ
                    </button>
                ) : (
                    <div className="w-full h-[54px] md:h-[60px] bg-[#D1D5DB] text-white text-[13px] md:text-[14px] font-bold tracking-[0.15em] uppercase flex items-center justify-center cursor-not-allowed">
                        Ожидается
                    </div>
                )}
            </div>
        </div>
    );
};
