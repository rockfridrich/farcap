import {
    getAddress,
    isAddress
} from "viem"

 type CoinRecord = {
    address: string;
    chain: string;
    ticker: string;
    buy_url?: string
};

export interface ICoin extends CoinRecord {
    id: string
    readonly preview: string
    readonly lp: string
}

class Coin implements CoinRecord {
    public id: string; // value-property (“field”)
    public address: string;
    public chain: string;
    public ticker: string;
    public buy_url?: string | undefined;

    constructor(
            address: string, 
            chain: string,
            ticker: string,
            buy_url?: string
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
    }
    
    get preview(){
        return `https://multichain-api.birdeye.so/${this.chain}/thumbnails?token_address=${this.address}&timestamp=${Date.now().toString()}`
    }

    get lp(){
        return `https://app.uniswap.org/add/${this.address}?chain=${this.chain}`
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
            values.buy_url
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
        buy_url: "https://app.zerion.io/tokens/DEGEN-d590ac9c-6971-42db-b900-0bd057033ae0"
    },
    {
        address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
        chain: "base",
        ticker: "AERO",
        buy_url: "https://app.zerion.io/tokens/AERO-430f1d3d-9a4b-4a56-b804-896b34843ac0"
    },
    {
        address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
        chain: "base",
        ticker: "TOSHI",
        buy_url: "https://app.zerion.io/tokens/TOSHI-0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4"
    },
    {
        address: "0x91f45aa2bde7393e0af1cc674ffe75d746b93567",
        chain: "base",
        ticker: "FRAME",
        buy_url: "https://app.zerion.io/tokens/FRAME-53c0bbd1-10f4-475e-92d4-e933a3ccbf99"
    }
].forEach((coin) => {
    Coins.create(
        coin,
    );
});
