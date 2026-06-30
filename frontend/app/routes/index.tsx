import type { Route } from "./+types/index";
import { PrimalityTestPage } from "~/pages";

export function meta({}: Route.MetaArgs) { // eslint-disable-line no-empty-pattern
  return [
    { title: "Primality Tester" },
    { name: "description", content: "Is this number prime?" },
  ];
}

export default function Home() {
  return <PrimalityTestPage />;
}
