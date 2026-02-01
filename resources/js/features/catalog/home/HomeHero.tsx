import React from 'react';
import { AppButton } from '@/components/shared/ui/AppButton';

export const HomeHero = () => {
    return (
        <section className="relative bg-[#F8F9FB] pt-12 pb-16 md:pt-24 md:pb-32 overflow-hidden">

            {/* Фоновые звезды */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Левая верхняя звезда */}
                <img
                    src="/images/star.svg"
                    alt=""
                    className="absolute top-[10%] left-[5%] md:left-[15%] w-12 md:w-24 opacity-60 md:opacity-100"
                />

                {/* Правая центральная звезда */}
                <img
                    src="/images/star.svg"
                    alt=""
                    className="absolute top-[40%] right-[-5%] md:right-[10%] w-16 md:w-32 opacity-40 md:opacity-100 rotate-12"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-5xl">
                    {/* Маленькая надпись */}
                    <span className="text-slate-400 text-[13px] md:text-base font-medium mb-3 md:mb-5 block tracking-tight">
                        Магазин LUNII
                    </span>

                    {/* Заголовок */}
                    <h1 className="text-[38px] leading-[1.05] md:text-[86px] font-bold text-[#1A1A1C] mb-10 md:mb-16 tracking-[-0.03em]">
                        Лучшие бренды <br className="hidden md:block" />
                        корейской косметики <br />
                        у нас
                    </h1>

                    {/* Группа кнопки и инфо-текста */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-14">
                        <AppButton
                            href="/catalog"
                            className="w-full md:w-auto px-12 py-5"
                        >
                            Перейти в каталог
                        </AppButton>

                        <div className="text-[14px] md:text-[18px] leading-snug text-slate-500 font-medium">
                            Только <span className="font-bold text-[#1A1A1C]">Оригинальная</span> <br className="hidden md:block" />
                            Корейская Косметика
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
