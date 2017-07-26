import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
         { this.props.profile } 
        <TouchableOpacity onPress={this.props.logout}>
          <Text>
              { this.props.tabLabel }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

mapStatetoProps = (state, ownProps) => {
    return {
        checkLogin: state.nav.checkLogin,
        profileUser: state.nav.profileUser
    }
} 

export default MapScreen;