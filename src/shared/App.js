import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { Login, Main, Signup, Postwrite, PostDetail } from '../pages/index';
import { Header, Notification } from '../components';
import { history } from '../redux/configureStore';

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
        <Notification/>
        <ConnectedRouter history={history}>
          <Header />
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={Postwrite}/>
          <Route path="/write/:id" exact component={Postwrite}/>
          <Route path="/post/:id" exact component={PostDetail}/>
        
        </ConnectedRouter>
        {/* <Button circle _onClick={() => {history.push('/write')}}>+</Button> */}
      </React.Fragment>
  );
}

export default App;
