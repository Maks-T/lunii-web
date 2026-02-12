import React from 'react';
import {Head} from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import {ProductSection} from '@/widgets/product-section/ProductSection';
import {Flame, Sparkles, Percent} from 'lucide-react';
import {HomeHero} from "@/features/catalog/home/HomeHero";
import InstagramSection from "@/widgets/instagram-section/InstagramSection";
import {DeliveryInfo} from "@/widgets/delivery-info/DeliveryInfo";
import {DeveloperBanner} from "@/widgets/developer-banner/ui/DeveloperBanner";
import {BrandsMarquee} from "@/widgets/brands-marquee/ui/BrandsMarquee";
import {CatalogPills} from "@/features/catalog/components/CatalogPills";
import {PromoGrid} from "@/widgets/promo-grid/PromoGrid";

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

// Опишите интерфейс для пропсов (аналогично Catalog)
interface Props {
  hits: any[];
  newArrivals: any[];
  saleProducts: any[];
  categories: Category[];
}

export default function Home({ categories, hits, newArrivals, saleProducts }: Props) {
  return (
    <MainLayout>
      <Head title="LUNII — Корейская косметика в Минске"/>

      {/* Ваш Hero блок здесь */}
      <HomeHero />

      <PromoGrid />

      <BrandsMarquee />

      {/* Секция категорий на главной */}
      <section className="container mx-auto px-4 py-12">
        <CatalogPills
          categories={categories}
          activeFilters={{}} // На главной фильтры всегда пустые изначально
        />
      </section>

      {/* Секция ХИТЫ */}
      {hits.length > 0 && (
        <ProductSection
          title="Хиты"
          count={hits.length}
          icon={<Flame className="w-8 h-8 fill-current"/>}
          viewAllHref={route('catalog', {label: 'hit'})}
          products={hits}
        />
      )}

      {/* Секция НОВИНКИ */}
      {newArrivals.length > 0 && (
        <ProductSection
          title="Новинки"
          count={newArrivals.length}
          icon={<Sparkles className="w-8 h-8 fill-current text-[#84CC16]"/>}
          viewAllHref={route('catalog', {label: 'new'})}
          products={newArrivals}
        />
      )}

      {/* Секция СКИДКИ */}
      {saleProducts.length > 0 && (
        <ProductSection
          title="Скидки"
          count={saleProducts.length}
          icon={<Percent className="w-8 h-8 stroke-[3]"/>}
          viewAllHref={route('catalog', {label: 'sale'})}
          products={saleProducts}
        />
      )}

      <InstagramSection />

      <DeliveryInfo/>

      <DeveloperBanner />

    </MainLayout>
  );
}
