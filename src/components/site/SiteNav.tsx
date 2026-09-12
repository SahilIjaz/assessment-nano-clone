import Nav936 from "@/generated/chrome/nav_936ec2";
import Nav728 from "@/generated/chrome/nav_7286cb";
import NavDe6 from "@/generated/chrome/nav_de62d0";

/** Fixed landing navigation. Variants correspond to the captured markup for each surface. */
export default function SiteNav({ variant }: { variant?: string; surface?: string }) {
  switch (variant) {
    case "7286cb":
      return <Nav728 />;
    case "de62d0":
      return <NavDe6 />;
    default:
      return <Nav936 />;
  }
}
