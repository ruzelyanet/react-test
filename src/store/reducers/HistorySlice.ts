import { IHistory } from './../../models/IHistory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HistoryState {
  historyPart: IHistory[];
  history: IHistory[];
  isLoading: boolean;
  error: string;  
}

const initialState: HistoryState = {
  historyPart: [],
  history: [],
  isLoading: false,
  error: '',
}

export const histoyrSlice = createSlice({
  name: 'history',
  initialState,

  reducers: {
    fetchHistory(state) {
      state.isLoading = true
    },

    fetchHistorySuccess(state, action:PayloadAction<IHistory[]>) {
      state.isLoading = false
      state.error = ''
      state.history = action.payload
    },
    
    fetchHistoryError(state, action:PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload
    },

    updateHistory(state, action:PayloadAction<IHistory[]>) {
      state.history = action.payload
    },

    updateHistoryPart(state, action:PayloadAction<number>) {      
      state.historyPart = []
      const partArray:IHistory[] = []

      const start = action.payload === 1 ? 1 : +`${action.payload - 1}0`;
      const end = +`${action.payload}0`

      for(let i = action.payload; i <= +`${action.payload}0`; i++) {              
        partArray.push(state.history[i])
      }

      state.historyPart = partArray
    }

  }
})

export default histoyrSlice.reducer;