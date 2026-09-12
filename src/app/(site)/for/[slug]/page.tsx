import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { registry } from "./registry";

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = registry[slug];
  return e ? { title: e.title, description: e.description } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = registry[slug];
  if (!e) redirect("/");
  const Mod = (await e.load()).default;
  return <Mod />;
}
