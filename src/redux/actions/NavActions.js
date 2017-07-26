import * as types from './actionTypes';

export const checkLoginSuccess = (boolean) => {
    return {
        type: types.CHECK_LOGIN,
        checkLogin: boolean
    }
}

export const checkLogin = (boolean) => {
    return (dispatch) => {
        return dispatch(checkLoginSuccess(boolean));
    }
}

export const messageLoginSuccess = (text) => {
    return {
        type: types.MESSAGE_LOGIN,
        messageLogin: text
    }
}

export const messageLogin = (text) => {
    return (dispatch) => {
        return dispatch(messageLoginSuccess(text));
    }
}

export const getLocationLatSuccess = (location) => {
    return {
        type: types.GET_LOCATION_LAT,
        getLocationLat: location
    }
}

export const getLocationLat = (location) => {
    return (dispatch) => {
        return dispatch(getLocationLatSuccess(location));
    }
}

export const getLocationLongSuccess = (location) => {
    return {
        type: types.GET_LOCATION_LONG,
        getLocationLong: location
    }
}

export const getLocationLong = (location) => {
    return (dispatch) => {
        return dispatch(getLocationLongSuccess(location));
    }
}

export const facebookLoginSuccess = () => {
    return {
        type: types.FACEBOOK_LOGIN,
    }
}