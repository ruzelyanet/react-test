
import { IQuote } from '../../models/IQuote'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuoteState {
  quotes: IQuote[];
  isLoading: boolean;
  error: string;  
}

const initialState: QuoteState = {
  quotes: [],
  isLoading: false,
  error: '',
}

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    fetchQuotes(state) {
      state.isLoading = true
    },

    fetchQuotesSuccess(state, action:PayloadAction<IQuote[]>) {
      state.isLoading = false
      state.error = ''      
      state.quotes = action.payload
    },
    
    fetchQuotesError(state, action:PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload
    },

    updateQuotes(state, action:PayloadAction<IQuote[]>) {
      state.quotes = action.payload
    }
  }
})

export default quoteSlice.reducer;