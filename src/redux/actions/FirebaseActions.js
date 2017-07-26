import * as types from './actionTypes';

export const profileUserSuccess = (data) => {
    return {
        type: types.PROFILE_USER,
        profileUser: data
    }
}

export const profileUser = (data) => {
    return (dispatch) => {
        return dispatch(profileUserSuccess(data));
    }
}