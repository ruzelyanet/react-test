import { converterSlice } from './ConverterSlice';
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

    let rates:any = {}
    assets.forEach((item, index):void => {
      let [coin, currency] = item.asset.split('/')        

      if(!rates[coin]) {
        rates[coin] = {}
      }
            
      rates[coin][currency] = item.quote
    })        
          
    const cointInitialState = Object.keys(rates)[0]
    const currencyInitialState = Object.keys(rates[cointInitialState])[0]

    dispatch(converterSlice.actions.setCoin(cointInitialState))
    dispatch(converterSlice.actions.setCurrency(currencyInitialState))

    dispatch(converterSlice.actions.setSelectCurrency(rates[currencyInitialState]))
    
    
    dispatch(converterSlice.actions.setConverterData(rates))
    dispatch(quoteSlice.actions.fetchQuotesSuccess(assets))
  } catch (e:any) {
    dispatch(quoteSlice.actions.fetchQuotesError(e.message))
  }
}
