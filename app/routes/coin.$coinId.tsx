import { 
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    json
} from "@remix-run/node"; // or cloudflare/deno

import {
    useLoaderData,
} from "@remix-run/react";

import invariant from "tiny-invariant";


import type { CoinRecord } from "../data";
import { getCoin } from "../data";

var buttonIndex: number = 0
let image: string = "";

export const loader = async ({
    params,
  }: LoaderFunctionArgs) => {
    invariant(params.coinId, "Missing contactId param");
    var coin = await getCoin(params.coinId);
    if (!coin) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ coin });
  };
  

export const meta: MetaFunction <typeof loader> = ({
    data,
  }) => {

    var coin: CoinRecord = {
        id: data?.coin.id,
        chain: data?.coin.chain,
        ticker: data?.coin.ticker
    }

    if(coin.id === null) {
        return []
    }
    

    var date: string = Date.now().toString()
    var dateOffset = (24*60*60*1000)

    if(buttonIndex == 1) { //Today
        date = Date.now().toString()
    } else if (buttonIndex == 2) { //1D Ago
        date = (Date.now() - dateOffset * 1).toString()
    } else if (buttonIndex == 3) { //1W Ago
        date = (Date.now() - dateOffset * 7).toString()
    } else if (buttonIndex == 4) { //2W Ago
        date = (Date.now() - dateOffset * 14).toString()
    }

    image = `https://multichain-api.birdeye.so/${coin.chain}/thumbnails?token_address=${coin.id}&timestamp=${date}`

    console.log(image)

    return [
        {
            title: `Farcap ${coin.id}`
        },
        {
            property: "og:title",
            content: "Farcap frame"
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
            content: "Today"
        },
        {
            property: "fc:frame:button:2",
            content: "1D Ago"
        },
        {
            property: "fc:frame:button:3",
            content: "1W Ago"
        },
        {
            property: "fc:frame:button:4",
            content: "2W Ago"
        },
        {
        property: "fc:frame:post_url",
        content: `https://teletrade.ngrok.app/coin/${coin.id}`
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

export default function Coin() {

    const { coin } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>${coin.ticker}</h1>
            <img src={image} alt={coin.id}/>
        </div>
    );

}