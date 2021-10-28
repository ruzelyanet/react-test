import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/App.scss';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import AuthPage from './views/auth/Auth'
import Dashboard from './views/dash/Index'
import {Container} from 'react-bootstrap'
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

import { GuardProvider, GuardedRoute } from 'react-router-guards';

import authMiddleware from './utils/authMiddleWare'

const requireLogin = (to:any, from:any, next:any) => {
  if (to.meta.auth) {
    if (authMiddleware()) {
      next();
    }
    next.redirect('/login');
  } else {
    if(to.location.pathname === "/login" && authMiddleware()) {      
      next.redirect('/home');
    }
   
    next();
  }
};

const store = setupStore()

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>                     
        <GuardProvider guards={[requireLogin]}>
          <div className="App">
            <Container>
              <Switch>                
                
                <GuardedRoute path='/login' exact component={AuthPage} />
                <GuardedRoute path='/' exact component={Dashboard} meta={{ auth: true }} />
                <GuardedRoute path='/home' exact component={Dashboard} meta={{ auth: true }} />
              </Switch>
            </Container>
          </div>
        </GuardProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
