
import { IQuote } from '../../models/IQuote'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConvertState {
  rates: any;
  coin: string;
  currency: string;
  selectCurrency: any;
}

const initialState: ConvertState = {
  rates: {},
  coin: '',
  currency: '',
  selectCurrency: {}
}

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {

    setConverterData(state, action:PayloadAction<any>) {   
      state.rates = action.payload
    },

    setCoin(state, action:PayloadAction<string>) {      
      state.coin = action.payload      
    },

    setCurrency(state, action:PayloadAction<string>) {
      state.currency = action.payload
    },

    setSelectCurrency(state, action:PayloadAction<any>) {      
      state.selectCurrency = action.payload
    }

  }
})

export default converterSlice.reducer;