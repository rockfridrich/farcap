import type { MetaFunction } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno

var buttonIndex: number = 0
let address: string = "";
let chain: string = "";
let image: string = "";

export const meta: MetaFunction = () => {

  if(buttonIndex == 1) { //Degen
    address = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed"
    chain = "base"
  } else if (buttonIndex == 2) { //Points
    address = "0xd7C1EB0fe4A30d3B2a846C04aa6300888f087A5F"
    chain = "ethereum"
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
      title: "New Farcaster App" 
    },
    {
      property: "og:title",
      content: "Frame"
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
      content: "🎩 DEGEN"
    },
    {
      property: "fc:frame:button:2",
      content: "🟣 POINTS"
    },
    {
      property: "fc:frame:button:3",
      content: "😸 TOSHI"
    },
    {
      property: "fc:frame:post_url",
      content: "https://teletrade.ngrok.app/coins"
    }
  ];
};

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.json();
  console.log(body);
  buttonIndex = body.untrustedData.buttonIndex;
  
  return (
    <div>Hello</div>
  ); 
}

export default function Coins() {

    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Welcome to Farcaster Frames Demo</h1>
        <img src={image}/>
      </div>
    );

}