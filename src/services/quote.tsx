import { IQuote } from "../models/IQuote";
import http from "./http";


async function getQuote() {
    try {
        const res = await http.post<IQuote[]>('/', {
          "action": "quote"
        })
        return res;
    } catch (e) {
        throw e;
    }
};

export default getQuote;