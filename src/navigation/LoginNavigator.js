import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import apiFirebase from '../api/Firebase';
import firebase from 'firebase';
import { FBLoginManager } from 'react-native-facebook-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../redux/actions/NavActions';

class LoginNavigator extends Component {
 constructor() {
     super();
     console.ignoredYellowBox = [
         'Setting a timer'
     ];
 }    

 facebookLogin = () => {
    const { checkLogin, messageLogin } = this.props.actions;
    const { getLocationLat, getLocationLong } = this.props;

    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
        if (!error) {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.credentials.token);

            messageLogin('Login Success Please Wait...');

            firebase.auth().signInWithCredential(credential).then((res) => {
                console.log(JSON.stringify(res));
                AsyncStorage.setItem('uid', res.uid);
                res.providerData.map((data) => {  
                    var postData = {
                        facebookID: data.uid,
                        name: data.displayName,
                        email: data.email,
                        location: {
                            latitude: getLocationLat,
                            longitude: getLocationLong
                        }
                    } 
                    var updates = {};
                    updates[`/users/${res.uid}/profile`] = postData;
                    firebase.database().ref().update(updates).then((success) => {
                        checkLogin(true);
                    }).catch((error) => {
                        console.log(error);
                    });
                });
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log("Error: ", error);
        }
    });
  }

  render() {
    const { messageLogin, getLocationLat, getLocationLong } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={ this.facebookLogin }>
            <Text>
                { messageLogin }
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

LoginNavigator.propTypes = {
    actions: PropTypes.object.isRequired
};

mapStatetoProps = (state, ownProps) => {
    const { messageLogin, getLocationLat, getLocationLong } = state.nav;
    return {
        messageLogin,
        getLocationLat,
        getLocationLong
    }
} 
mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(NavActions, dispatch)
	};
}

export default connect(mapStatetoProps, mapDispatchToProps)(LoginNavigator);