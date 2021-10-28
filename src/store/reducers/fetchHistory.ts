import { histoyrSlice } from './HistorySlice';
import { IHistory } from '../../models/IHistory';
import { AppDispatch } from './../store';
import http from "../../services/http";

interface IHistoryRes {
  result: string;
  deals: IHistory[];
}

export const fetchHistory = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(histoyrSlice.actions.fetchHistory())
    
    const res = await http.post<IHistoryRes>('/', {
      "action": "history"
    })

    const {deals} = res.data

    deals.sort((i, t) => {
      const iDate = +new Date(i.finishDate)
      const tDate = +new Date(t.finishDate)
  
      if (iDate > tDate) {
        return -1;
      }
      if (iDate < tDate) {
        return 1;
      }
      return 0;
    })


    dispatch(histoyrSlice.actions.fetchHistorySuccess(deals))
    dispatch(histoyrSlice.actions.updateHistoryPart(1))
  } catch (e:any) {
    dispatch(histoyrSlice.actions.fetchHistoryError(e.message))
  }
}
