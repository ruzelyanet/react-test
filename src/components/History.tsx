import React, { FC, useEffect } from "react";
import { Table, Spinner} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {IHistory} from '../models/IHistory';
import {fetchQuotes} from '../store/reducers/fetchHistory'
import Moment from 'react-moment';



const fields:string[] = ['Актив', 'Начало', 'Котировка', 'Конец', 'Котировка', 'Прибыль']
  
const History:FC = () =>  {
  let {history, isLoading, error} = useAppSelector(state => state.historyReducer)  

  const dispatch  = useAppDispatch()

  useEffect(() => {    
    dispatch(fetchQuotes())
  }, [])

  const sortArr = [...history]  
  
  sortArr.sort((i, t) => {
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

  return (    
    <div className="h-400 overflow-y-auto">              
      <Table bordered hover size="sm" className="thead-sticky history-table">
        <thead>
          <tr>             
            {fields.map((field, i) => {
              return <th key={i}>{field}</th>
            })}
          </tr>        
        </thead>

        <tbody>
          {history.map((field, i) => {
            return (
              <tr key={i}>                
                <td>{field.asset}</td>

                <td>
                  {field.startQuote}                  
                </td>

                <td>
                  <Moment format="HH:MM YYYY.MM.DD">
                    {field.startDate}  
                  </Moment>
                </td>

                <td>{field.finishQuote}</td>
                <td>
                  <Moment format="HH:MM YYYY.MM.DD">
                    {field.finishDate}
                  </Moment>                  
                </td>
                <td>{field.profit}</td>               
              </tr>)
          })}            
        </tbody>     
      </Table> 
    </div>
  )
}

export default History