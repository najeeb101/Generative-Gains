import Image from "next/image";
import HeroFlow from "@/components/HeroFlow";
import GenOpsStack from "@/components/GenOpsStack";
import { BrowserFrame, PhaseArt, ServiceGlyph, SovereignArt } from "@/components/Visuals";
import {
  adoption,
  contact,
  genops,
  hero,
  industries,
  links,
  nav,
  products,
  region,
  services,
} from "@/content/site";

const wrap = "mx-auto w-full max-w-[88rem] px-4 sm:px-8 lg:px-12";
const h2 = "font-display text-4xl leading-[1.08] text-frost sm:text-5xl";

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-ink/85 backdrop-blur">
      <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
        <a href="#top" aria-label="Generative Gains, back to top" className="shrink-0">
          <Image src="/logo.png" alt="Generative Gains" width={360} height={203} priority className="h-11 w-auto" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-mist md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-frost">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-frost/40 px-4 py-1.5 text-sm text-frost transition-colors hover:border-sand hover:text-sand"
        >
          {contact.cta}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className={`${wrap} grid items-center gap-10 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pb-28`}>
      <div>
        <h1 className="font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] text-frost">{hero.title}</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist">{hero.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#products" className="rounded-full bg-frost px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand">
            See our products
          </a>
          <a href="#genops" className="rounded-full border border-frost/40 px-6 py-3 text-sm text-frost transition-colors hover:border-sand hover:text-sand">
            How GenOps works
          </a>
        </div>
      </div>
      <HeroFlow inputs={hero.inputs} outcomes={hero.outcomes} />
    </section>
  );
}

function Services() {
  return (
    <section id="what-we-do" className="border-t border-line/60 py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={h2}>{services.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{services.intro}</p>
        </div>
        <dl className="border-t border-line">
          {services.items.map((item) => (
            <div key={item.name} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[15rem_1fr] sm:gap-8">
              <dt className="flex items-center gap-4 text-lg text-frost">
                <ServiceGlyph name={item.icon} />
                {item.name}
              </dt>
              <dd className="leading-relaxed text-mist">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function GenOps() {
  return (
    <section id="genops" className="bg-deep/50 py-24 sm:py-32">
      <div className={wrap}>
        <div className="max-w-3xl">
          <h2 className={h2}>{genops.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-mist">{genops.intro}</p>
        </div>
        <div className="mt-16">
          <GenOpsStack layers={genops.layers} hint={genops.hint} />
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="py-24 sm:py-32">
      <div className={wrap}>
        <h2 className={h2}>{products.title}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{products.intro}</p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {products.items.map((p) => (
            <article key={p.key} className="group flex flex-col rounded-3xl border border-line bg-deep/40 p-6 transition-colors hover:border-mist/60 sm:p-8">
              <BrowserFrame src={p.image} alt={p.imageAlt} url={p.href} />
              <p className="mt-8 text-sm text-mist">{p.category}</p>
              <h3 className="mt-1 font-display text-3xl text-frost">{p.name}</h3>
              <p className="mt-3 text-sm text-sand">{p.badge}</p>
              <p className="mt-5 flex-1 leading-relaxed text-mist">{p.body}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 self-start rounded-full bg-frost px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand"
              >
                {p.cta}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="border-t border-line/60 py-24 sm:py-32">
      <div className={wrap}>
        <div className="max-w-3xl">
          <h2 className={h2}>{industries.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-mist">{industries.intro}</p>
        </div>
        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {industries.items.map((item) => (
            <li key={item.name} className="border-t border-line py-5">
              <p className="flex items-baseline justify-between gap-4">
                <span className="text-lg text-frost">{item.name}</span>
                <span className="text-sm text-mist">{item.sector}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Adoption() {
  return (
    <section className="py-24 sm:py-32">
      <div className={wrap}>
        <h2 className={h2}>{adoption.title}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{adoption.intro}</p>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {adoption.phases.map((phase, i) => (
            <li key={phase.name} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand font-display text-lg text-sand">
                  {i + 1}
                </span>
                {i < adoption.phases.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-line md:block" />}
              </div>
              <div className="mt-6 rounded-2xl border border-line/70 bg-deep/40 px-4 py-5">
                <PhaseArt phase={i as 0 | 1 | 2} />
              </div>
              <h3 className="mt-6 font-display text-2xl text-frost">{phase.name}</h3>
              <p className="mt-3 leading-relaxed text-mist">{phase.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Region() {
  return (
    <section className="bg-deep/50 py-24 sm:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
        <div>
          <h2 className={h2}>{region.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{region.intro}</p>
          <div className="mt-10 max-w-lg">
            <SovereignArt />
          </div>
        </div>
        <ul className="self-end border-t border-line" role="list">
          {region.points.map((point) => (
            <li key={point} className="flex gap-4 border-b border-line py-5 text-lg text-frost">
              <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-sand" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 sm:py-36">
      <div className={wrap}>
        <h2 className="max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] text-frost">{contact.title}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{contact.body}</p>
        {links.contact ? (
          <a href={links.contact} className="mt-10 inline-block rounded-full bg-frost px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-sand">
            {contact.cta}
          </a>
        ) : (
          <p className="mt-10 inline-block rounded-full border border-dashed border-mist/50 px-6 py-3 text-sm text-mist">
            {contact.pending}
          </p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/60 py-12">
      <div className={`${wrap} flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="flex items-center gap-5">
          <Image src="/logo.png" alt="Generative Gains" width={360} height={203} className="h-12 w-auto" />
          <p className="text-sm text-mist">Doha, Qatar</p>
        </div>
        <nav aria-label="Products" className="flex gap-6 text-sm text-mist">
          <a href={links.thermalTrace} target="_blank" rel="noopener noreferrer" className="hover:text-frost">Thermal Trace</a>
          <a href={links.freshDriv} target="_blank" rel="noopener noreferrer" className="hover:text-frost">FreshDriv</a>
        </nav>
        <p className="text-sm text-mist">© 2026 Generative Gains LLC</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <GenOps />
        <Products />
        <Industries />
        <Adoption />
        <Region />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
