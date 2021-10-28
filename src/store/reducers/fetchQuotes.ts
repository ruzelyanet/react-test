import { quoteSlice } from './QuoteSlice';
import { IQuote } from './../../models/IQuote';
import { AppDispatch } from './../store';
import http from "../../services/http";

interface IQuotesRes {
  result: string;
  assets: IQuote[];
}

export const fetchQuotes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(quoteSlice.actions.fetchQuotes())
    
    const res = await http.post<IQuotesRes>('/', {
      "action": "quote"
    })

    const assets = res.data.assets.map((item) => {
      item.flag = false
      return item
    })      

    dispatch(quoteSlice.actions.fetchQuotesSuccess(assets))
  } catch (e:any) {
    dispatch(quoteSlice.actions.fetchQuotesError(e.message))
  }
}
