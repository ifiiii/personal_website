import { site } from "@/lib/data";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
  </svg>
);

const platforms = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, style: "bg-ink text-paper hover:bg-ink/85" },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon, style: "bg-beni text-white hover:bg-beni-dark" },
] as const;

/**
 * Instagram / YouTube buttons. Set the URLs in data/site.json → social.
 * Until a URL is set, the button renders as a disabled "coming soon" placeholder.
 */
export default function SocialButtons({ size = "md" }: { size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-3 py-1.5 text-sm" : "px-5 py-3";

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map(({ key, label, Icon, style }) => {
        const url = site.social[key];
        const base = `inline-flex items-center gap-2 rounded-full font-medium transition-colors ${pad}`;

        return url ? (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`${base} ${style}`}>
            <Icon />
            {label}
          </a>
        ) : (
          <span
            key={key}
            aria-disabled="true"
            title={`${label} link coming soon`}
            className={`${base} cursor-not-allowed border border-dashed border-ink-soft/40 text-ink-soft`}
          >
            <Icon />
            {label}
            <span className="text-xs opacity-70">· soon</span>
          </span>
        );
      })}
    </div>
  );
}
