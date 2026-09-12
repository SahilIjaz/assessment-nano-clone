const BRAND = ["platform-deferred.css", "brand-external-campaign-flow.css", "naano-design-system.css", "brand-ai-matching.css", "brand-s1.css", "brand-shell-1a360e56e6ffe05e6b4bb35083b304dbfe17774caffeed2033e71f5080e6c7dd.css", "brand-s2.css", "brand-s3.css", "brand-workspace-design.css", "brand-s4.css", "naano-settings.css", "brand-s5.css", "brand-s6.css", "brand-campaign-preparation.css", "brand-first-campaign.css", "brand-s7.css", "brand-s8.css", "app-extra.css"];
const CREATOR = ["platform-deferred.css", "creator-s1.css", "creator-s2.css", "creator-s3.css", "creator-s4.css", "naano-settings.css", "creator-s5.css", "creator-s6.css", "creator-s7.css", "creator-s8.css", "app-extra.css"];
/** Vendored production stylesheets for the workspace apps, in the exact cascade order of the live product (inline blocks were extracted to files). */
export default function AppStyles({ kind }: { kind: "brand" | "creator" }) {
  const list = kind === "brand" ? BRAND : CREATOR;
  return <>{list.map((f) => <link key={f} rel="stylesheet" href={`/vendor/app/${f}?v=3`} />)}</>;
}
