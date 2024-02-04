import {Resvg} from '@resvg/resvg-js'
import type {SatoriOptions} from 'satori'
import satori from 'satori'

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/image.$coinId'
import { CoinInfo } from './dexscreener'
import { ICoin } from './data'

async function getFont(
    font: string,
    weights = [400, 500, 600, 700],
    text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\!@#$%^&*()_+-=<>?[]{}|;:,.`'’\"–—",
  ) {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(
        ";",
      )}&text=${encodeURIComponent(text)}`,
      {
        headers: {
          // Make sure it returns TTF.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      },
    ).then((response) => response.text())
  
    const resource = css.matchAll(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/g,
    )
  
    return Promise.all(
      [...resource]
        .map((match) => match[1])
        .map((url) => fetch(url).then((response) => response.arrayBuffer()))
        .map(async (buffer, i) => ({
          name: font,
          style: "normal",
          weight: weights[i],
          data: await buffer,
        })),
    ) as Promise<SatoriOptions["fonts"]>
  };

  export async function coinPreview(coin: ICoin, coinInfo: CoinInfo) {

    const options: SatoriOptions = {
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        fonts: await Promise.all([
            getFont("Roboto")
        ]).then((fonts) => fonts.flat())
    }
    
    // Design the image and generate an SVG with "satori"
    const svg = await satori(
        <div
            style={{
                width: options.width,
                height: options.height,
                background: 'linear-gradient( 135deg, #FD6585 10%, #0D25B9 100%)',
                color: 'white',
                fontFamily: 'Roboto',
                fontSize: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <span>Name: {coin.ticker}</span>
            <span>Ticker: {coin.ticker}</span>
            { coinInfo.price && <span>Price: ${coinInfo.price}</span>}
            { coinInfo.change24h && <span>Change 24H: {coinInfo.change24h}%</span>}
            { coinInfo.marketcap && <span>FDMC: ${coinInfo.marketcap}</span>}
            { coinInfo.volume && <span>Trading Volume: ${coinInfo.volume}</span>}
            { coinInfo.liquidity && <span>Liqudity: ${coinInfo.liquidity}</span>}
        </div>,
        options
    )

    // Convert the SVG to PNG with "resvg"
    const resvg = new Resvg(svg)
    const pngData = resvg.render()
    return pngData.asPng()
  }

