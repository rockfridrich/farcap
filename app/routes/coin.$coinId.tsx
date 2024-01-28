import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "New Farcaster App" 
    },
    {
      property: "og:title",
      content: "Frame"
    },
    {
      property: "og:title",
      content: "Frame"
    },
    {
      property: "fc:frame",
      content: "vNext"
    },
    {
      property: "fc:frame:image",
      content : "https://farcap.vercel.app/img/chart-2.png"
    },
    {
      property: "fc:frame:button:1",
      content: "1D"
    },
    {
      property: "fc:frame:button:2",
      content: "1W"
    },
    {
      property: "fc:frame:button:3",
      content: "1M"
    }
  ];
};

export default function Coin() {

    return (
      <div>Hello</div>
    );

}