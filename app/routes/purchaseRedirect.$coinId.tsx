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
  let amount = url.searchParams.get('amount')
  if(amount === null) 
  {
      amount = ""
  }
  purchaseRedirect(coin, amount)
  return json({coin: coin});
};

function purchaseRedirect(coin:ICoin, amount: string) {

  let split = amount.split('.')
  let amountWithOutZeros = split[0]
  const buyUrl = `https://app.uniswap.org/#swap/?chain=${coin.chain}&outputCurrency=${coin.address}&exactAmount=${amountWithOutZeros}&exactField=output`
  throw redirect(buyUrl)
}


export default function PurchaseRedirect() {

  return (
      <div>
          ^_^
      </div>
  );

}