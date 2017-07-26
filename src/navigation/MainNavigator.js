import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MapScreen from '../screens/MapScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../redux/actions/NavActions';

class MainNavigator extends Component {
  logout = () => {
    AsyncStorage.removeItem('uid').then(() => {
        this.props.actions.checkLogin(false);
        this.props.actions.messageLogin('Login With Facebook');
    });
  }

  render() {
    //alert(JSON.stringify(this.props.profileUser));
    return (
      <ScrollableTabView>
        <MapScreen tabLabel="Logout Facebook" logout={ this.logout } 
        profile={ ( <Text>test</Text> ) } />
        <FeedScreen tabLabel="FeedScreen" />
        <ProfileScreen tabLabel="ProfileScreen" />
      </ScrollableTabView>
    );
  }
}

mapStatetoProps = (state, ownProps) => {
    return {
        checkLogin: state.nav.checkLogin,
    }
} 
mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(NavActions, dispatch),
	};
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainNavigator);