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
  let outputAmount = url.searchParams.get('outputAmount')
  console.log(outputAmount)
  if(outputAmount == null) 
  {
    outputAmount = ""
  }
  purchaseRedirect(coin, outputAmount)
  return json({coin: coin});
};

function purchaseRedirect(coin:ICoin, outputAmount: string) {
  const buyUrl = `https://app.uniswap.org/#/swap?chain=${coin.chain}&exactAmount=${outputAmount}&exactField=output&outputCurrency=${coin.address.toLowerCase()}&inputCurrency=ETH`
  throw redirect(buyUrl)
  //console.log(buyUrl)
}


export default function PurchaseRedirect() {

  return (
      <div>
          Yo / Purchase Redirect
      </div>
  );

}