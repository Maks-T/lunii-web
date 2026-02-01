import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Heart, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

const navigation = [
    { name: 'ГЛАВНАЯ', href: '/' },
    { name: 'КАТАЛОГ', href: '/catalog' },
    { name: 'ДОСТАВКА', href: '/delivery' },
    { name: 'ОПЛАТА', href: '/payment' },
];

export const Header = () => {
    const isMobile = useIsMobile();
    const { url } = usePage();

    const NavLinks = ({ className = "" }: { className?: string }) => (
        <nav className={cn("flex items-center gap-10", className)}>
            {navigation.map((item) => {
                // Проверка на активную страницу
                const isActive = url === item.href || (item.href !== '/' && url.startsWith(item.href));

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "relative text-[13px] font-medium tracking-[0.15em] transition-all duration-300 ease-in-out",
                            // Если активно: поднимаем текст выше и делаем темнее
                            isActive
                                ? "text-[#1A1A1A] -translate-y-1"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {item.name}

                        {/* Точка под активным пунктом */}
                        {isActive && (
                            <span
                                className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-[5px] h-[5px] bg-[#1A1A1A] rounded-full"
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                {/* Левая часть: Логотип */}
                <div className="flex-1 flex items-center">
                    {isMobile && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <SheetTitle className="text-left mb-8">Меню</SheetTitle>
                                <nav className="flex flex-col gap-6 mt-10">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-medium border-b pb-2"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    )}
                    <Link href="/" className="transition-opacity hover:opacity-80">
                        <img
                            src="/images/logo.svg"
                            alt="LUNII Logo"
                            className="h-8 md:h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Центр: Навигация (Desktop) */}
                {!isMobile && (
                    <div className="flex-[2] flex justify-center">
                        <NavLinks />
                    </div>
                )}

                {/* Правая часть: Иконки */}
                <div className="flex-1 flex items-center justify-end gap-2 md:gap-6">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <Heart className="w-6 h-6 stroke-[1.5]" />
                    </button>

                    <Link href="/cart" className="p-2 text-slate-400 hover:text-slate-900 transition-colors relative">
                        <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
                        <span className="absolute top-1 right-0 bg-[#FF5C35] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 border-2 border-white">
                            99
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};
