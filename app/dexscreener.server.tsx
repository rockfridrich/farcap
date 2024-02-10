import { ICoin } from "./data";

interface IPair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
      address: string;
      name: string;
      symbol: string;
    };
    quoteToken: {
      address: string;
      name: string;
      symbol: string;
    };
    priceNative: string;
    priceUsd?: string;
    txns: {
      m5: {
        buys: number;
        sells: number;
      };
      h1: {
        buys: number;
        sells: number;
      };
      h6: {
        buys: number;
        sells: number;
      };
      h24: {
        buys: number;
        sells: number;
      };
    };
    volume: {
      m5: number;
      h1: number;
      h6: number;
      h24: number;
    };
    priceChange: {
      m5: number;
      h1: number;
      h6: number;
      h24: number;
    };
    liquidity?: {
      usd?: number;
      base: number;
      quote: number;
    };
    fdv?: number;
    pairCreatedAt?: number;
  }

  export type CoinInfo = {
     volume: number,
     change24h: number;
     price?: string,
     liquidity?: number;
     marketcap?: number;
     
  }

  export async function getTokenInfo(token: ICoin): Promise<CoinInfo> {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${token.address}`
      );

      const data = await response.json()

      if(data?.pairs?.length == 0) {
          throw Error('No pairs found')
      }

      const pairs: IPair[] = data.pairs;
      
      let topPair = pairs.filter(function(pair) {
          return (
              pair.quoteToken.symbol === 'WETH' 
              && pair.quoteToken.address == '0x4200000000000000000000000000000000000006'
              && pair.chainId == token.chain
          )
      }).reduce((prev: IPair, current: IPair) => {
          
          let p = 0
          let c = 0

          if(prev.liquidity?.usd) {
            p = prev.liquidity.usd
          }

          if(current.liquidity?.usd) {
            c = current.liquidity.usd
          }

          return p > c ? prev : current
      })

      const coinInfo: CoinInfo =  {
          volume: topPair.volume.h24,
          change24h: topPair.priceChange.h24,
          price: topPair.priceUsd,
          liquidity: topPair.liquidity?.usd,
          marketcap: topPair.fdv,
      } 

      return coinInfo
      
      
  }