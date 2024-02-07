import { createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base } from 'viem/chains'
import { SwapTX } from './1inch.server'
 
const walletClient = createWalletClient({
  chain: base,
  transport: http()
})

export async function signTxParams(message: string) {

  const account = privateKeyToAccount(`0x${process.env.SIGNER_KEY}`)

  const signature = await walletClient.signMessage({ 
    account,
    message: message,
  })

  return signature;

}