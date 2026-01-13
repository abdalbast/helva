const HeroSection = () => {
  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col justify-center mt-10 lg:mt-0">
      <h1 className="animate-reveal font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-8 text-primary tracking-tighter">
        Built to<br />be Whole.
      </h1>
      <p className="animate-reveal stagger-1 text-lg max-w-[400px] opacity-80 font-light leading-relaxed">
        Build life as a whole — with products that feel human and work like systems.
      </p>
    </section>
  );
};

export default HeroSection;
