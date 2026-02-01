import React from 'react';
import { router } from '@inertiajs/react';

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

interface Props {
  filters: FilterAttribute[];
  activeFilters: any;
}

export const CatalogFilters = ({ filters, activeFilters }: Props) => {

  // Функция обработки клика
  const handleFilterChange = (attrCode: string, valueSlug: string) => {
    // Копируем текущие фильтры из URL
    const currentParams = { ...activeFilters?.attr };

    if (!currentParams[attrCode]) {
      currentParams[attrCode] = [valueSlug];
    } else {
      if (currentParams[attrCode].includes(valueSlug)) {
        // Если уже есть — удаляем
        currentParams[attrCode] = currentParams[attrCode].filter((s: string) => s !== valueSlug);
      } else {
        // Если нет — добавляем
        currentParams[attrCode].push(valueSlug);
      }
    }

    // Отправляем запрос через Inertia (обновит только данные, без перезагрузки страницы)
    router.get(route('catalog'), { attr: currentParams }, {
      preserveScroll: true,
      preserveState: true,
      only: ['products', 'activeFilters'], // Обновляем только сетку и состояние
      replace: true,
    });
  };

  return (
    <aside className="w-full space-y-12">
      {filters.map((attribute) => (
        <div key={attribute.id} className="flex flex-col">
          <h3 className="text-[14px] md:text-[16px] font-bold tracking-[0.1em] text-[#BFA68A] uppercase mb-6">
            {attribute.name}
          </h3>

          <div className="flex flex-col gap-3">
            {attribute.options.map((option) => {
              // Проверяем, выбран ли этот чекбокс (есть ли он в URL)
              const isChecked = activeFilters?.attr?.[attribute.code]?.includes(option.slug);

              return (
                <label key={option.id} className="flex items-center gap-4 cursor-pointer group w-fit">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked || false}
                      onChange={() => handleFilterChange(attribute.code, option.slug)}
                      className="peer appearance-none w-[22px] h-[22px] border border-[#D1D5DB] rounded-none checked:bg-[#BFA68A] checked:border-[#BFA68A] transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white transition-opacity opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-[15px] md:text-[17px] text-[#1A1A1C] font-normal group-hover:text-[#BFA68A]">
                                        {option.label}
                                    </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};
