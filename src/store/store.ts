import { combineReducers, configureStore } from "@reduxjs/toolkit"
import quoteReducer from './reducers/QuoteSlice'
import historyReducer from './reducers/HistorySlice'
import converterSlice from './reducers/ConverterSlice'

const rootReducer = combineReducers({
  quoteReducer,
  historyReducer,
  converterSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']