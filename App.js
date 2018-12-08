
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Router from './Router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers';
// debug with localhost:8081/debugger-ui
export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {},  applyMiddleware(thunk))}>
        <View style={{ flex: 1 }}>
          <Router/>
        </View>
      </Provider>
    );
  }
}


