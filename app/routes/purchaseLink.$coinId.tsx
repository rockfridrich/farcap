import { 
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    json,
    redirect
} from "@remix-run/node"; // or cloudflare/deno

import invariant from "tiny-invariant";

import { getCoin, ICoin } from "../data";
import { isNumber, numberWithCommas } from "~/utils";
import { SwapTX, swap } from "~/1inch.server";
import { formatUnits } from "viem";
import { TXs } from "~/data-txs";
import { getFarcasterUserAddress } from "~/neynar.server";

var mode: string = "SWAP"

var buttonIndex: number = 0
var inputText: string = ""
var inputPlaceholder = 'Amount of ETH to purchase (0.01, 0.1, 1 etc)'

var inputAmount: number = 0
var toAmount: string = ""

var tx: SwapTX; 

function buy(coin:ICoin, amountTo: string, amountFrom: string) {

  let split = amountTo.split('.')
  let amountWithOutZeros = split[0]
  throw redirect(`${process.env.DOMAIN}/purchaseRedirect/${coin.address}?amountTo=${amountWithOutZeros}&amountFrom=${amountFrom}&ticker=${coin.ticker}&token=${coin.address}`, 302);
  //const buyUrl = `${coin.address}&exactAmount=${amountWithOutZeros}&exactField=output`
  //throw redirect(buyUrl)
}


export async function action({
  request,
  params
}: ActionFunctionArgs) {
    invariant(params.coinId, "Missing contactId param");

    const body = await request.json();
    buttonIndex = body.untrustedData.buttonIndex;
    inputText = body.untrustedData.inputText; 

    const coin = getCoin(params.coinId)
    if (coin == null) {
        throw new Response("Oh no! Coin is not in the database", {
            status: 404,
        }); 
    }

    inputPlaceholder = 'Amount of ETH to purchase (0.01, 0.1, 1 etc)'

    try {

      if(isNumber(inputText)) {

        inputAmount = Number(inputText)

        if(inputAmount > 0) {
          mode = "PURCHASE"

          let address = await getFarcasterUserAddress(body.trustedData.messageBytes)

          let swapTx = await swap(
            address, 
            coin.address,
            inputAmount.toString()
          )
         
          if(swapTx == false) {
            mode = 'SWAP'
          } else {
            toAmount = formatUnits(swapTx.toAmount, 18)
            tx = swapTx.tx
          }
        }
      }

    } catch (e) {
      if (e instanceof Error) {
        mode = "SWAP"
        inputPlaceholder = `Error: ${e.message} | ${inputPlaceholder}`
      }
    }

    const url = new URL(request.url)
    const uuid = url.searchParams.get('swap')

    if(uuid != null && buttonIndex != 2) //Back Button
    {
        let amountIn = url.searchParams.get('amountIn')
        if(amountIn == null || amountIn == "") {
          amountIn = "0"
        }
        let amountOut = url.searchParams.get('amountOut')
        if(amountOut == null || amountOut == "") {
          amountOut = "0"
        }

        buy(coin, amountOut, amountIn);
    }
  

  return (
    <div>^_^</div>
  ); 
}

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
    const uuid = url.searchParams.get('swap')

    if(uuid != null && buttonIndex != 2) //Back Button
    {
        let amountIn = url.searchParams.get('amountIn')
        if(amountIn == null || amountIn == "") {
          amountIn = "0"
        }
        let amountOut = url.searchParams.get('amountOut')
        if(amountOut == null || amountOut == "") {
          amountOut = "0"
        }

        buy(coin, amountOut, amountIn);
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

    if(mode == 'SWAP' || buttonIndex == 2) {
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
          content: `Buy`
        },
        {
          property: "fc:frame:button:1:action",
          content: "post"
        },
        {
          property: "fc:frame:input:text",
          content: `${inputPlaceholder}`
        },
        {
          property: "fc:frame:post_url",
          content: `${data.env.domain}/purchaseLink/${coin.address}`
        }
      ];
    } else if(mode === 'PURCHASE') {

      let split = toAmount.split('.')
      let amountWithOutZeros = split[0]

      const swapUUID = TXs.create(tx)

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
          content: `Buy: ${numberWithCommas(amountWithOutZeros)} ✅`
        },
        {
          property: "fc:frame:button:1:action",
          content: "link"
        },
        {
          /*
            from: string;
            to: string;
            data: string;
            value: string;
            gas: number;
            gasPrice: string;
          */
          property: "fc:frame:button:1:target",
          content: `${data.env.domain}/purchaseLink/${coin.address}?to=${tx.to}&from=${tx.from}&data=${tx.data}&value=${tx.value}&gas=${tx.gas}&gasPrice=${tx.gasPrice}&swap=${swapUUID}&token=${coin.address}&ticker=${coin.ticker}&amountIn=${inputAmount}&amountOut=${amountWithOutZeros}`
        },
        {
          property: "fc:frame:button:2",
          content: `⬅️ Back`
        },
        {
          property: "fc:frame:button:2:action",
          content: "post"
        },
        {
          property: "fc:frame:post_url",
          content: `${data.env.domain}/purchaseLink/${coin.address}?swap=${swapUUID}&token=${coin.address}&ticker=${coin.ticker}&amountIn=${inputAmount}&amountOut=${amountWithOutZeros}`
        }
      ];

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
      }
    ]
};

export default function PurchaseLink() {

    return (
        <div>
            ^_^
        </div>
    );

}