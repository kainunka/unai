import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import LoginNavigator from './src/navigation/LoginNavigator';
import SplashScreenNavigator from './src/navigation/SplashScreenNavigator';
import store from './src/redux/ConfigureStore';
import { Provider } from 'react-redux';

export default class utnai extends Component {
  render() {
    return (
      <Provider store={ store }>
        <SplashScreenNavigator />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('utnai', () => utnai);
