import React from 'react';
import {Heart} from 'lucide-react';
import {motion, TargetAndTransition, Variants} from 'framer-motion';
import {AppButton} from '@/components/shared/ui/AppButton';
import {cn} from '@/lib/utils';

const fadeInVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.8,
      ease: "easeOut" as const
    }
  })
};

const InstagramSection = () => {
  const hoverEffect = 'transition-all duration-500 ease-out hover:scale-[1.03] hover:brightness-110 cursor-pointer';

  return (
    <section className="py-16 md:py-32 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-[1800px]">

        {/* Заголовок */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{once: true}}
          variants={fadeInVariant}
          custom={0}
          className="mb-10 md:mb-16 md:ml-[131px]"
        >
          <h2
            className="text-[22px] md:text-[36px] font-extrabold tracking-[0.05em] text-[#1A1A1C] flex items-center gap-3 uppercase">
            @LUNII.BY
            <Heart className="w-5 h-5 md:w-9 md:h-9 fill-[#1A1A1C] stroke-none"/>
            ON INSTAGRAM
          </h2>
        </motion.div>

        {/* --- DESKTOP VERSION (остается без изменений) --- */}
        <div className="relative hidden md:block w-full h-[780px]">
          {/* Картинка 1 */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{once: true}} variants={fadeInVariant}
                      className={cn('absolute rounded-sm overflow-hidden z-10', hoverEffect)}
                      style={{width: '400px', height: '400px', left: '131px', top: '0px'}}>
            <img src="/images/sections/instagram/1.png" className="w-full h-full object-cover"/>
          </motion.div>
          {/* Картинка 2 */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{once: true}} variants={fadeInVariant}
                      className={cn('absolute rounded-sm overflow-hidden z-10', hoverEffect)}
                      style={{width: '339px', height: '540px', left: '551px', top: '79px'}}>
            <img src="/images/sections/instagram/2.png" className="w-full h-full object-cover"/>
          </motion.div>
          {/* Картинка 3 */}
          <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{once: true}} variants={fadeInVariant}
                      className={cn('absolute rounded-sm overflow-hidden z-10', hoverEffect)}
                      style={{width: '360px', height: '540px', left: '910px', top: '0px'}}>
            <img src="/images/sections/instagram/3.png" className="w-full h-full object-cover"/>
          </motion.div>
          {/* Картинка 4 */}
          <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{once: true}} variants={fadeInVariant}
                      className={cn('absolute rounded-sm overflow-hidden z-10', hoverEffect)}
                      style={{width: '470px', height: '470px', left: '1290px', top: '153px'}}>
            <img src="/images/sections/instagram/4.png" className="w-full h-full object-cover"/>
          </motion.div>
          {/* Логотип IG */}
          <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{once: true}} variants={fadeInVariant}
                      className="absolute flex items-center justify-center z-20 shadow-sm transition-transform duration-500 hover:rotate-3"
                      style={{width: '200px', height: '200px', left: '50px', top: '279px', borderRadius: '30px'}}>
            <img src="/images/logo-ig.svg" alt="Instagram" className=""/>
          </motion.div>
          {/* Кнопка */}
          <motion.div custom={6} initial="hidden" whileInView="visible" viewport={{once: true}} variants={fadeInVariant}
                      className="absolute z-30" style={{left: '131px', top: '520px'}}>
            <AppButton href="https://instagram.com/lunii.by"
                       className="w-[400px] py-6 shadow-xl text-[14px]">Подписаться</AppButton>
          </motion.div>
        </div>

        {/* --- MOBILE "TILE" VERSION --- */}
        <div className="md:hidden flex flex-col gap-8">
          <div className="flex gap-3">
            {/* Левая колонка */}
            <div className="flex flex-col gap-3 w-1/2">
              <motion.img
                initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                src="/images/sections/instagram/1.png"
                className="w-full aspect-square object-cover rounded-xl shadow-sm"
              />
              <motion.img
                initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                transition={{delay: 0.2}}
                src="/images/sections/instagram/3.png"
                className="w-full aspect-[3/4.5] object-cover rounded-xl shadow-sm"
              />
            </div>

            {/* Правая колонка */}
            <div className="flex flex-col gap-3 w-1/2 pt-12"> {/* pt-12 создает смещение (плитку) */}
              <motion.img
                initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                transition={{delay: 0.1}}
                src="/images/sections/instagram/2.png"
                className="w-full aspect-[3/4.5] object-cover rounded-xl shadow-sm"
              />
              <motion.img
                initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}
                transition={{delay: 0.3}}
                src="/images/sections/instagram/4.png"
                className="w-full aspect-square object-cover rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* Иконка инстаграма для мобилок */}
          <div className="flex justify-center -mt-4">
            <div className="w-20 h-20hadow-sm">
              <img src="/images/logo-ig.svg" className="opacity-80"/>
            </div>
          </div>

          <AppButton
            href="https://instagram.com/lunii.by"
            target="_blank"
          >
            Подписаться
          </AppButton>
        </div>

      </div>
    </section>
  );
};
export default InstagramSection
