import { 
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    json,
    redirect
} from "@remix-run/node"; // or cloudflare/deno

import invariant from "tiny-invariant";

import { getCoin, ICoin } from "../data";

var buttonIndex: number = 0

export const loader = async ({
    params,
  }: LoaderFunctionArgs) => {
    invariant(params.coinId, "Missing contactId param");
    const coin = getCoin(params.coinId)
    if (coin == null) {
        throw new Response("Oh no! Coin is not in the database", {
            status: 404,
        }); 
    }
    return json({ coin: coin, env: {
        domain: process.env.DOMAIN
    } });
  };
  

export const meta: MetaFunction <typeof loader> = ({
    data,
  }) => {

    if(data?.coin.id == null) {
        throw Error('Coin not found')
    }

    let coin = getCoin(data.coin.id)

    if (coin === null) {
        throw Error('Coin not found')
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
          content: coin.preview
        },
        {
          property: "fc:frame",
          content: "vNext"
        },
        {
          property: "fc:frame:image",
          content : coin.preview
        },
        {
          property: "fc:frame:button:1",
          content: `Website`
        },
        ,
        {
          property: "fc:frame:button:1:action",
          content: `post_redirect`
        },
        {
          property: "fc:frame:button:2",
          content: `DexScreener`
        },
        {
          property: "fc:frame:button:2:action",
          content: "post_redirect"
        },
        {
            property: "fc:frame:button:3",
            content: `Swap`
        },
        {
            property: "fc:frame:button:3:action",
            content: "post_redirect"
        },
        {
            property: "fc:frame:button:4",
            content: `Provide LP`
        },
        {
            property: "fc:frame:button:4:action",
            content: "post_redirect"
        },
        {
          property: "fc:frame:post_url",
          content: `${data.env.domain}/coin/${coin.address}`
        }
      ];
};

export async function action({
  request,
  params
}: ActionFunctionArgs) {
    invariant(params.coinId, "Missing contactId param");
    const body = await request.json();
    buttonIndex = body.untrustedData.buttonIndex;
  
    const coin = getCoin(params.coinId)
    if (coin == null) {
        throw new Response("Oh no! Coin is not in the database", {
            status: 404,
        }); 
    }
    if (buttonIndex == 1) {
        return redirect(`${process.env.DOMAIN}/website/${coin.address}`, 302);
    } else if (buttonIndex == 2) {
        return redirect(`${process.env.DOMAIN}/screener/${coin.address}`, 302);
    } else if(buttonIndex === 3) {
        return redirect(`${process.env.DOMAIN}/buy/${coin.address}`, 302);
    } else if (buttonIndex == 4) {

        return redirect(`${process.env.DOMAIN}/lp/${coin.address}`, 302);
    }

  return (
    <div>^_^</div>
  ); 
}

export default function Coin() {

    return (
        <div>
            ^_^
        </div>
    );

}