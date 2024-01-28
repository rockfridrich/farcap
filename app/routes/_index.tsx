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
        <div class="md:shrink-0">
          <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/chart-2.png" alt="Modern building architecture" />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Coin on Farcaster</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">List of coins on farcaster</a>
          <p class="mt-2 text-slate-500">
            What is it
          </p>
        </div>
      </div>
  </div>
  );
}
