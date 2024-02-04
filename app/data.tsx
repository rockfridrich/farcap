import {
    getAddress,
    isAddress
} from "viem"

 type CoinRecord = {
    address: string;
    chain: string;
    ticker: string;
    website?: string;
    buy_url?: string
};

export interface ICoin extends CoinRecord {
    id: string
    readonly preview: string
    readonly lp: string
    readonly screener: string
}

class Coin implements CoinRecord {
    public id: string;
    public address: string;
    public chain: string;
    public ticker: string;
    public buy_url?: string | undefined;
    public website?: string | undefined;

    constructor(
            address: string, 
            chain: string,
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
        ticker: "DEGEN",
        buy_url: "https://app.zerion.io/tokens/DEGEN-d590ac9c-6971-42db-b900-0bd057033ae0",
        website: "https://www.degen.tips/"
    },
    {
        address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
        chain: "base",
        ticker: "AERO",
        buy_url: "https://app.zerion.io/tokens/AERO-430f1d3d-9a4b-4a56-b804-896b34843ac0",
        website: "https://aerodrome.finance/"
    },
    {
        address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
        chain: "base",
        ticker: "TOSHI",
        buy_url: "https://app.zerion.io/tokens/TOSHI-0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4",
        website: "https://www.toshithecat.com/"
    },
    {
        address: "0x91f45aa2bde7393e0af1cc674ffe75d746b93567",
        chain: "base",
        ticker: "FRAME",
        buy_url: "https://app.zerion.io/tokens/FRAME-53c0bbd1-10f4-475e-92d4-e933a3ccbf99",
        website: "https://warpcast.com/~/channel/frame-token"
    },
    {
        address: "0x3cB90DfD6225917d4898dE73D6a7E4451B4f9D76",
        chain: "base",
        ticker: "LFG",
        buy_url: "https://app.uniswap.org/swap?outputCurrency=0x3cB90DfD6225917d4898dE73D6a7E4451B4f9D76&chain=base",
        website: "https://lfg-regens-and-degens.vercel.app/"
    },
    {
        address: "0xd7C1EB0fe4A30d3B2a846C04aa6300888f087A5F",
        chain: "ethereum",
        ticker: "POINTS",
        buy_url: "https://app.zerion.io/tokens/POINTS-2eec7406-74fc-471f-aaf0-e55a59248e37",
        website: "https://points.cool"
    }
].forEach((coin) => {
    Coins.create(
        coin,
    );
});
