/**
 * Fictional creator marketplace dataset.
 * Every creator here is invented (names, stats, posts) — generated deterministically so the app is stable.
 */
export type Creator = {
  slug: string; name: string; first: string; last: string; headline: string; bio: string;
  industries: string[]; country: string; cc: string; flag: string; city: string;
  followers: number; medianViews: number; reactions: number; comments: number; engagement: number;
  priceCents: number; bundle?: { posts: number; totalCents: number }; cpmCents: number;
  network: "linkedin" | "x"; audience: { jobTitles: [string, number][]; seniority: [string, number][] };
  posts: { date: string; text: string; views: number; reactions: number; comments: number; reposts: number }[];
  icpFit: number; level: "Nano" | "Micro" | "Mid" | "Macro"; joined: string; languages: string[]; postsAnalyzed: number;
};

function mulberry32(a: number) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20260911);
const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)]!;
const between = (a: number, b: number) => Math.round(a + rnd() * (b - a));

const FIRST = ["Amira","Jonas","Léa","Mateo","Priya","Elias","Noor","Tobias","Ines","Kwame","Sofia","Ravi","Hanna","Diego","Yuki","Lars","Maya","Omar","Clara","Felix","Anaïs","Idris","Greta","Nikolai","Zara","Oscar","Lena","Tariq","Beatriz","Emil","Sana","Louis","Freya","Arjun","Nadia","Theo","Ingrid","Malik","Camille","Ezra","Aisha","Hugo","Marta","Kenji","Elin","Rafael","Salma","Viktor","Alba","Jules","Leila","Anton","Chiara","Samir","Nora","Bruno","Esme","Dario","Ayla","Milo"];
const LAST = ["Haddad","Lindqvist","Moreau","Alvarez","Natarajan","Weber","Rahimi","Brandt","Costa","Mensah","Rossi","Kapoor","Virtanen","Ortega","Tanaka","Nilsen","Feldman","Karimi","Dubois","Schneider","Lefèvre","Bello","Holm","Petrov","Malik","Berg","Fischer","Aziz","Silva","Jansen","Qureshi","Marchand","Larsen","Menon","Haddadi","Laurent","Solberg","Osei","Girard","Cohen","Bakr","Fontaine","Nowak","Sato","Dahl","Pinto","Farouk","Ivanov","Serrano","Perrin","Nasser","Kowalski","Ricci","Amara","Eriksen","Teixeira","Whitfield","Conti","Demir","Novak"];
const COUNTRIES: [string, string, string, string][] = [["France","FR","🇫🇷","Paris"],["United Kingdom","GB","🇬🇧","London"],["Germany","DE","🇩🇪","Berlin"],["United States","US","🇺🇸","New York"],["Netherlands","NL","🇳🇱","Amsterdam"],["Spain","ES","🇪🇸","Madrid"],["Sweden","SE","🇸🇪","Stockholm"],["Portugal","PT","🇵🇹","Lisbon"],["Italy","IT","🇮🇹","Milan"],["Canada","CA","🇨🇦","Toronto"],["Belgium","BE","🇧🇪","Brussels"],["Poland","PL","🇵🇱","Warsaw"],["Ireland","IE","🇮🇪","Dublin"],["Switzerland","CH","🇨🇭","Zurich"],["India","IN","🇮🇳","Bangalore"]];
export const INDUSTRIES = ["B2B","B2C","AI","SaaS","Software","Sales","Marketing","SEO","Outreach","CRM","Creative","Productivity","Fintech","HealthTech","EdTech","Cybersecurity","Growth / GTM","HR","E-commerce","Developer Tools","Data / Analytics","Customer Support","Design","Real Estate / PropTech","LegalTech","InsurTech","Logistics / Supply Chain","Recruiting / Talent","Web3 / Crypto","Agencies / Consulting","Media / Content","Retail","Manufacturing","Hospitality / Travel","Energy / CleanTech"];
const CORE = ["B2B","AI","SaaS","Software","Sales","Marketing","Growth / GTM","Developer Tools","Data / Analytics","HR","Fintech","Productivity","Cybersecurity","Recruiting / Talent","Customer Support","Design","SEO","CRM","E-commerce","Agencies / Consulting"];
const HEADLINES = ["Helping {i1} teams turn content into pipeline","{i1} operator · writing about {i2} every week","Founder · {i1} · sharing what actually works in {i2}","Head of Growth · {i1} & {i2}","{i1} advisor to early-stage SaaS · ex-operator","Building in public · {i1} · {i2}","Sales leader turned creator · {i1}","Product marketer · {i1} · {i2} playbooks","Fractional CMO for {i1} companies","Engineer who writes about {i1} and {i2}"];
const POSTS = ["Most {i1} teams measure the wrong thing. Here is the metric I would track instead, and why it changed how we run pipeline reviews.","I ran the same outbound sequence with and without a creator post in front of it. The difference in reply rate was not subtle.","Three things I would tell a founder starting with {i1} content this quarter: pick one buyer, write for them only, and ship weekly.","Unpopular opinion: your {i2} stack is fine. Your positioning is the problem. A short thread on how I diagnose it.","We replaced a €40K ads test with 6 creator posts. Same budget, 3x the qualified conversations. Here is the breakdown.","The best {i1} demos I have seen this year all do one thing: they start with the failure state, not the feature list.","If your buyers are founders and sales leaders, stop writing for marketers. A practical rewrite of a real post below.","How I structure a 30-day content system for {i1} teams: one pillar, four angles, twelve posts, zero burnout."];
const JOB_TITLES = ["Marketing","Founders","Sales","Engineering","Product","Operations","HR","Finance","Other"];
const SENIOR = ["Founder","Manager","VP","Director","C-level","IC","Other"];

