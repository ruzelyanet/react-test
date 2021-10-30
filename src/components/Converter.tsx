import React, { FC, useState, useEffect} from "react";
import { Form, Button, FormTextProps } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchQuotes } from "../store/reducers/fetchQuotes";
import { converterSlice } from '../store/reducers/ConverterSlice';

const Converter: FC = () => {
  const dispatch  = useAppDispatch()

  const [sum, setSum] = useState<string>('')
  const [calc, setCalc] = useState<number>()
  
  let {isLoading} = useAppSelector(state => state.quoteReducer)
  let {rates, coin, currency, selectCurrency} = useAppSelector(state => state.converterSlice)

  useEffect(() => {    
    dispatch(fetchQuotes())
    
  }, [])

  const cointChange = (e:React.FormEvent<HTMLSelectElement>):void => {    
    dispatch(converterSlice.actions.setCoin(e.currentTarget.value))
    dispatch(converterSlice.actions.setSelectCurrency(rates[e.currentTarget.value]))

    const currencyInitialState = Object.keys(rates[e.currentTarget.value])[0]
    dispatch(converterSlice.actions.setCurrency(currencyInitialState))   
  }

  const currencyChange = (e:React.FormEvent<HTMLSelectElement>):void => {   
    dispatch(converterSlice.actions.setCurrency(e.currentTarget.value))
  }

  const changeSum = (e:React.ChangeEvent<HTMLInputElement>):void => {    
    setSum(e.currentTarget.value)
  }

  const calсulate = () => {
    console.log(coin, currency)
    setCalc(+sum * +rates[coin][currency])
  }
  
  return (
    <div className="tab-card">
      <div className="tab-card-header">
        Конвертация валют
      </div>
      <div className="tab-card-body">
        <div className="container-fluid">
          <div className="converter">
            <div className="converter-form">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="d-md-flex align-items-end">
                    <div className="converter-form-control">
                      <label>Сумма</label>
                      <Form.Control 
                        value={sum} 
                        className="form-control-primary" 
                        disabled={isLoading}                         
                        onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault();}}}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => changeSum(e)} />
                    </div>

                    <div className="d-flex mx-md-3 my-3 my-md-0">
                      <div className="converter-form-control">
                        <Form.Select className="form-control-primary" disabled={isLoading} value={coin} onChange={(e) => cointChange(e)}>                          
                          {Object.keys(rates).map((key, i) => <option value={key} key={i}>{key}</option>)}
                        </Form.Select>
                      </div>

                      <div className="converter-form-control ms-2">
                        <Form.Select value={currency}  className="form-control-primary" disabled={isLoading} onChange={(e) => currencyChange(e)}>                          
                          {Object.keys(selectCurrency).map((key, i) => <option value={key} key={i}>{key}</option>)}
                        </Form.Select>
                      </div>
                    </div>

                    <div>
                      <Button variant="primary" disabled={!currency.length || !sum || !coin} onClick={calсulate}>Рассчитать</Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="converter-separator"></div>
            
            <div className="converter-res">
              { 
                calc ?
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <label>Итого</label>
                    <div className="converter-res-num">{calc}</div>
                  </div>
                </div> : ''
              }              
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Converter