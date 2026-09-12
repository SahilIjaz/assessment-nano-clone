import F8b from "@/generated/chrome/foot_8b5888";
import F14 from "@/generated/chrome/foot_14774f";
import F9c from "@/generated/chrome/foot_9c1d3e";
import F98 from "@/generated/chrome/foot_981648";

export default function SiteFooter({ variant }: { variant?: string }) {
  switch (variant) {
    case "14774f":
      return <F14 />;
    case "9c1d3e":
      return <F9c />;
    case "981648":
      return <F98 />;
    default:
      return <F8b />;
  }
}
