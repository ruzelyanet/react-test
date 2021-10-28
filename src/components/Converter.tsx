import React, { FC, useState, useEffect, FormEvent} from "react";
import { Form, Button, FormTextProps } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchQuotes } from "../store/reducers/fetchQuotes";

const Converter: FC = () => {
  
  const [sum, setSum] = useState<string>('')
  const [coin, setСoin] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')
  const [selectCoin, setSelectCoin] = useState<object>({})

  const [calc, setCalc] = useState<number>()

  const dispatch  = useAppDispatch()
  
  let {quotes, isLoading, error} = useAppSelector(state => state.quoteReducer) 

  useEffect(() => {    
    dispatch(fetchQuotes())
  }, [])

  let rates:any = {}

  quotes.forEach((item, index):void => {
    let [coin, currency] = item.asset.split('/')
    
    if(!rates[coin]) {
      rates[coin] = {}
    }
    rates[coin][currency] = item.quote
  })

  const cointChange = (e:React.FormEvent<HTMLSelectElement>):void => {
    setСoin(e.currentTarget.value)        
    setCurrency(Object.keys(rates[e.currentTarget.value])[0])
    setSelectCoin(rates[e.currentTarget.value])
  }

  const currencyChange = (e:React.FormEvent<HTMLSelectElement>):void => {
    setCurrency(e.currentTarget.value)    
  }

  const changeSum = (e:React.ChangeEvent<HTMLInputElement>):void => {    
    setSum(e.currentTarget.value)
  }

  const calulate = () => {    
    setCalc(+sum * +rates[coin][currency])
  }
  
  return (
    <div className="tab-card">
      <div className="tab-card-header">
        Конвертация валют
      </div>
      <div className="tab-card-body">
        <div className="container">
          <div className="converter">
            <div className="converter-form">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="d-flex align-items-end">
                    <div className="converter-form-control">
                      <label>Сумма</label>
                      <Form.Control 
                        value={sum} 
                        className="form-control-primary" 
                        disabled={isLoading}                         
                        onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => changeSum(e)} />
                    </div>

                    <div className="d-flex mx-3">
                      <div className="converter-form-control">
                        <Form.Select className="form-control-primary" disabled={isLoading} value={coin} onChange={(e) => cointChange(e)}>                          
                          {Object.keys(rates).map((key, i) => <option value={key} key={i}>{key}</option>)}
                        </Form.Select>
                      </div>

                      <div className="converter-form-control ms-2">
                        <Form.Select value={currency}  className="form-control-primary" disabled={isLoading} onChange={(e) => currencyChange(e)}>                          
                          {Object.keys(selectCoin).map((key, i) => <option value={key} key={i}>{key}</option>)}
                        </Form.Select>
                      </div>
                    </div>

                    <div>
                      <Button variant="primary" disabled={!currency.length || !sum || !coin} onClick={calulate}>Рассчитать</Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="converter-separator"></div>
            
            { 
              calc ?
              <div className="converter-res">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <label>Итого</label>
                    <div className="converter-res-num">{calc}</div>
                  </div>
                </div>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Converter