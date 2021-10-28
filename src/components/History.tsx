import React, { FC, useEffect, useState } from "react";
import { Table, Spinner} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {IHistory} from '../models/IHistory';
import {fetchHistory} from '../store/reducers/fetchHistory'
import {histoyrSlice} from '../store/reducers/HistorySlice'
import Moment from 'react-moment';

import Pagination from './Pagination'



const fields:string[] = ['Актив', 'Начало', 'Котировка', 'Конец', 'Котировка', 'Прибыль']
  
const History:FC = () =>  {
  let {history, historyPart, isLoading, error} = useAppSelector(state => state.historyReducer)  

  const dispatch  = useAppDispatch()  

  useEffect(() => {
    dispatch(fetchHistory())
  }, [])

  const updatePartHistory = (page:number) => {
    dispatch(histoyrSlice.actions.updateHistoryPart(page))    
  } 
  
  const profitNumb = (profit:string) => {
    return +profit > 0 ? `+${profit}` : profit;
  }

  return (    
    <div className="h-400 history-table">
      <Table bordered hover size="sm" className="thead-sticky">
        <thead>
          <tr>             
            {fields.map((field, i) => {
              return <th key={i}>{field}</th>
            })}
          </tr>        
        </thead>

        <tbody>
          {historyPart.map((field, i) => {
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
                <td className="text-end">
                  {profitNumb(field.profit)}
                </td>
              </tr>)
          })}            
        </tbody>     
      </Table> 

      <Pagination total={history.length} perPage={10} change={(page) => updatePartHistory(page)}/>
    </div>
  )
}

export default History