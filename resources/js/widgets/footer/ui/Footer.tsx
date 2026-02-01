import React from 'react';
import { Link } from '@inertiajs/react';

export const Footer = () => {
    return (
        <footer className="bg-[#E2FD52] text-[#1A1A1A] pt-12 pb-6 md:pt-24 md:pb-10 mt-auto">
            <div className="container mx-auto px-4">

                {/* Верхняя секция: Юридическая информация */}
                <div className="flex flex-col items-end text-right space-y-1 mb-16 md:mb-32">
                    <div className="text-[11px] md:text-[13px] leading-relaxed font-medium max-w-xs md:max-w-none">
                        <p>ИП Барковская Светлана Олеговна</p>
                        <p>УНП 193357341</p>
                        <p>В Торговом реестре с 15.06.2020 г. №487331</p>
                        <p>Зарегистрированна в мингорисполкоме от 19.12.2019 г.</p>
                        <p>Юр. адрес: г. Минск, ул. Жуковского, д. 9, корп. 1, кв. 77</p>
                    </div>
                </div>

                {/* Нижняя секция: Политика и Копирайт */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-black/10 pt-6">
                    <Link
                        href="/privacy"
                        className="text-[10px] md:text-[12px] font-medium hover:opacity-60 transition-opacity underline underline-offset-4 decoration-black/30"
                    >
                        Политика конфиденциальности
                    </Link>

                    <div className="text-[10px] md:text-[12px] font-medium uppercase tracking-widest opacity-40">
                        © LUNII.BY - {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </footer>
    );
};
