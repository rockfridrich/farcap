import { useParams } from "@remix-run/react";
import type { 
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json
} from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant"

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.coinId, "Missing contactId param");
  buy(params.coinId)
  return json({coin: params.coinId});
};

function buy(coin:string) {
  if(coin === '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed')
  {
      throw redirect('https://app.zerion.io/tokens/DEGEN-d590ac9c-6971-42db-b900-0bd057033ae0')
  } else if (coin === "0x940181a94A35A4569E4529A3CDfB74e38FD98631") {
      throw redirect('https://app.zerion.io/tokens/AERO-430f1d3d-9a4b-4a56-b804-896b34843ac0')
  } else if (coin === "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4") { 
      throw redirect('https://app.zerion.io/tokens/TOSHI-0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4')
  }
}


export default function Buy() {

    return (
      <div>^_^</div>
    );

}