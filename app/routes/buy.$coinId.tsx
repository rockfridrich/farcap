import type { 
  LoaderFunctionArgs,
  json
} from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant"

import { ICoin, getCoin } from "./../data";

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
  buy(coin)
  return json({coin: coin});
};

function buy(coin:ICoin) {

  if(coin.buy_url == null) {
    throw new Response("Oh no! Coin has no buy page", {
      status: 404,
    }); 
  }
  console.log(coin.buy_url)
  throw redirect(coin.buy_url)
}


export default function Buy() {

    return (
      <div>^_^</div>
    );

}