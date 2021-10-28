import { histoyrSlice } from './HistorySlice';
import { IHistory } from '../../models/IHistory';
import { AppDispatch } from './../store';
import http from "../../services/http";

interface IHistoryRes {
  result: string;
  deals: IHistory[];
}

export const fetchQuotes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(histoyrSlice.actions.fetchHistory())
    
    const res = await http.post<IHistoryRes>('/', {
      "action": "history"
    })

    const {deals} = res.data

    dispatch(histoyrSlice.actions.fetchHistorySuccess(deals))
  } catch (e:any) {
    dispatch(histoyrSlice.actions.fetchHistoryError(e.message))
  }
}
