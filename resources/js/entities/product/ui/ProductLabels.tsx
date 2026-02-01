import React from 'react';
import {Flame} from 'lucide-react';
import {cn} from '@/lib/utils';

interface Label {
  id: number;
  name: string;
  code: string;
  color: string; // Это поле из вашей БД (hex-код типа #84cc16)
}

interface ProductLabelsProps {
  labels: Label[];
  discount?: number | null;
  className?: string;
}

export const ProductLabels = ({labels, discount, className}: ProductLabelsProps) => {
  if (!labels || labels.length === 0) return null;

  return (
    <div className={cn("flex flex-row flex-wrap items-start", className)}>
      {labels.map((label) => {
        // Приоритет цвета из БД, если его нет — наш дефолтный салатовый
        const bgColor = label.color || '#E2FD52';

        return (
          <div
            key={label.id}
            style={{backgroundColor: bgColor}}
            className={cn(
              "flex items-center justify-center",
              "w-[38px] h-[52px] md:w-[48px] md:h-[64px]"
            )}
          >
            <div className="text-white font-bold uppercase pointer-events-none select-none">
              {/* 1. Если это СКИДКА (sale) — выводим процент */}
              {label.code === 'sale' ? (
                  <span className="text-[13px] md:text-[16px] tracking-tighter">
                                    {discount ? `${discount}%` : label.name}
                                </span>
                ) :
                /* 2. Если это ХИТ (hit) — выводим огонек */
                  label.code === 'hit' ? (
                    <Flame className="w-5 h-5 md:w-7 md:h-7 fill-white stroke-none"/>
                  ) :
                  /* 3. Если это НОВИНКА (new) — выводим текст NEW */
                  label.code === 'new' ? (
                      <span className="text-[11px] md:text-[13px] tracking-tight">
                                    NEW
                                </span>
                    ) :
                    /* 4. Для остальных (например "Рекомендовано") — первая буква или иконка */
                    (
                      <span className="text-[10px] md:text-[11px] px-1 text-center leading-none">
                                    {label.name.substring(0, 4)}
                                </span>
                    )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
