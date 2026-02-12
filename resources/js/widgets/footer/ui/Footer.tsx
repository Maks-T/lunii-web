import React from 'react';
import { Link } from '@inertiajs/react';
import { Phone, Mail, Instagram, Send } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-[18px] sm:text-[22px] md:text-[30px] font-black tracking-[0.2em] text-[#8F8F8F]/40 uppercase mb-6 md:mb-8 flex items-center gap-2">
      <span className="w-2 h-2 bg-[#8F8F8F]/40 rounded-full shrink-0" />
      {children}
    </h4>
  );

  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="pl-1 md:pl-2 text-[15px] sm:text-[18px] md:text-[24px] font-medium text-[#1E1E2C] hover:opacity-60 transition-opacity uppercase tracking-wider block mb-3 md:mb-4"
    >
      {children}
    </Link>
  );

  return (
    <footer className="bg-[#E2FD52] text-[#1A1A1A] pt-12 pb-6 md:pt-24 md:pb-12 mt-auto font-sans overflow-hidden">
      <div className="container mx-auto px-4">

        {/* --- РЯД 1: ЛОГО | НАВИГАЦИЯ | КОНТАКТЫ --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 md:mb-32">

          {/* Логотип - Центрируем на мобилках */}
          <div className="shrink-0 w-full lg:w-auto flex justify-start lg:block">
            <Link href="/">
              <img src="/images/logo.svg" alt="LUNII" className="h-10 sm:h-12 md:h-[70px] w-auto" />
            </Link>
          </div>

          {/* Навигация (Центральный блок) - 2 колонки на планшете, 1 на мобилке */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-24 lg:gap-40 w-full lg:w-auto lg:flex-1 lg:justify-center">
            <div className="space-y-2">
              <SectionTitle>Клиентам</SectionTitle>
              <nav className="pl-1">
                <FooterLink href="/delivery">Доставка</FooterLink>
                <FooterLink href="/payment">Оплата</FooterLink>
                <FooterLink href="/returns">Обмен и возврат</FooterLink>
              </nav>
            </div>

            <div className="space-y-2">
              <SectionTitle>Документы</SectionTitle>
              <nav className="pl-1">
                <FooterLink href="/privacy">Политика конфид.</FooterLink>
                <FooterLink href="/offer">Публичная оферта</FooterLink>
                <FooterLink href="/cookies">Файлы cookie</FooterLink>
              </nav>
            </div>
          </div>

          {/* Контакты - Прижаты вправо только на больших экранах */}
          <div className="flex flex-col items-start lg:items-end gap-4 md:gap-6 w-full lg:w-auto">
            <a
              href="tel:+375296777777"
              className="flex items-center gap-3 md:gap-4 text-[18px] sm:text-[22px] md:text-[28px] font-black hover:opacity-70 transition-opacity whitespace-nowrap tracking-tight"
            >
              <Phone className="w-5 h-5 md:w-8 md:h-8 stroke-[2.5]" />
              +375 29 677 77 77
            </a>
            <a
              href="mailto:info@lunii.by"
              className="flex items-center gap-3 md:gap-4 text-[18px] sm:text-[22px] md:text-[28px] font-black hover:opacity-70 transition-opacity tracking-tight"
            >
              <Mail className="w-5 h-5 md:w-8 md:h-8 stroke-[2.5]" />
              info@lunii.by
            </a>
          </div>
        </div>

        {/* --- РЯД 2: СОЦСЕТИ + ОПЛАТА И ЮРИДИЧЕСКАЯ ИНФО --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-black/10 pb-10 md:pb-12 mb-8">

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-10 w-full lg:w-auto">
            {/* Соцсети */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#1A1A1A] rounded-xl hover:bg-black hover:text-[#E2FD52] transition-all">
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#1A1A1A] rounded-xl hover:bg-black hover:text-[#E2FD52] transition-all">
                <Send className="w-5 h-5 md:w-6 md:h-6 -translate-x-0.5" />
              </a>
            </div>

            {/* Оплата - Скролл на очень маленьких экранах, если не влезает */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
              <div className="h-10 md:h-11 px-3 md:px-4 border border-[#1A1A1A] rounded-xl flex items-center justify-center font-black text-[12px] md:text-[14px] whitespace-nowrap">
                VISA
              </div>
              <div className="h-10 md:h-11 px-3 md:px-4 border border-[#1A1A1A] rounded-xl flex items-center justify-center shrink-0">
                <div className="flex -space-x-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#1A1A1A]/80" />
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#1A1A1A]/30" />
                </div>
              </div>
              <div className="h-10 md:h-11 px-3 md:px-4 border border-[#1A1A1A] rounded-xl flex items-center justify-center text-[9px] md:text-[10px] font-black uppercase tracking-tighter whitespace-nowrap">
                белкарт
              </div>
            </div>
          </div>

          {/* Юр. информация */}
          <div className="text-left lg:text-right text-[11px] md:text-[13px] leading-relaxed font-medium opacity-80 w-full lg:max-w-xl">
            <p>ИП Барковская Светлана Олеговна</p>
            <p>УНП 193357341</p>
            <p>В Торговом реестре с 15.06.2020 г. №487331</p>
            <p>Зарегистрирована в мингорисполкоме от 19.12.2019 г.</p>
            <p>Юр. адрес: г. Минск, ул. Жуковского, д. 9, корп. 1, кв. 77</p>
          </div>
        </div>

        {/* --- РЯД 3: COPYRIGHT --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] opacity-40 text-center sm:text-left">
          <div>LUNII COSMETICS</div>
          <div>© LUNII.BY - {currentYear}</div>
        </div>

      </div>
    </footer>
  );
};
