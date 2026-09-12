"use client";
import { useState } from "react";
import type { Ctx } from "../BrandApp";
import type { Creator } from "@/data/creators";

export default function NegotiationModal({ ctx, creator, kind, onClose, onBack }: { ctx: Ctx; creator: Creator; kind: "single" | "bundle"; onClose: () => void; onBack: () => void }) {
  const [mode, setMode] = useState<"choose" | "negotiate" | "done">("choose");
  const [offer, setOffer] = useState("");
  const [busy, setBusy] = useState(false);
  const isBundle = kind === "bundle" && creator.bundle;
  const amount = isBundle ? creator.bundle!.totalCents : creator.priceCents;
  const posts = isBundle ? creator.bundle!.posts : 1;
  const label = isBundle ? `Bundle · ${posts}` : "Single post";
  const eur = (c: number) => `${Math.round(c / 100).toLocaleString("en-US")} €`;
  const submit = async (proposed?: number) => {
    setBusy(true);
    const r = await ctx.api("book", { slug: creator.slug, kind: isBundle ? "bundle" : "single", proposedCents: proposed, campaignId: ctx.snap.campaigns[0]?.id });
    setBusy(false);
    if (r.ok) { ctx.toast(proposed ? `Offer sent to ${creator.name}` : `Invitation sent to ${creator.name}`); setMode("done"); }
  };
  return (
    <div className="overlay open" id="modal-negotiation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" id="modal-negotiation-body" role="dialog" aria-modal="true" aria-labelledby="nn-offer-title">
        <div className="nn-offer-head nn-product-choice-head">
          <button type="button" className="nn-product-back" aria-label="Back to creator" onClick={mode === "negotiate" ? () => setMode("choose") : onBack}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg><span>Back</span></button>
          <h2 id="nn-offer-title">{mode === "negotiate" ? "Propose a price" : mode === "done" ? "Sent" : "Your selection"}</h2>
          <button aria-label="Close" onClick={onClose}>✕</button>
        </div>
        {mode === "done" ? (
          <div className="nn-pack-choice" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>✅</div>
            <h3 style={{ margin: "8px 0 4px" }}>{creator.name} has been invited</h3>
            <p className="muted">The creator has 72 hours to accept. Your budget is only committed once they do — follow the thread in Collaborations.</p>
            <div className="nn-pack-actions"><button type="button" className="nn-pack-negotiate" onClick={onClose}>Keep browsing</button><button type="button" className="nn-pack-book" onClick={() => { onClose(); ctx.nav("collaborations"); }}>Open collaborations</button></div>
          </div>
        ) : mode === "negotiate" ? (
          <div className="nn-pack-choice">
            <div className="nn-pack-product">
              <span className="nn-pack-product-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h4M10 12h6M10 16h6" /></svg></span>
              <div><small>Creator rate</small><h3>{label}</h3></div>
              <div className="nn-pack-price"><b>{eur(amount)}</b><span>Listed price</span></div>
            </div>
            <p>Propose the net amount you want to pay for {posts} post{posts > 1 ? "s" : ""}. {creator.first} can accept, decline or counter within 72 hours.</p>
            <label className="bb-money-custom" style={{ marginTop: 6 }}><span className="bb-money-custom-cur" aria-hidden="true">€</span><input type="number" min={20} placeholder={String(Math.round(amount / 100 * 0.85))} value={offer} onChange={(e) => setOffer(e.target.value)} aria-label="Your offer" /></label>
            <div className="nn-pack-actions"><button type="button" className="nn-pack-negotiate" onClick={() => setMode("choose")}>Cancel</button><button type="button" className="nn-pack-book" disabled={busy || !Number(offer)} onClick={() => submit(Math.round(Number(offer) * 100))}>Send offer · {Number(offer) ? `${Number(offer).toLocaleString("en-US")} €` : "—"}</button></div>
          </div>
        ) : (
          <div className="nn-pack-choice">
            <div className="nn-pack-product">
              <span className="nn-pack-product-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h4M10 12h6M10 16h6" /></svg></span>
              <div><small>Creator rate</small><h3>{label}</h3></div>
              <div className="nn-pack-price"><b>{eur(amount)}</b><span>{isBundle ? `${posts} posts` : "Standard rate"}</span></div>
            </div>
            <p>Book this option at the listed price, or propose a lower price.</p>
            <div className="nn-pack-actions"><button type="button" className="nn-pack-negotiate" onClick={() => setMode("negotiate")}>↔ Negotiate</button><button type="button" className="nn-pack-book" disabled={busy} onClick={() => submit()}>Book · {eur(amount)}</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
