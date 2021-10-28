import React, {FC, useState} from 'react';
import { Button, Container, Form, InputGroup, FormControl, Card } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import postLogin from "../services/login"

interface IErrors {
  login: string[];
  password: string[];
}

const Login:FC  = () => {
  const [login, setValue] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [errors, setError] = useState<IErrors>({
    login: [],
    password:[]
  })

  const [serverError, setServerError] = useState<string>('')

  let history = useHistory();

  const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)    
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)    
  }  

  const validate = ():boolean => {
    const errors:IErrors = {
      login: [],
      password:[]
    }    

    if (!login) {
      errors.login.push("Обязательное поле")
    }

    if (!login.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {      
      errors.login.push("Не валидный Email")
    }

    if (!password) {
      errors.password.push('Обязательное поле');
    }

    if (password.length < 6) {      
      errors.password.push('Не меньше 7 символов');
    }
           
    if (!(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z_0-9]{7,}$/.test(password))) {      
      errors.password.push('Не валидный пароль');
    }

    if (errors.password.length || errors.login.length) {
      setError(errors);
      return false;
    }

    return true;
  };

  const submit = (e:React.MouseEvent<HTMLButtonElement>) => { 
    setServerError('')
    setError({
      login: [],
      password:[]
    });    

    const isValid:boolean = validate();    

    if(isValid) {     
      postLogin({
        action:'login',
        login:login,
        password:password
      }).then((data:any) => {
        if(data.error) {
          setServerError(data.error)
        } else if(data.result === 'ok'){
          localStorage.setItem('login', data.result)

          history.replace("/home")
        }              
      })    
    }

  }

  return (        
    <div className="b-login">
      <Card className="card-primary">
        <Card.Header>Вход в личный кабинет</Card.Header>
        <Card.Body>                              
            <div className="login-form">
              <Form>
                <div className="mb-50">
                  <Form.Group className="form-group pb-3">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control value={login} onChange={changeLogin} placeholder="user@mail.ru" type="text" className={errors.login[0] && 'is-invalid'}/>
                    <div className="form-input-error text-danger text-end">
                      {errors.login[0]}
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="form-group pb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={password} onChange={changePassword} placeholder="*******" type="password"  className={errors.password[0] && 'is-invalid'} />
                    <div className="form-input-error text-danger text-end">
                      {errors.password[0]}
                    </div>
                  </Form.Group>
                </div>

                <div className="text-center">
                  <Button onClick={submit} variant="primary" className="btn-block">Submit &#8594;</Button>
                </div>
              </Form> 

              {
                serverError && <div className="login-form-error text-danger form-input-error text-center">{serverError}</div>
              }
            </div>           
                
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login