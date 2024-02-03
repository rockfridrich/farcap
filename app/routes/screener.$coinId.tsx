import { 
  LoaderFunctionArgs,
  json
} from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant"

import { ICoin, getCoin } from "../data";

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
  screener(coin)
  return json({coin: coin});
};

function screener(coin:ICoin) {

  throw redirect(coin.screener)
}


export default function Website() {

    return (
      <div>^_^</div>
    );

}