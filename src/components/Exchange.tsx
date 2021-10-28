import React, { FC, useEffect } from "react";
import { Table, Spinner} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {IQuote} from "../models/IQuote"
import { fetchQuotes } from "../store/reducers/fetchQuotes";

import {quoteSlice} from '../store/reducers/QuoteSlice'

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const fields:string[] = ['Валютная пара', 'Котировка', 'Дата получения']

interface ICheckedFlag {
  flag: boolean | undefined;  
  handleClick: (e:React.MouseEvent<HTMLElement>) => void
}

const CheckedFlag:FC<ICheckedFlag> = ({flag, handleClick}) => { 
  return (
    <div className='checkStar' onClick={handleClick}>
      {flag ? <AiFillStar /> : <AiOutlineStar />}      
    </div>
  )
}

  
const Exchange:FC = () =>  {    
  let {quotes, isLoading, error} = useAppSelector(state => state.quoteReducer)  

  const dispatch  = useAppDispatch()

  useEffect(() => {    
    dispatch(fetchQuotes())    
  }, [])  

  const makeMove = (index: number) => {    
    const arr:IQuote[] = [...quotes]
    let taken:IQuote = {
      ...arr[index]
    }

    arr.splice(index, 1)

    const marked = arr.filter((item:IQuote) => {
      return item.flag
    })

    const unmarked = arr.filter((item:IQuote) => {
      return !item.flag
    })

    taken.flag = !taken.flag

    if(taken.flag) {        
      marked.unshift(taken)
    } else {
      unmarked.unshift(taken)
    }

    const res = [...marked, ...unmarked]
    
    dispatch(quoteSlice.actions.updateQuotes(res))  
  }

  return (    
    <div className="table-exchange h-400 overflow-y-auto">              
      <Table bordered hover size="sm" className="thead-sticky">
        <thead>
          <tr> 
            <th>
              <div className="w-16">              
                {isLoading ? <Spinner animation="border" size="sm" /> : ''}              
              </div>
            </th>
            {fields.map((field, i) => {
              return <th key={i}>{field}</th>
            })}
          </tr>        
        </thead>
        <tbody>          
          {quotes.map((field, i) => {
            return (
              <tr key={i}>
                <td>
                  <CheckedFlag flag={field.flag} handleClick={(e) => makeMove(i)} />
                </td>
                <td>{field.asset}</td>                
                <td>{field.quote}</td>
                <td>{field.startDate}</td>
              </tr>)
          })}
        </tbody>
      </Table>

      <div>
        {error}
      </div>
    </div>
  )
}

export default Exchange