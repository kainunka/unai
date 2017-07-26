import React, { Component, PropTypes } from 'react';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NavActions from '../redux/actions/NavActions';
import MainNavigator from './MainNavigator';
import LoginNavigator from './LoginNavigator';
import BackgroundGeolocation from "react-native-background-geolocation";

class SplashScreenNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }   
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    componentWillMount() {
        const { getLocationLat, getLocationLong } = this.props.actions;

        this.checkUid();
        // 1.  Wire up event-listeners

        // This handler fires whenever bgGeo receives a location update.
        BackgroundGeolocation.on('location', function(location, taskId) {
        var coords    = location.coords,
            timestamp   = location.timestamp
            latitude    = coords.latitude,
            longitude   = coords.longitude,
            speed       = coords.speed;

            getLocationLat(latitude)
            getLocationLong(longitude)
            BackgroundGeolocation.finish(taskId);
        }, function(errorCode) {
        console.warn("- Location error: ", errorCode);
        });

        // This handler fires whenever bgGeo receives an error
        BackgroundGeolocation.on('error', this.onError);

        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        BackgroundGeolocation.on('motionchange', this.onMotionChange);

        // This event fires when a chnage in motion activity is detected
        BackgroundGeolocation.on('activitychange', this.onActivityChange);

        // This event fires when the user toggles location-services
        BackgroundGeolocation.on('providerchange', this.onProviderChange);

        // 2.  #configure the plugin (just once for life-time of app)
        BackgroundGeolocation.configure({
        // Geolocation Config
        desiredAccuracy: 0,
        stationaryRadius: 25,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 1,
        // Application config
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
        // HTTP / SQLite config
        url: 'http://yourserver.com/locations',
        batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
        headers: {              // <-- Optional HTTP headers
            "X-FOO": "bar"
        },
        params: {               // <-- Optional HTTP params
            "auth_token": "maybe_your_server_authenticates_via_token_YES?"
        }
        }, function(state) {
        console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

        console.log('testttttt'+JSON.stringify(state));

        if (!state.enabled) {
            BackgroundGeolocation.start(function() {
            console.log("- Start success");
            });
        }
        });
    }

    // You must remove listeners when your component unmounts
    componentWillUnmount() {
        // Remove BackgroundGeolocation listeners
        BackgroundGeolocation.un('location', this.onLocation);
        BackgroundGeolocation.un('error', this.onError);
        BackgroundGeolocation.un('motionchange', this.onMotionChange);
        BackgroundGeolocation.un('activitychange', this.onActivityChange);
        BackgroundGeolocation.un('providerchange', this.onProviderChange);
    }
    onLocation(location) {
        console.log('- [js]location: '+ JSON.stringify(location));
    }
    onError(error) {
        var type = error.type;
        var code = error.code;
        alert(type + " Error: " + code);
    }
    onActivityChange(activityName) {
        console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
    }
    onProviderChange(provider) {
        console.log('- Location provider changed: ', provider.enabled);    
    }
    onMotionChange(location) {
        console.log('- [js]motionchanged: ', JSON.stringify(location));
    }


    async checkUid() {
        try {
            const value = await AsyncStorage.getItem('uid');
            if (value !== null){
                this.props.actions.checkLogin(true);
            } else {      
                this.props.actions.checkLogin(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { isLoading } = this.state;
        const { checkLogin } = this.props;
        return (
             isLoading ? <View style={styles.progressBar}><ProgressBar /></View> : 
             checkLogin ? <MainNavigator /> : <LoginNavigator />
        )
    }
}

const styles = StyleSheet.create({
    progressBar: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

SplashScreenNavigator.propTypes = {
    actions: PropTypes.object.isRequired,
	checkLogin: PropTypes.bool
};

mapStatetoProps = (state, ownProps) => {
    return {
        checkLogin: state.nav.checkLogin,
        messageLogin: state.nav.messageLogin
    }
} 
mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(NavActions, dispatch),
	};
}

export default connect(mapStatetoProps, mapDispatchToProps)(SplashScreenNavigator);