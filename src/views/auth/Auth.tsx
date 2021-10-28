import { FC } from "react";
import Login from "../../components/Login"

import postLogin from '../../services/login'

/* const loginRes = postLogin({
  action: "login",
  login: "test@mail.ru",
  password: "TestPassword123_"
}) */

const LoginPage:FC = () => {
  return (
    <Login />
  )
}

export default LoginPage