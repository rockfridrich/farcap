import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      property: "fc:frame",
      content: "vNext"
    },
    {
      property: "fc:frame:image",
      content : "https://teletrade.ngrok.app/img/chart.png"
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
    },
    {
      property: "fc:frame:button:4:redirect",
      content: "Buy"
    }
  ];
};

export default function Coin() {

    return (
      <div></div>
    );

}