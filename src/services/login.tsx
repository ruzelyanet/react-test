import http from "./http";

interface ILogin {
  action: string;
  login: string;
  password: string;
}

async function postLogin(params: ILogin) {
  const {data} = await http.post("/", params)
  return data
};

export default postLogin;