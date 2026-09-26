import type { Metadata } from "next";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About iFi",
  description: site.tagline,
};

// Alternating tilts give the gallery a pinned-polaroid feel.
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:items-start">
        <div className="relative mx-auto w-full max-w-sm md:sticky md:top-24">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-ink/5">
            <Image
              src={site.portrait}
              alt={`${site.name} standing in a room of hanging lights`}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <span className="absolute -right-3 -bottom-4 rotate-3 rounded-full bg-beni px-4 py-2 text-sm font-semibold text-white shadow-lg">
            this is me, hi 👋
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">About iFi</p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight">Hi, I&apos;m {site.name}.</h1>
          <p className="mt-3 text-xl text-ink-soft">{site.tagline}</p>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            {site.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end rounded-2xl border border-line bg-white/70 p-4">
                <dt className="mt-2 text-xs uppercase tracking-wider text-ink-soft">{stat.label}</dt>
                <dd className="font-display text-2xl leading-none font-semibold text-beni sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-4 text-lg leading-relaxed">
            {site.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-paper-deep p-6">
            <h2 className="font-display text-2xl font-semibold">Follow me, I guess</h2>
            <p className="mt-1 text-ink-soft">
              Instagram is mostly blurry photos of noodles. YouTube is me talking about the noodles.
            </p>
            <div className="mt-5">
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>

      {site.gallery.length > 0 && (
        <section className="mt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">Photographic evidence</p>
          <h2 className="mt-1 font-display text-4xl font-semibold tracking-tight">Proof I occasionally leave the ramen shop</h2>

          <ul className="mt-10 grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
            {site.gallery.map((photo, i) => (
              <li
                key={photo.src}
                className={`${tilts[i % tilts.length]} rounded-lg bg-white p-2.5 pb-4 shadow-lg ring-1 ring-ink/5 transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 px-1 text-center text-sm leading-snug text-ink-soft">{photo.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
