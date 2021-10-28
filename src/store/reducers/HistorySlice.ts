import { IHistory } from './../../models/IHistory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HistoryState {
  history: IHistory[];
  isLoading: boolean;
  error: string;  
}

const initialState: HistoryState = {
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
    }
  }
})

export default histoyrSlice.reducer;