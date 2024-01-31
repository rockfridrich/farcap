

export type CoinRecord = {
    id?: string;
    ticker?: string;
    chain?: string;
    buy_url?: string
};

export function getCoin(id: string) : CoinRecord | null {

    if(id === "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed") {
        return {
            id: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
            ticker: "DEGEN",
            chain: "base",
            buy_url: "https://app.zerion.io/tokens/DEGEN-d590ac9c-6971-42db-b900-0bd057033ae0"
        }
    } 

    return null

}
