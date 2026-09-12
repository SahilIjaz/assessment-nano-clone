import Anthropic from "@anthropic-ai/sdk";
import { CREATORS, type Creator } from "@/data/creators";
import { FAQ, LLMS_TXT, PRICING_MD } from "@/data/knowledge";

/**
 * AI features (website analysis, Nao creator matching, campaign brief generation, help assistant).
 * Uses Google Gemini (GEMINI_API_KEY) or Anthropic Claude (ANTHROPIC_API_KEY), selected by AI_PROVIDER;
 * every function has a deterministic fallback so the product works offline.
 */
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";
/** Flipped when the configured Gemini model rejects thinkingConfig (older generations). */
let GEMINI_NO_THINKING_CONFIG = false;

/** Which provider is active: AI_PROVIDER=gemini|anthropic, or auto (Gemini first, then Anthropic). */
function provider(): "gemini" | "anthropic" | null {
  if (process.env.NAANO_DISABLE_AI === "1") return null;
  const want = (process.env.AI_PROVIDER || "auto").toLowerCase();
  if (want === "gemini") return process.env.GEMINI_API_KEY ? "gemini" : null;
  if (want === "anthropic") return process.env.ANTHROPIC_API_KEY ? "anthropic" : null;
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  return null;
}
const enabled = () => provider() !== null;

type ChatMessage = { role: "user" | "assistant"; content: string };
let anthropicClient: Anthropic | null = null;

/** Sends a system prompt + conversation to the active provider and returns the reply text (null when disabled or failing). */
async function complete(system: string, messages: ChatMessage[], opts: { json?: boolean; maxTokens?: number } = {}): Promise<string | null> {
  const p = provider();
  if (!p) return null;
  try {
    if (p === "gemini") {
      // Gemini 3.x bills its internal reasoning against maxOutputTokens, so short replies get cut off unless thinking is
      // kept minimal. Older models reject thinkingLevel, so retry once without it.
      const call = (thinking: boolean) => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: messages.map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
          generationConfig: { temperature: 0.4, maxOutputTokens: opts.maxTokens ?? 4096, ...(opts.json ? { responseMimeType: "application/json" } : {}), ...(thinking ? { thinkingConfig: { thinkingLevel: "minimal" } } : {}) },
        }),
        signal: AbortSignal.timeout(60000),
      });
      let r = await call(!GEMINI_NO_THINKING_CONFIG);
      if (r.status === 400 && !GEMINI_NO_THINKING_CONFIG) { GEMINI_NO_THINKING_CONFIG = true; r = await call(false); }
      if (!r.ok) { console.error("[ai] Gemini error", r.status, (await r.text()).slice(0, 300)); return null; }
      const j = (await r.json()) as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] };
      const text = j.candidates?.[0]?.content?.parts?.filter((x) => !x.thought).map((x) => x.text ?? "").join("") ?? "";
      return text.trim() || null;
    }
    anthropicClient ??= new Anthropic();
    const res = await anthropicClient.messages.create({ model: ANTHROPIC_MODEL, max_tokens: opts.maxTokens ?? 4096, thinking: { type: "adaptive" }, output_config: { effort: "low" }, system, messages });
    if (res.stop_reason === "refusal") return null;
    const text = res.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("").trim();
    return text || null;
  } catch (e) {
    console.error("[ai] request failed", e);
    return null;
  }
}

async function askJson<T>(system: string, user: string, maxTokens = 4096): Promise<T | null> {
  const text = await complete(system + "\n\nReply with a single JSON object and nothing else.", [{ role: "user", content: user }], { json: true, maxTokens });
  if (!text) return null;
  try { return JSON.parse(text) as T; } catch { const m = text.match(/\{[\s\S]*\}/); try { return m ? (JSON.parse(m[0]) as T) : null; } catch { return null; } }
}

