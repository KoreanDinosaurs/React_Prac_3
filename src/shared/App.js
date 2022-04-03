import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { Login, Main, Signup } from '../pages/index';
import { history } from '../redux/configureStore';
import Header from '../components/Header';

function App() {
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
