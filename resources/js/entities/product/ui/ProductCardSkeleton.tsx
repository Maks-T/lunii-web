import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Изображение */}
            <Skeleton className="aspect-square w-full rounded-sm" />

            {/* Контентная часть */}
            <div className="space-y-3 flex-1 flex flex-col">
                {/* Описание (мелкий текст) */}
                <div className="space-y-1">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>

                {/* Название товара */}
                <Skeleton className="h-5 w-full mt-1" />

                {/* Цена */}
                <div className="mt-auto pt-4 flex gap-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-12 self-end" />
                </div>

                {/* Кнопка "В корзину" */}
                <Skeleton className="h-[46px] w-full rounded-none" />
            </div>
        </div>
    );
};
