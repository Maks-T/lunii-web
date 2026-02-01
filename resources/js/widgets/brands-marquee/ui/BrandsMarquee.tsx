import React from 'react';

export const BrandsMarquee = () => {
  // Список брендов
  const brands = [
    { name: "celimax", font: "font-sans font-medium" },
    { name: "MEDIPEEL+", font: "font-sans font-bold" },
    { name: "Biodance", font: "font-sans font-extrabold" },
    { name: "celimax", font: "font-sans font-medium" },
    { name: "MEDIPEEL+", font: "font-sans font-bold" },
    { name: "Biodance", font: "font-sans font-extrabold" },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-8 md:py-12 overflow-hidden">
      <div className="flex items-center">
        <div className="animate-marquee-brands flex items-center">
          {/* Дублируем список для бесшовности */}
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center">
              {brands.map((brand, index) => (
                <span
                  key={index}
                  className={`
                                        ${brand.font}
                                        text-[24px] md:text-[40px]
                                        text-[#E5E7EB]
                                        mx-10 md:mx-20
                                        uppercase tracking-widest
                                        select-none
                                    `}
                >
                                    {brand.name}
                                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
