import type { Metadata } from "next";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About iFi",
  description: site.tagline,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
      <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:items-start">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] shadow-xl md:sticky md:top-24">
          <Image
            src="https://picsum.photos/seed/portrait/800/1000"
            alt={`Portrait placeholder for ${site.name}`}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">About iFi</p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight">Hi, I&apos;m {site.name}.</h1>
          <p className="mt-3 text-xl text-ink-soft">{site.tagline}</p>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            {site.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse rounded-2xl border border-line bg-white/70 p-4">
                <dt className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold text-beni">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-4 text-lg leading-relaxed">
            {site.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-paper-deep p-6">
            <h2 className="font-display text-2xl font-semibold">Watch me eat, I guess</h2>
            <p className="mt-1 text-ink-soft">
              Instagram is mostly blurry photos of noodles. YouTube is me talking about the noodles.
            </p>
            <div className="mt-5">
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