export type Icp = { title: string; description: string };
export type WebsiteAnalysis = { name: string; tagline: string; valueProp: string; description: string; icps: Icp[]; features: string[]; differentiators: string[]; industry: string };

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const host = url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || "yourcompany.com";
  const name = host.split(".")[0]!.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  let html = "";
  try {
    const r = await fetch(url.startsWith("http") ? url : `https://${url}`, { headers: { "user-agent": "Mozilla/5.0 (compatible; NaanoBot/1.0)" }, signal: AbortSignal.timeout(12000) });
    html = (await r.text()).replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 12000);
  } catch { /* offline or blocked — fall back to the domain name */ }
  const ai = await askJson<WebsiteAnalysis>(
    "You analyse a B2B company website for a creator-marketing platform. Return JSON with keys: name, tagline (one line), valueProp (4-6 sentences: what the company does, for whom, how), description (2 sentences), icps (array of exactly 3 {title, description} — buyer personas with role, company type and pains), features (3-5 short strings), differentiators (3 short strings), industry (one of: SaaS, AI, Fintech, HR, Developer Tools, Marketing, Sales, Cybersecurity, E-commerce, Other).",
    `Website: ${url}\n\nExtracted text:\n${html || "(no content available; infer from the domain name)"}`,
  );
  if (ai && ai.valueProp && Array.isArray(ai.icps) && ai.icps.length) return { ...ai, name: ai.name || name, icps: ai.icps.slice(0, 3) };
  return {
    name, tagline: `${name} helps B2B teams move faster.`, industry: "SaaS",
    valueProp: `${name} is a B2B software product that helps growing teams run their core workflow in one place. It replaces scattered tools and manual coordination with a single system that keeps priorities, owners and progress visible. Teams adopt it to ship faster, reduce operational noise and make better decisions with shared data. It is built for modern companies that want a lightweight setup and measurable results within the first weeks. The product serves operators, managers and leadership who need clarity across projects and cycles.`,
    description: `${name} is a B2B SaaS product for modern teams. It streamlines the workflow and makes progress measurable.`,
    icps: [
      { title: `Head of Operations at a growth-stage SaaS company`, description: `Runs a team of 10–40 people and owns process quality. Struggles with fragmented tools and reporting; looks for a system that scales without adding headcount.` },
      { title: `Founder or CEO of an early-stage B2B startup`, description: `Wears many hats and needs fast setup, low admin and a clear view of what matters this week. Buys on proof, peer recommendation and time to value.` },
      { title: `Team lead in a technical or product organisation`, description: `Ships multiple releases per quarter and needs alignment between planning and execution. Cares about adoption by the team and integration with existing tools.` },
    ],
    features: ["Single workspace for the whole workflow", "Automated prioritisation and routing", "Reporting that leadership can read"],
    differentiators: ["Fast setup", "Built for B2B teams", "Measurable in the first weeks"],
  };
}

export type NaoResult = { summary: string; intro: string; picks: { slug: string; reason: string }[] };

export async function naoSearch(prompt: string, company: { name: string; valueProp?: string | null; icps?: Icp[]; industries?: string[] }, count = 4): Promise<NaoResult> {
  const pool = rankCreators(prompt, company).slice(0, 24);
  const catalogue = pool.map((c) => `${c.slug} | ${c.name} | ${c.industries.join(", ")} | ${c.country} | ${c.followers} followers | ${c.medianViews} median views | €${c.priceCents / 100}/post | CPM €${c.cpmCents / 100} | ${c.headline}`).join("\n");
  const ai = await askJson<NaoResult>(
    `You are Nao, the creator-matching copilot of a B2B LinkedIn creator marketplace. Given a brand and a request, pick the ${count} best creators from the catalogue. Return JSON: {intro: one sentence "I found N creators for <brand>, ranked by ...", summary: 2-3 sentences explaining the selection and one trade-off, picks: [{slug, reason (short)}]} using only slugs from the catalogue.`,
    `Brand: ${company.name}\nValue proposition: ${company.valueProp || "n/a"}\nICPs: ${(company.icps || []).map((i) => i.title).join("; ") || "n/a"}\n\nRequest: ${prompt}\n\nCatalogue:\n${catalogue}`,
  );
  if (ai && Array.isArray(ai.picks) && ai.picks.length) {
    const picks = ai.picks.filter((p) => CREATORS.some((c) => c.slug === p.slug)).slice(0, count);
    if (picks.length) return { intro: ai.intro || `I found ${picks.length} creators for ${company.name}.`, summary: ai.summary || "", picks };
  }
  const picks = pool.slice(0, count).map((c) => ({ slug: c.slug, reason: `${c.industries.slice(0, 2).join(" · ")} · strong fit with ${company.name}'s buyers and an efficient CPM (€${c.cpmCents / 100}).` }));
  const inds = Array.from(new Set(pool.slice(0, count).flatMap((c) => c.industries.slice(0, 2)))).slice(0, 4).join(", ");
  return {
    intro: `I found ${picks.length} creators for ${company.name}, ranked by relevance to your request, then performance and cost.`,
    summary: `Retained ${picks.length} creators that together cover ${inds} and speak to ${company.name}'s buyers. All selected profiles show consistent content on those topics and keep listed post costs efficient for their reach. Trade-off: I prioritised topical and audience overlap over strict country coverage, so the shortlist mixes markets to maximise semantic fit.`,
    picks,
  };
}

