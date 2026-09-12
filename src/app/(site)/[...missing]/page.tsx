import { notFound } from "next/navigation";

/** Catch-all so unknown URLs render the branded not-found page of this route group (there is no single root layout). */
export default function Missing() { notFound(); }
