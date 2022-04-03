import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { Login, Main, Signup } from '../pages/index';
import { history } from '../redux/configureStore';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { apiKey } from './firebase';
import {actionCreators as userActions} from "../redux/modules/user";

function App() {

  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  
  React.useEffect(() => {
    
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }

  }, []);

  return (
      <React.Fragment>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </ConnectedRouter>
      </React.Fragment>
  );
}

export default App;
