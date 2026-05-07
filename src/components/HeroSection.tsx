import { useTranslation, Trans } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col justify-center mt-10 lg:mt-0">
      <h1 className="animate-reveal font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-6 text-primary tracking-tighter"><Trans i18nKey="home.headline" components={{ br: <br /> }} /></h1>
      <p className="animate-reveal stagger-1 text-lg max-w-[400px] opacity-80 font-light leading-relaxed mb-10">{t('home.subheadline')}</p>
    </section>
  );
};

export default HeroSection;
