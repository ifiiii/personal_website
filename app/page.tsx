import Image from "next/image";
import Link from "next/link";
import RatingBadge from "@/components/RatingBadge";
import { ramenShops, recommendations, site, topRamen } from "@/lib/data";

export default function HomePage() {
  const prefectures = new Set(ramenShops.map((s) => s.locationName.split(",").pop()?.trim())).size;
  const favourite = topRamen[0];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <Link href="/about" className="group inline-flex items-center gap-3">
            <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-beni ring-offset-2 ring-offset-paper">
              <Image src={site.portrait} alt={site.name} fill sizes="44px" className="object-cover object-[center_45%] scale-150" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-beni group-hover:underline">
              ラーメン日記 · {site.siteTitle}
            </span>
          </Link>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            I eat a lot of ramen in <span className="text-beni">Japan</span>. Here&apos;s the proof.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            {site.tagline} Every bowl gets a score out of 10. The numbers are completely made up, but I stand by
            them. There&apos;s also a list of stuff I did between bowls.
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
              Stuff to do in Japan
            </Link>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              { label: "Bowls ranked", value: ramenShops.length },
              { label: "Cities", value: prefectures },
              { label: "Non-ramen spots", value: recommendations.length },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wider text-ink-soft">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {favourite && (
          <Link
            href="/ramen"
            className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl"
          >
            <Image
              src={favourite.imagePlaceholderUrl}
              alt={`Bowl at ${favourite.shopName}`}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-paper/95 p-4 backdrop-blur">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-ink-soft">Current favourite</p>
                <p className="font-display text-xl font-semibold">{favourite.shopName}</p>
                <p className="text-sm text-ink-soft">{favourite.locationName}</p>
              </div>
              <RatingBadge rating={favourite.rating} />
            </div>
          </Link>
        )}
      </section>

      {/* Top 3 */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-beni">The best ones so far</p>
              <h2 className="mt-1 font-display text-4xl font-semibold tracking-tight">Top 3 Ramen Bowls</h2>
            </div>
            <Link href="/ramen" className="font-medium text-beni underline-offset-4 hover:underline">
              See all of them →
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
            src="/images/about/snow-angel.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover object-[center_72%] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 to-transparent" />
          <p className="text-sm uppercase tracking-widest opacity-80">For when I wasn&apos;t eating ramen</p>
          <h3 className="font-display text-3xl font-semibold">Japan Guide →</h3>
        </Link>
        <Link
          href="/about"
          className="group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-6 text-white"
        >
          <Image
            src="/images/about/beach.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover object-[center_68%] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 to-transparent" />
          <p className="text-sm uppercase tracking-widest opacity-80">The guy responsible for this</p>
          <h3 className="font-display text-3xl font-semibold">About iFi →</h3>
        </Link>
      </section>
    </>
  );
}