function share(keys: string[], n: number): [string, number][] {
  const w = keys.map(() => rnd() + 0.2);
  const total = w.reduce((a, b) => a + b, 0);
  const out = keys.map((k, i) => [k, Math.round((w[i]! / total) * 100)] as [string, number]).sort((a, b) => b[1] - a[1]).slice(0, n);
  const s = out.reduce((a, b) => a + b[1], 0);
  out[out.length - 1]![1] += 100 - s;
  return out;
}

function make(i: number): Creator {
  const first = FIRST[i % FIRST.length]!, last = LAST[(i * 7 + Math.floor(i / FIRST.length) * 11) % LAST.length]!;
  const [country, cc, flag, city] = COUNTRIES[(i * 5) % COUNTRIES.length]!;
  const i1 = CORE[(i * 3) % CORE.length]!; let i2 = CORE[(i * 11 + 4) % CORE.length]!; if (i2 === i1) i2 = "Marketing";
  const inds = [i1, i2]; if (rnd() > 0.5) { const i3 = pick(INDUSTRIES); if (!inds.includes(i3)) inds.push(i3); }
  const followers = Math.round(Math.exp(between(760, 1180) / 100) / 10) * 10; // ~2K – 130K
  const medianViews = Math.max(900, Math.round(followers * (0.08 + rnd() * 0.55)));
  const reactions = Math.max(12, Math.round(medianViews * (0.006 + rnd() * 0.02)));
  const comments = Math.max(2, Math.round(reactions * (0.15 + rnd() * 0.5)));
  const engagement = Math.round(((reactions + comments) / medianViews) * 10000) / 100;
  const cpm = between(900, 4200); // cents per 1000 views
  const priceCents = Math.round((medianViews / 1000) * cpm / 100) * 100;
  const bundle = rnd() > 0.45 ? { posts: pick([3, 4, 5]), totalCents: 0 } : undefined;
  if (bundle) bundle.totalCents = Math.round(priceCents * bundle.posts * (0.72 + rnd() * 0.14) / 100) * 100;
  const headline = pick(HEADLINES).replace("{i1}", i1).replace("{i2}", i2);
  const level = followers < 5000 ? "Nano" : followers < 25000 ? "Micro" : followers < 80000 ? "Mid" : "Macro";
  const posts = Array.from({ length: 5 }, (_, k) => { const v = Math.round(medianViews * (0.6 + rnd() * 0.9)); const r = Math.round(v * (reactions / medianViews) * (0.7 + rnd() * 0.6)); return { date: new Date(Date.UTC(2026, 8, 2 + k * 2)).toISOString(), text: POSTS[(i + k) % POSTS.length]!.replace("{i1}", i1).replace("{i2}", i2), views: v, reactions: r, comments: Math.round(r * 0.35), reposts: Math.round(r * 0.06) }; });
  return {
    slug: `${first}-${last}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-"),
    name: `${first} ${last}`, first, last, headline,
    bio: `${first} writes for ${i1.toLowerCase()} buyers about ${i2.toLowerCase()} and the operating lessons behind it. Based in ${city}, publishing three times a week, and open to sponsored posts that stay useful to the audience.`,
    industries: inds, country, cc, flag, city, followers, medianViews, reactions, comments, engagement, priceCents, bundle, cpmCents: cpm,
    network: "linkedin", audience: { jobTitles: share(JOB_TITLES, 4), seniority: share(SENIOR, 4) }, posts,
    icpFit: between(62, 96), level, joined: new Date(Date.UTC(2025, between(0, 11), between(1, 28))).toISOString(), languages: cc === "FR" ? ["French", "English"] : cc === "DE" ? ["German", "English"] : ["English"], postsAnalyzed: 5,
  };
}

export const CREATORS: Creator[] = Array.from({ length: 96 }, (_, i) => make(i));
export const creatorBySlug = (slug: string) => CREATORS.find((c) => c.slug === slug);
export const MARKETPLACE_TOTAL = 983; // headline count shown in the marketplace (the live product lists ~1K creators)
