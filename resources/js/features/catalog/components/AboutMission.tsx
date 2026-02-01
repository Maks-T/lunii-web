import React from 'react';

export const AboutMission = () => {
    return (
        <section className="bg-white py-16 md:py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-24">

                    {/* Левая часть: Большой логотип */}
                    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                        <img
                            src="/images/logo.svg"
                            alt="LUNII Logo"
                            className="w-48 md:w-64 opacity-90"
                        />
                    </div>

                    {/* Правая часть: Текст миссии */}
                    <div className="w-full md:w-2/3 space-y-6 md:space-y-8">
                        <p className="text-[15px] md:text-[18px] leading-relaxed text-slate-600 font-light max-w-2xl">
                            В нашем магазине собраны корейские бренды, которые определяют будущее мировой индустрии красоты.
                        </p>

                        <p className="text-[15px] md:text-[18px] leading-relaxed text-slate-600 font-light max-w-2xl">
                            Мы верим, что истинная красота подобна мягкому лунному свету: она естественна, глубока и притягательна.
                        </p>

                        <p className="text-[15px] md:text-[18px] leading-relaxed text-slate-600 font-light max-w-2xl">
                            Наша цель — помочь вам найти ежедневный уход, который работает.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};
