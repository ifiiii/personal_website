import Image from "next/image";
import Link from "next/link";
import RatingBadge from "@/components/RatingBadge";
import { ramenShops, recommendations, site, topRamen } from "@/lib/data";

export default function HomePage() {
  const prefectures = new Set(ramenShops.map((s) => s.locationName.split(",").pop()?.trim())).size;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-beni">ラーメン日記 · Ramen Journal</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Slurping my way across <span className="text-beni">Japan</span>.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            {site.tagline} Placeholder intro: honest scores, the stories behind each bowl, and the places worth
            visiting in between.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ramen"
              className="rounded-full bg-beni px-6 py-3 font-medium text-white transition-colors hover:bg-beni-dark"
            >
              See the rankings
            </Link>
            <Link
              href="/japan"
              className="rounded-full border border-ink/20 px-6 py-3 font-medium transition-colors hover:bg-paper-deep"
            >
              Japan travel guide
            </Link>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              { label: "Bowls ranked", value: ramenShops.length },
              { label: "Cities", value: prefectures },
              { label: "Recommendations", value: recommendations.length },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
          <Image
            src="https://picsum.photos/seed/ramen-hero/900/1100"
            alt="Placeholder hero image of a ramen bowl"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper/95 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-ink-soft">Current #1</p>
            <p className="font-display text-xl font-semibold">{topRamen[0]?.shopName}</p>
            <p className="text-sm text-ink-soft">
              {topRamen[0]?.locationName} · {topRamen[0]?.rating.toFixed(1)}/10
            </p>
          </div>
        </div>
      </section>

      {/* Top 3 */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-beni">The podium</p>
              <h2 className="mt-1 font-display text-4xl font-semibold tracking-tight">Top 3 Ramen Bowls</h2>
            </div>
            <Link href="/ramen" className="font-medium text-beni underline-offset-4 hover:underline">
              View full rankings →
            </Link>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {topRamen.map((shop, i) => (
              <li key={shop.id}>
                <Link
                  href="/ramen"
                  className="group block overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={shop.imagePlaceholderUrl}
                      alt={`Bowl at ${shop.shopName}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 grid size-11 place-items-center rounded-full bg-beni font-display text-xl font-semibold text-white shadow">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{shop.shopName}</h3>
                      <p className="text-sm text-ink-soft">{shop.locationName}</p>
                      <span className="mt-3 inline-block rounded-full bg-broth/20 px-2.5 py-0.5 text-xs font-medium">
                        {shop.brothType}
                      </span>
                    </div>
                    <RatingBadge rating={shop.rating} />
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Explore more */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
        <Link
          href="/japan"
          className="group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-6 text-white"
        >
          <Image
            src="https://picsum.photos/seed/japan-guide/900/600"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 to-transparent" />
          <p className="text-sm uppercase tracking-widest opacity-80">Nightlife · Sights · Cafes</p>
          <h3 className="font-display text-3xl font-semibold">Japan Guide →</h3>
        </Link>
        <Link
          href="/about"
          className="group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-6 text-white"
        >
          <Image
            src="https://picsum.photos/seed/about-me/900/600"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 to-transparent" />
          <p className="text-sm uppercase tracking-widest opacity-80">Who's behind the chopsticks</p>
          <h3 className="font-display text-3xl font-semibold">About me →</h3>
        </Link>
      </section>
    </>
  );
}
