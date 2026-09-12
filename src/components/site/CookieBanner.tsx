"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("nn-consent")) setOpen(true);
    } catch {}
  }, []);
  if (!open) return null;
  const choose = (v: string) => {
    try { localStorage.setItem("nn-consent", v); } catch {}
    setOpen(false);
  };
  return (
    <div className="nn-cookie" role="dialog" aria-label="Audience measurement">
      <div>
        <p className="nn-cookie__title">Audience measurement</p>
        <p className="nn-cookie__text">
          With your permission, Google Analytics helps us understand visits and improve Naano. Sensitive and technical URLs are excluded. You can change your choice at any time via Cookies. <a href="/privacy">Privacy policy</a>
        </p>
      </div>
      <div className="nn-cookie__actions">
        <button type="button" className="nn-cookie__btn" onClick={() => choose("reject")}>Reject</button>
        <button type="button" className="nn-cookie__btn nn-cookie__btn--allow" onClick={() => choose("allow")}>Allow</button>
      </div>
    </div>
  );
}
