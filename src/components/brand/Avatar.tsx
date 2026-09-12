import { initials } from "@/lib/format";

const PALETTES = [["#72C4D6", "#3A92A8"], ["#A6AC7E", "#7B8252"], ["#E3B08A", "#B8764A"], ["#9DA7E8", "#5B67C7"], ["#C9A0D8", "#8E5FA8"], ["#8FD1A8", "#4E9E6A"], ["#F2B5A0", "#C97A5F"], ["#B7C7E6", "#6E85B8"]];
export function avatarGradient(name: string) {
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const [a, b] = PALETTES[h % PALETTES.length]!;
  return `linear-gradient(135deg,${a},${b})`;
}
export function CreatorAvatar({ name, className = "mkt-avatar", size }: { name: string; className?: string; size?: number }) {
  return (
    <span className={className} style={{ background: avatarGradient(name), ...(size ? { width: size, height: size, fontSize: size * 0.36 } : {}) }}>
      <span aria-hidden="true">{initials(name)}</span>
    </span>
  );
}
