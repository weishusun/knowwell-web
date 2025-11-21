import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
}

export function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-4 py-16 text-white md:px-8 md:py-24">
        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{title}</h1>
        <p className="text-lg text-white/90">({subtitle})</p>
      </div>
    </section>
  );
}
