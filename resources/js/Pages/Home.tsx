import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import {HomeHero} from "@/features/catalog/home/HomeHero";

export default function Home() {
    return (
        <MainLayout>
            <Head title="Главная" />

           <HomeHero />

            <section className="container mx-auto py-12 px-4">
                <div className="flex flex-col items-center text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Двойное сияние вашей кожи
                    </h1>
                    <p className="max-w-[700px] text-lg text-muted-foreground">
                        Лучшие бренды корейской косметики у нас. Только оригинал.
                    </p>
                </div>

                {/* Сюда пойдут виджеты каталога: Хиты, Новинки и т.д. */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-64 rounded-xl bg-muted animate-pulse flex items-center justify-center">
                        Banner 1
                    </div>
                    <div className="h-64 rounded-xl bg-muted animate-pulse flex items-center justify-center">
                        Banner 2
                    </div>
                    <div className="h-64 rounded-xl bg-muted animate-pulse flex items-center justify-center">
                        Instagram
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
