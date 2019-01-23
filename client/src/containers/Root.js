import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import App from './App';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </Provider>
    )
  }
};
