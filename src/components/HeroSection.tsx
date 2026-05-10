import { Trans, useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="col-span-12 lg:col-span-5 flex min-h-[38svh] min-w-0 flex-col justify-end pt-10 sm:min-h-[42svh] lg:min-h-[calc(70vh-5rem)] lg:justify-center lg:pt-0">
      <div className="w-full max-w-[calc(100vw-2.5rem)] sm:max-w-[42rem] lg:max-w-none">
        <h1 className="animate-reveal max-w-[11ch] text-balance font-display text-[3rem] font-extrabold leading-[0.92] tracking-tight text-primary sm:text-[4.25rem] lg:max-w-[8ch] lg:text-[clamp(4.75rem,7vw,6.5rem)] lg:leading-[0.88] rtl:max-w-[13ch] rtl:leading-[1.05]">
          <Trans i18nKey="home.headline" components={{ br: <br /> }} />
        </h1>
        <p className="animate-reveal stagger-1 mt-6 max-w-[calc(100vw-2.5rem)] [overflow-wrap:anywhere] text-base leading-7 text-foreground/75 sm:max-w-[34rem] sm:text-lg lg:mt-7 lg:max-w-[28rem]">
          {t('home.subheadline')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
