import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Yo" },
    { name: "description", content: "Yo: Farcaster coins" },
  ];
};

export default function Index() {
  return (
    <h1>Yo</h1>
  );
}
