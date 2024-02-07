import { 
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    json,
    redirect
} from "@remix-run/node"; // or cloudflare/deno

import invariant from "tiny-invariant";

import { getCoin, ICoin } from "../data";
import { CoinInfo, getTokenInfo } from "~/dexscreener.server";
import { coinPreview } from "~/preview.server";

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

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
    
    const coinInfo = await getTokenInfo(coin)

    const png = await coinPreview(coin, coinInfo)

     // Respond with the PNG buffer
    return new Response(png, {
      status: 200,
      headers: {
        // Tell the browser the response is an image
        'Content-Type': 'image/png',
        // Tip: You might want to heavily cache the response in production
        // 'cache-control': 'public, immutable, no-transform, max-age=31536000',
      },
    })
  }
