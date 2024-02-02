import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Farcap" },
    { name: "description", content: "Farcaster List Of Coins" },
  ];
};

export default function Index() {
  return (
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Coins on Farcaster</div>
      </div>
  </div>
  );
}
