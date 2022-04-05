import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { Login, Main, Signup, Postwrite } from '../pages/index';
import { history } from '../redux/configureStore';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { apiKey } from './firebase';
import {actionCreators as userActions} from "../redux/modules/user";
import { Button } from '../elements';
import Search from './Search';
import Notification from '../components/Notification';


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
        <Notification/>
        <ConnectedRouter history={history}>
          <Header />
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={Postwrite}/>
          {/* <Route path="/search" exact component={Search}/> */}
          <Route path="/write/:id" exact component={Postwrite}/>
        </ConnectedRouter>
        <Button circle _onClick={() => {history.push('/write')}}>+</Button>
      </React.Fragment>
  );
}

export default App;
