import Link from "next/link";
import { site } from "@/lib/data";
import SocialButtons from "./SocialButtons";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg font-semibold">{site.siteTitle}</p>
          <p className="text-sm text-ink-soft">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <SocialButtons size="sm" />
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} {site.name} ·{" "}
            <Link href="/about" className="underline underline-offset-2 hover:text-ink">
              About iFi
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
