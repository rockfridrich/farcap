import { 
  LoaderFunctionArgs,
  json
} from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant"

import { ICoin, getCoin } from "./../data";

export const loader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  invariant(params.coinId, "Missing contactId param");
  const coin = getCoin(params.coinId)
  if (coin == null) {
    throw new Response("Oh no! Coin is not in the database", {
      status: 404,
    }); 
  }
  const url = new URL(request.url)
  let amountTo = url.searchParams.get('amountTo')
  if(amountTo == null) 
  {
    amountTo = ""
  }
  let amountFrom = url.searchParams.get('amountFrom')
  if(amountFrom == null) 
  {
    amountFrom = ""
  }
  //console.log(amountOut)
  purchaseRedirect(coin, amountTo)
  return json({coin: coin});
};

function purchaseRedirect(coin:ICoin, amountTo: string) {
  const buyUrl = `https://app.uniswap.org/#swap/?chain=${coin.chain}&outputCurrency=${coin.address}&exactAmount=${amountTo}&exactField=output`
  throw redirect(buyUrl)
}


export default function PurchaseRedirect() {

  return (
      <div>
          ^_^
      </div>
  );

}