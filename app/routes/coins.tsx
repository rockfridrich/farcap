import type { MetaFunction } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno

var buttonIndex: number = 0
let address: string = "";
let chain: string = "";
let image: string = "";

export const meta: MetaFunction = () => {

  if(buttonIndex == 1) { //Degen
    address = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed"
    chain = "base"
  } else if (buttonIndex == 2) { //AERODROME
    address = "0x940181a94A35A4569E4529A3CDfB74e38FD98631"
    chain = "base"
  } else if (buttonIndex == 3) { //Toshi
    address = "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4"
    chain = "base"
  } else { //Degen
    address = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed"
    chain = "base"
  }

  image = `https://multichain-api.birdeye.so/${chain}/thumbnails?token_address=${address}&timestamp=${Date.now().toString()}`

  return [
    {
      title: "Farcap" 
    },
    {
      property: "og:title",
      content: "Farcap Frame"
    },
    {
      property: "og:image",
      content: image
    },
    {
      property: "fc:frame",
      content: "vNext"
    },
    {
      property: "fc:frame:image",
      content : image
    },
    {
      property: "fc:frame:button:1",
      content: `${(buttonIndex==1 || buttonIndex ==0) ? "✅ " : ""}$DEGEN`
    },
    {
      property: "fc:frame:button:2",
      content: `${(buttonIndex==2) ? "✅ " : ""}$AERO`
    },
    {
      property: "fc:frame:button:3",
      content: `${(buttonIndex==3) ? "✅ " : ""}$TOSHI`
    },
    {
      property: "fc:frame:button:4",
      content: "Buy"
    },
    {
      property: "fc:frame:button:4:action",
      content: "post_redirect"
    },
    {
      property: "fc:frame:post_url",
      content: `https://farcap.vercel.app/coins?address=${address}`
    }
  ];
};

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.json();
  console.log(body);
  buttonIndex = body.untrustedData.buttonIndex;

  const url = new URL(request.url)
  const address = url.searchParams.get('address')
  
  if(buttonIndex === 4) {
    return redirect(`https://farcap.vercel.app/buy/${address}`);
  }
  console.log("test")
  return (
    <div>Hello</div>
  ); 
}

export default function Coins() {

    return (
      <div>Hello</div>
    );

}