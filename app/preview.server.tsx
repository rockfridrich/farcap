import {Resvg} from '@resvg/resvg-js'
import type {SatoriOptions} from 'satori'
import satori from 'satori'

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/image.$coinId'
import { CoinInfo } from './dexscreener.server'
import { ICoin } from './data'
import { nFormatter } from './utils'
import moment from 'moment'

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
            getFont("Inter")
        ]).then((fonts) => fonts.flat())
    }
    //https://momentjs.com/ Feb 7th, 2024 10:21 UTC
    const date = moment(Date.now()).format('MMM Do, Y hh:mm UTC');//%b %d, %Y %I:%M UTC

    // Design the image and generate an SVG with "satori"
    const svg = await satori(
        // <div
        //     <span>Name: {coin.ticker}</span>
        //     <span>Ticker: {coin.ticker}</span>
        //     { coinInfo.price && <span>Price: ${coinInfo.price}</span>}
        //     { coinInfo.change24h && <span>Change 24H: {coinInfo.change24h}%</span>}
        //     { coinInfo.marketcap && <span>FDMC: ${coinInfo.marketcap}</span>}
        //     { coinInfo.volume && <span>Trading Volume: ${coinInfo.volume}</span>}
        //     { coinInfo.liquidity && <span>Liqudity: ${coinInfo.liquidity}</span>}
        // </div>,
        <div
  className="container"
  style={{
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "55px 38px 35px",
    backgroundColor: "#1b1b1b",
    backgroundSize: "100%, 100%",
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1198" height="630" fill="none" viewBox="0 0 1198 630"%3E%3Cpath fill="url(%23a)" fill-rule="evenodd" d="M67.1-73.97h-2.68V66.5H0v2.68h64.42v169.1H0v2.69h64.42v169.1H0v2.68h64.42v168.2H0v3.58h64.42v76.95h2.68v-76.95h165.52v76.95h2.69v-76.95h165.51v76.95h2.69v-76.95h165.52v76.95h2.68v-76.95h166.42v76.95h2.68v-76.95h165.52v76.95H909v-76.95h166.42v76.95h2.68v-76.95H1198v-3.58h-119.89v-168.2H1198v-2.69h-119.89v-169.1H1198v-2.68h-119.89V69.18H1198V66.5h-119.89V-73.97h-2.68V66.5H909.01V-73.97h-2.68V66.5H740.8V-73.97h-2.68V66.5H571.7V-73.97h-2.68V66.5H403.5V-73.97h-2.69V66.5H235.31V-73.97h-2.69V66.5H67.1V-73.97Zm1008.33 654.92v-168.2H909.01v168.2h166.42Zm-169.1 0v-168.2H740.8v168.2h165.52Zm-168.2 0v-168.2H571.7v168.2h166.42Zm-169.1 0v-168.2H403.5v168.2h165.52Zm-168.2 0v-168.2H235.3v168.2h165.51Zm-168.2 0v-168.2H67.1v168.2h165.52Zm0-170.89H67.1v-169.1h165.52v169.1Zm168.2 0H235.3v-169.1h165.51v169.1Zm168.2 0H403.5v-169.1h165.52v169.1Zm169.1 0H571.7v-169.1h166.42v169.1Zm168.2 0H740.8v-169.1h165.52v169.1Zm169.1 0H909.01v-169.1h166.42v169.1Zm0-171.78V69.18H909.01v169.1h166.42Zm-169.1 0V69.18H740.8v169.1h165.52Zm-168.2 0V69.18H571.7v169.1h166.42Zm-169.1 0V69.18H403.5v169.1h165.52Zm-168.2 0V69.18H235.3v169.1h165.51Zm-168.2 0V69.18H67.1v169.1h165.52Z" clip-rule="evenodd" opacity=".1"/%3E%3Cdefs%3E%3ClinearGradient id="a" x1="1186.37" x2="104.68" y1="37.42" y2="614.05" gradientUnits="userSpaceOnUse"%3E%3Cstop stop-color="%23D9D9D9" stop-opacity=".06"/%3E%3Cstop offset=".52" stop-color="%23203369"/%3E%3Cstop offset="1" stop-color="%23D9D9D9" stop-opacity="0"/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" fill="none" viewBox="0 0 1200 630"%3E%3Cg filter="url(%23a)" opacity=".5"%3E%3Cellipse cx="600.5" cy="381" fill="%233A20D9" fill-opacity=".77" rx="879.5" ry="121"/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id="a" width="2417.68" height="900.68" x="-608.34" y="-69.34" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/%3E%3CfeGaussianBlur result="effect1_foregroundBlur_4_273" stdDeviation="164.67"/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")',
    fontFamily: '"Inter"',
    color: "#fff",
    fontSize: 29,
    fontWeight: 500,
    letterSpacing: "-0.06em",
    boxSizing: "border-box"
  }}
>
  <div
    className="row"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 23
    }}
  >
    <div
      className="title"
      style={{ display: "flex", alignItems: "center", gap: 23 }}
    >
      <img
        src="data:image/png;base64,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"
        alt=""
        className="ava"
        width={120}
        style={{ display: "block", flexShrink: 0 }}
      />
      <div
        className="title__holder"
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <div
          className="name"
          style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.03em", display: "flex" }}
        >
          {coin.previewName}
        </div>
        <div
          className="tag"
          style={{
            fontWeight: 400,
            fontSize: 43,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            opacity: "0.5",
            display: "flex"
          }}
        >
          {coin.ticker}
        </div>
      </div>
    </div>
    <div
      className="numbers"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2
      }}
    >
      <div
        className="cost"
        style={{ fontWeight: 500, fontSize: 70, letterSpacing: "-0.07em", display: "flex" }}
      >
        ${coinInfo.price}
      </div>
      <div
        className="dynamic"
        style={{
          fontWeight: 400,
          fontSize: 38,
          letterSpacing: "-0.03em",
          color: "#05ff87",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}
      >
        {(coinInfo.change24h > 0) ? `+${coinInfo.change24h}` : coinInfo.change24h}%
        <span
          className="dynamic__time"
          style={{
            fontWeight: 400,
            fontSize: 38,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            opacity: "0.5",
            color: "#fff"
          }}
        >
          (24 h)
        </span>
      </div>
    </div>
  </div>
  <div
    className="tabs"
    style={{ display: "flex", justifyContent: "space-between", gap: 23 }}
  >
    <div
      className="tab"
      style={{
        flex: 1,
        border: "3px solid #204fd9",
        borderRadius: 37,
        backdropFilter: "blur(43px)",
        background: "rgba(0, 0, 0, 0.28)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: 240
      }}
    >
      <div
        className="tab__name"
        style={{
          fontWeight: 400,
          fontSize: 37,
          letterSpacing: "-0.03em",
          textAlign: "center",
          color: "#fff",
          opacity: "0.8"
        }}
      >
        Market CAP
      </div>
      <div
        className="tab__sum"
        style={{
          fontWeight: 500,
          fontSize: 61,
          letterSpacing: "-0.04em",
          textAlign: "center",
          display: "flex"
        }}
      >
        ${nFormatter(coinInfo.marketcap,2)}
      </div>
    </div>
    <div
      className="tab"
      style={{
        flex: 1,
        border: "3px solid #204fd9",
        borderRadius: 37,
        backdropFilter: "blur(43px)",
        background: "rgba(0, 0, 0, 0.28)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: 240
      }}
    >
      <div
        className="tab__name"
        style={{
          fontWeight: 400,
          fontSize: 37,
          letterSpacing: "-0.03em",
          textAlign: "center",
          color: "#fff",
          opacity: "0.8"
        }}
      >
        Trading Vol (24H)
      </div>
      <div
        className="tab__sum"
        style={{
          fontWeight: 500,
          fontSize: 61,
          letterSpacing: "-0.04em",
          textAlign: "center",
          display: "flex"
        }}
      >
        ${nFormatter(coinInfo.volume,2)}
      </div>
    </div>
    <div
      className="tab"
      style={{
        flex: 1,
        border: "3px solid #204fd9",
        borderRadius: 37,
        backdropFilter: "blur(43px)",
        background: "rgba(0, 0, 0, 0.28)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: 240
      }}
    >
      <div
        className="tab__name"
        style={{
          fontWeight: 400,
          fontSize: 37,
          letterSpacing: "-0.03em",
          textAlign: "center",
          color: "#fff",
          opacity: "0.8"
        }}
      >
        Liquidity
      </div>
      <div
        className="tab__sum"
        style={{
          fontWeight: 500,
          fontSize: 61,
          letterSpacing: "-0.04em",
          textAlign: "center",
          display: "flex"
        }}
      >
        ${nFormatter(coinInfo.liquidity,2)}
      </div>
    </div>
  </div>
  <div
    className="row"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 23
    }}
  >
    <div className="yo" style={{ textTransform: "uppercase" }}>
      Yo.FINANCE
    </div>
    <div
      className="date"
      style={{ textTransform: "uppercase", paddingRight: 14, display: 'flex' }}
    >
      {date.toUpperCase()}
    </div>
  </div>
  <img
    src="data:image/png;base64,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"
    alt=""
    className="theguy"
    width={194}
    height={276}
    style={{ position: "absolute", bottom: 0, right: 0 }}
  />
</div>,
options
    )

    // Convert the SVG to PNG with "resvg"
    const resvg = new Resvg(svg)
    const pngData = resvg.render()
    return pngData.asPng()
  }

