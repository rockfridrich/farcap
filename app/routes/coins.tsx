import { 
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect
} from "@remix-run/node"; // or cloudflare/deno

import invariant from "tiny-invariant";

import { ICoin, getCoin } from "./../data";

var buttonIndex: number = 0

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  return json({ env: {
      DOMAIN: process.env.DOMAIN
  }});
};

export const meta: MetaFunction <typeof loader> = ({
  data,
}) => {
  
  const degen = getCoin("0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed")
  const aerodrome = getCoin("0x940181a94A35A4569E4529A3CDfB74e38FD98631")
  const toshi = getCoin("0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4")

  if(degen == null || toshi == null || aerodrome == null) {
    throw Error('No coin selected')
  }

  let selected: ICoin = degen

  if(buttonIndex == 1) { //Degen
    selected = degen
  } else if (buttonIndex == 2) { //AERODROME
    selected = aerodrome
  } else if (buttonIndex == 3) { //Toshi
    selected= toshi
  } 

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
      content: selected.preview
    },
    {
      property: "fc:frame",
      content: "vNext"
    },
    {
      property: "fc:frame:image",
      content : selected.preview
    },
    {
      property: "fc:frame:post_url",
      content: `${data?.env.DOMAIN}/coins?address=${selected.address}`
    },
    {
      property: "fc:frame:button:1",
      content: `${(buttonIndex==1 || buttonIndex == 0) ? "✅ " : ""}`+`${degen.ticker}`
    },
    {
      property: "fc:frame:button:2",
      content: `${(buttonIndex==2) ? "✅ " : ""}`+`${aerodrome.ticker}`
    },
    {
      property: "fc:frame:button:3",
      content: `${(buttonIndex==3) ? "✅ " : ""}`+`${toshi.ticker}`
    },
    {
      property: "fc:frame:button:4",
      content: "Buy"
    },
    {
      property: "fc:frame:button:4:action",
      content: "post_redirect"
    }
  ];
};

export async function action({
  request,
}: ActionFunctionArgs) {
  
  const body = await request.json();
  buttonIndex = body.untrustedData.buttonIndex;
  const url = new URL(request.url)
  const address = url.searchParams.get('address')
  
  if(buttonIndex === 4) {
    //console.log(`${process.env.DOMAIN}/buy/${address?.toLowerCase()}`)
    return redirect(`${process.env.DOMAIN}/buy/${address?.toLowerCase()}`, 302);
  }

  return (
    <div>^_^</div>
  ); 
}

export default function Coins() {

    return (
      <div>^_^</div>
    );

}