/** Deterministic ranking used both for the marketplace ordering and as the AI fallback. */
export function rankCreators(query: string, company: { industries?: string[]; icps?: Icp[]; valueProp?: string | null }): Creator[] {
  const q = (query + " " + (company.valueProp || "") + " " + (company.icps || []).map((i) => i.title + " " + i.description).join(" ")).toLowerCase();
  const wanted = new Set((company.industries || []).map((s) => s.toLowerCase()));
  const kw = ["ai", "saas", "software", "sales", "marketing", "growth", "developer", "engineering", "product", "hr", "fintech", "data", "design", "security", "recruit", "support", "seo", "crm", "e-commerce", "founder", "gtm"];
  const hits = kw.filter((k) => q.includes(k));
  return [...CREATORS].map((c) => {
    let s = c.icpFit;
    for (const i of c.industries) { const l = i.toLowerCase(); if (wanted.has(l)) s += 14; if (hits.some((h) => l.includes(h))) s += 10; }
    if (/europe|france|french|paris|uk|london|germany|berlin/.test(q) && ["FR", "GB", "DE", "NL", "ES", "IT", "PT", "SE", "BE", "PL", "IE", "CH"].includes(c.cc)) s += 8;
    if (/cheap|budget|efficient|cpm/.test(q)) s += Math.max(0, 40 - c.cpmCents / 100) / 2;
    if (/reach|views|big|macro/.test(q)) s += Math.min(20, c.medianViews / 2000);
    return { c, s };
  }).sort((a, b) => b.s - a.s).map((x) => x.c);
}

export type Brief = { name: string; objective: string; context: string; tone: string; dos: string[]; donts: string[]; angles: { title: string; description: string; example: string }[]; audience: string };

export function defaultBrief(company: { name: string; valueProp?: string | null; icps?: Icp[]; target_industries?: string[] }): Brief {
  const icp = (company.icps || []).map((i) => i.title).join(", ") || "B2B decision makers";
  return {
    name: `${company.name} creator brief`,
    objective: `Introduce ${company.name} to ${icp} through trusted creator voices and generate qualified clicks.`,
    context: `${company.name} is described by the company as ${company.valueProp || "a B2B software product for modern teams."} The intended audience is professionals connected to ${(company.target_industries || ["B2B", "SaaS", "Software"]).join(", ")} in Europe. Introduce the product through your own expertise, adapt the angle to your audience, and keep every claim grounded in the confirmed company profile.`,
    audience: icp,
    tone: "Clear, useful and natural. Keep the creator's own voice rather than following a script.",
    dos: [`Use only the confirmed information about ${company.name}.`, "Connect the product to a practical audience question.", "Disclose the sponsored partnership clearly."],
    donts: ["Do not invent customers, results, figures or features.", "Do not force an endorsement or promise outcomes."],
    angles: [
      { title: "A practical introduction", description: `Start with the problem ${company.name} helps its audience understand, then introduce the product naturally.`, example: `Choose one practical question your audience recognises, then explain where the product fits using your own point of view.` },
      { title: "A lesson from the field", description: `Share an operating lesson your audience relates to and show where ${company.name} changes the outcome.`, example: `Open with a concrete situation, the mistake most teams make, and the workflow that fixed it — mention ${company.name} where it genuinely fits.` },
      { title: "A comparison of approaches", description: `Compare the old way with the new way for one workflow and position ${company.name} as the enabler.`, example: `List 3 ways teams handle this today, their trade-offs, and what changes once the process is systematised.` },
    ],
  };
}

