/*
https://portal.1inch.dev/documentation/swap/quick-start
*/
import { isAddress, parseEther } from 'viem'

const chainId = 8453; // Chain ID: Base
const web3RpcUrl = "https://mainnet.base.org"; // URL for Base node

const swapParams = {
  src: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // Token address of ETH
  slippage: 1, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
  disableEstimate: false, // Set to true to disable estimation of swap details
  allowPartialFill: false // Set to true to allow partial filling of the swap order
};

const broadcastApiUrl = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/broadcast";
const apiBaseUrl = "https://api.1inch.dev/swap/v5.2/" + chainId;
const headers = { headers: { Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`, accept: "application/json" } };

// Construct full API request URL
function apiRequestUrl(methodName: string, queryParams) {
  return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}

async function buildTxForSwap(swapParams) {
  const url = apiRequestUrl("/swap", swapParams);

  // Fetch the swap transaction details from the API
  return fetch(url, headers)
    .then((res) => res.json())
}

export type SwapTX = {
  from: string;
  to: string;
  data: string;
  value: string;
  gas: number;
  gasPrice: string;
};

export async function swap(from: string, token: string, amount: string) {

  const swapTransaction = await buildTxForSwap(
      {
        src: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 
        slippage: 2, 
        disableEstimate: false, 
        allowPartialFill: false, 
        dst: token,
        amount: parseEther(amount),
        from: from
      }
  );
  
  if(swapTransaction?.error == 'Bad Request')
  {
    let description = swapTransaction.description.substring(0, 18)
    throw Error(description)
  }

  return swapTransaction
  
}