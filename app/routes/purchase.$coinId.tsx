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
import { getFarcasterUserAddress } from "~/neynar.server";
import {v4 as uuidv4} from 'uuid';
import { signTxParams } from "~/signer.server";

var mode: string = "SWAP"

var buttonIndex: number = 0
var inputText: string = ""
var inputPlaceholder = 'Amount of ETH to purchase (0.01, 0.1, 1 etc)'

var inputAmount: number = 0
var outputAmount: string = ""

var targetUrl: string = "";
var tx: SwapTX; 


export async function action({
  request,
  params
}: ActionFunctionArgs) {
    invariant(params.coinId, "Missing contactId param");

    const body = await request.json();

    buttonIndex = body.untrustedData.buttonIndex;
    inputText = body.untrustedData.inputText; 
    inputPlaceholder = 'Amount of ETH to purchase (0.01, 0.1, 1 etc)';

    const coin = getCoin(params.coinId)
    if (coin == null) {
        throw new Response("Oh no! Coin is not in the database", {
            status: 404,
        }); 
    }

    try {

      if(isNumber(inputText)) {

        inputAmount = Number(inputText)

        if(inputAmount > 0) {
          
          let address = await getFarcasterUserAddress(body.trustedData.messageBytes)

          let swapTx = await swap(
            address, 
            coin.address,
            inputAmount.toString()
          )
         
          outputAmount = formatUnits(swapTx.toAmount, 18) //TODO: Decimals to Coin
          tx = swapTx.tx

          mode = "PURCHASE"
        
        }
      } else {
        if(inputText != "" && inputText != undefined) {
          console.log(inputText);
          throw Error('Please enter a number')
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

    if(mode == "PURCHASE" && tx != undefined) 
    {
      const UUID = uuidv4()

      let split = outputAmount.split('.')
      let amountWithOutZeros = split[0]

      let urlParams = `to=${tx.to}&from=${tx.from}&data=${tx.data}&value=${tx.value}&gas=${tx.gas}&gasPrice=${tx.gasPrice}&chainId=${coin.chain_id}&id=${UUID}&outputToken=${coin.address}&outputTicker=${coin.ticker}&outputAmount=${amountWithOutZeros}&inputToken=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&inputTicker=ETH&inputAmount=${inputAmount}`
        
      let signature =  await signTxParams(urlParams)
  
      targetUrl = `${process.env.DOMAIN}/purchaseRedirect/${coin.address}?${urlParams}&signature=${signature}`
    }

    

  return (
    <div>Yo / Purchase</div>
  ); 
}

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
          property: "fc:frame:button:2",
          content: `🔄`
        },
        {
          property: "fc:frame:button:2:action",
          content: "post"
        },
        {
          property: "fc:frame:input:text",
          content: `${inputPlaceholder}`
        },
        {
          property: "fc:frame:post_url",
          content: `${data.env.domain}/purchase/${coin.address}`
        }
      ];
    } else if(mode === 'PURCHASE') {

      let split = outputAmount.split('.')
      let amountWithOutZeros = split[0]

      const swapUUID = uuidv4()
      
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
          property: "fc:frame:button:1:target",
          content: targetUrl
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
          content: `${data.env.domain}/purchase/${coin.address}?swap=${swapUUID}&inputAmount=${inputAmount}&outputAmount=${amountWithOutZeros}`
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

export default function Purchase() {

    return (
        <div>
            Yo / Purchase
        </div>
    );

}