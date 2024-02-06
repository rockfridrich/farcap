import { SwapTX } from "./1inch.server";
import {v4 as uuidv4} from 'uuid';

export const TXs = {
    records: {} as Record<string, SwapTX>,

    get(id: string): SwapTX | null {
        return TXs.records[id.toLowerCase()] || null;
    },

    create(values: SwapTX): string {
        let uuid = uuidv4();
        //console.log(uuid);
        TXs.records[uuid] = values;
        //console.log(TXs.records)
        return uuid
    },

    all() {
        return TXs.records;
    }
}


