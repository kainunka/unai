import * as types from '../actions/actionTypes';
import initialState from '../initialState/initialState';

const NavReducer = (state = initialState.nav, action) => {
    switch (action.type) {
        case types.CHECK_LOGIN:
            return {
                ...state,
                checkLogin: action.checkLogin
            }
        case types.MESSAGE_LOGIN:
            return {
                ...state,
                messageLogin: action.messageLogin
            }
        case types.GET_LOCATION_LAT:
            return {
                ...state,
                getLocationLat: action.getLocationLat
            }
        case types.GET_LOCATION_LONG:
            return {
                ...state,
                getLocationLong: action.getLocationLong
            }

        default:
            return state;
    }
}

export default NavReducer;