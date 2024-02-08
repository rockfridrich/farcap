import {
    getAddress,
    isAddress
} from "viem"

 type CoinRecord = {
    address: string;
    chain: string;
    chain_id: number;
    ticker: string;
    website?: string;
    buy_url?: string
};

export interface ICoin extends CoinRecord {
    id: string
    readonly preview: string
    readonly lp: string
    readonly screener: string
    readonly previewName: string
}

class Coin implements CoinRecord {
    public id: string;
    public address: string;
    public chain: string;
    public ticker: string;
    public chain_id: number;
    public buy_url?: string | undefined;
    public website?: string | undefined;

    constructor(
            address: string, 
            chain: string,
            chain_id: number,
            ticker: string,
            buy_url?: string,
            website?: string
        )
    {
        if(!isAddress(address)) {
            throw new Error("Wrong address");
        }

        this.id = address.toLowerCase();
        this.address = getAddress(this.id);
        this.ticker = '$'+ticker
        this.chain = chain
        this.chain_id = chain_id
        this.buy_url = buy_url
        this.website = website
    }
    
    get preview(){
        return `https://multichain-api.birdeye.so/${this.chain}/thumbnails?token_address=${this.address}&timestamp=${Date.now().toString()}`
    }

    get lp(){
        return `https://app.uniswap.org/add/${this.address}?chain=${this.chain}`
    }

    get screener(){
        return `https://dexscreener.com/${this.chain}/${this.address}`
    }

    get previewName() {
        return `${this.ticker.charAt(1).toUpperCase()
        + this.ticker.toLowerCase().slice(2)} (${this.chain.charAt(0).toUpperCase()
            + this.chain.toLowerCase().slice(1)})`
    }
}

const Coins = {
    records: {} as Record<string, ICoin>,

    get(id: string): ICoin | null {
        return Coins.records[id.toLowerCase()] || null;
    },

    create(values: CoinRecord): ICoin {
        
        let coin = new Coin(
            values.address,
            values.chain,
            values.chain_id,
            values.ticker,
            values.buy_url,
            values.website
        )

        Coins.records[coin.id] = coin;
        return coin;
    },
}

export function getCoin(id: string) {
    return Coins.get(id);
}

[
    {
        address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
        chain: "base",
        chain_id: 8453,
        ticker: "DEGEN",
        buy_url: "https://app.zerion.io/tokens/DEGEN-d590ac9c-6971-42db-b900-0bd057033ae0",
        website: "https://www.degen.tips/"
    },
    {
        address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
        chain: "base",
        chain_id: 8453,
        ticker: "AERO",
        buy_url: "https://app.zerion.io/tokens/AERO-430f1d3d-9a4b-4a56-b804-896b34843ac0",
        website: "https://aerodrome.finance/"
    },
    {
        address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
        chain: "base",
        chain_id: 8453,
        ticker: "TOSHI",
        buy_url: "https://app.zerion.io/tokens/TOSHI-0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4",
        website: "https://www.toshithecat.com/"
    },
    {
        address: "0x91f45aa2bde7393e0af1cc674ffe75d746b93567",
        chain: "base",
        chain_id: 8453,
        ticker: "FRAME",
        buy_url: "https://app.zerion.io/tokens/FRAME-53c0bbd1-10f4-475e-92d4-e933a3ccbf99",
        website: "https://warpcast.com/~/channel/frame-token"
    },
    {
        address: "0x3cB90DfD6225917d4898dE73D6a7E4451B4f9D76",
        chain: "base",
        chain_id: 8453,
        ticker: "LFG",
        buy_url: "https://app.uniswap.org/swap?outputCurrency=0x3cB90DfD6225917d4898dE73D6a7E4451B4f9D76&chain=base",
        website: "https://lfg-regens-and-degens.vercel.app/"
    },
    // {
    //     address: "0xd7C1EB0fe4A30d3B2a846C04aa6300888f087A5F",
    //     chain: "ethereum",
    //     ticker: "POINTS",
    //     buy_url: "https://app.zerion.io/tokens/POINTS-2eec7406-74fc-471f-aaf0-e55a59248e37",
    //     website: "https://points.cool"
    // },
    {
        address: "0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE",
        chain: "base",
        chain_id: 8453,
        ticker: "TBYG",
        buy_url: "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE",
        website: "https://www.basegod.fun/"
    },
    {
        address: "0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50",
        chain: "base",
        chain_id: 8453,
        ticker: "MOCHI",
        buy_url: "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50",
        website: "https://mochithecatcoin.com/"
    },
    {
        address: "0x93e6407554B2F02640aB806cD57bd83e848Ec65d",
        chain: "base",
        chain_id: 8453,
        ticker: "FAR",
        buy_url: "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x93e6407554B2F02640aB806cD57bd83e848Ec65d",
        website: "https://warpcast.com/~/channel/farlaunch"
    },
    {
        address: "0xB36A0e830bD92E7AA5D959c17A20D7656976dd98",
        chain: "base",
        chain_id: 8453,
        ticker: "wowow",
        buy_url: "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0xB36A0e830bD92E7AA5D959c17A20D7656976dd98",
        website: "https://www.wowow.lol/"
    }
].forEach((coin) => {
    Coins.create(
        coin,
    );
});
