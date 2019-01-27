import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import logo from './logo.svg';
import './App.css';
import AppContainer from './Screens/AppContainer';
import client from './Apolloclient';
import LoginProvider from './routes/LoginContext';

import LoginView from './Screens/Login';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LoginProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={LoginView} />
              <Route path="/" component={AppContainer} />
            </Switch>
          </BrowserRouter>
        </LoginProvider>
      </ApolloProvider>
    );
  }
}

export default App;
