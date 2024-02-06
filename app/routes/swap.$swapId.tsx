import { 
    LoaderFunctionArgs,
    json
} from "@remix-run/node"; // or cloudflare/deno
  
import invariant from "tiny-invariant"  
import { TXs } from "~/data-txs";
  
  export const loader = async ({
    params,
  }: LoaderFunctionArgs) => {
    invariant(params.swapId, "Missing contactId param");
    
    const swap = TXs.get(params.swapId)
//    console.log(swap)
    // console.log(TXs.all())
    if (swap == null) {
      throw new Response("Oh no! Coin is not in the database", {
        status: 404,
      }); 
    }
    return json({swap: swap});
  };