export async function chatBrief(messages: { role: "user" | "assistant"; content: string }[], company: { name: string; valueProp?: string | null; icps?: Icp[] }): Promise<{ reply: string; brief?: Brief }> {
  const asked = messages.filter((m) => m.role === "user").length;
  if (enabled()) {
    const text = await complete(
      `You help a B2B brand (${company.name}) prepare a LinkedIn creator campaign brief. Value proposition: ${company.valueProp || "n/a"}. ICPs: ${(company.icps || []).map((i) => i.title).join("; ")}.\nAsk at most 2 short clarifying questions (objective/audience/angle) across the conversation, then produce the brief. When you produce the brief, reply with a short confirmation sentence followed by a JSON block on its own line: {"brief": {name, objective, context, audience, tone, dos[], donts[], angles[{title, description, example}]}}. Keep prose concise.`,
      messages,
      { maxTokens: 6000 },
    );
    if (text) {
      const m = text.match(/\{[\s\S]*"brief"[\s\S]*\}/);
      if (m) { try { const j = JSON.parse(m[0]); return { reply: text.replace(m[0], "").replace(/```(json)?/g, "").trim() || "Here is your campaign brief. You can edit every section before launch.", brief: j.brief }; } catch { /* fallthrough */ } }
      return { reply: text.replace(/```(json)?/g, "").trim() };
    }
  }
  if (asked === 1) return { reply: `Great — let's build this together. Who is the audience you want to reach with ${company.name}, and what should a reader do after the post (book a demo, start a trial, follow you)?` };
  if (asked === 2) return { reply: `Perfect. Last question: is there an angle or proof point you want creators to lean on (a customer story, a workflow, a comparison)? Reply "no" if you'd rather let creators choose.` };
  const brief = defaultBrief(company);
  const last = messages.filter((m) => m.role === "user").map((m) => m.content).join(" ");
  brief.objective = `${brief.objective} Campaign intent: ${last.slice(0, 220)}`;
  return { reply: "Here is your campaign brief. Every section is editable before launch.", brief };
}

export async function assistantReply(question: string, ctx: { role: "brand" | "creator"; name: string }): Promise<string> {
  const t = await complete(`You are the Naano assistant inside the ${ctx.role} workspace of Naano, a B2B LinkedIn creator marketplace. Answer briefly and practically. Never diagnose a drop in views with certainty; give hypotheses to test.`, [{ role: "user", content: question }], { maxTokens: 1200 });
  if (t) return t;
  if (/performance|views|reach/i.test(question)) return "A drop in views can have many causes: posting time, topic fatigue, format, or platform changes. Compare the last 5 posts side by side in Results, test one variable at a time, and check whether comments (not reactions) moved. Book a call if you want a second opinion from the team.";
  if (/bug|error|broken/i.test(question)) return "Thanks for flagging it. I've logged this for the team — they step in on bugs directly. Could you share the page and what you expected to happen?";
  if (/idea|feedback|suggest/i.test(question)) return "Noted — product feedback goes straight to the team. Tell me what you were trying to do and what would have made it easier.";
  return `Happy to help, ${ctx.name}. Ask me about campaigns, bookings, budget or results — or pick one of the options above and the team steps in when needed.`;
}

/** Public-site assistant (the prompt bar at the bottom of every marketing page). Grounded in llms.txt + pricing.md. */
export async function siteAssistant(messages: ChatMessage[]): Promise<string> {
  const trimmed = messages.slice(-12).map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  const system = `You are Naano's website assistant, shown as a small prompt bar on naano.com. Visitors are B2B marketers, founders, agencies and LinkedIn creators.
Answer in one to three short sentences, plain text, no markdown, no bullet lists, no emoji. Be concrete and use the facts below; if something is not covered, say you are not sure and point to the right page (/pricing, /creators, /agencies, /book to talk to the team, /register to start free) or info@naano.com. Never invent prices, numbers or features. Reply in the visitor's language.

=== naano.com/llms.txt ===
${LLMS_TXT}

=== naano.com/pricing.md ===
${PRICING_MD}`;
  const t = await complete(system, trimmed, { maxTokens: 1024 });
  if (t) return t.trim();
  const last = trimmed.filter((m) => m.role === "user").pop()?.content || "";
  for (const f of FAQ) if (f.match.test(last)) return f.answer;
  return "I can help with creators, pricing, attribution and launching a campaign on Naano. For anything else, the team answers at info@naano.com or you can book a call at /book.";
}
