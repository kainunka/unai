import * as types from '../actions/actionTypes';
import initialState from '../initialState/initialState';

const FirebaseReducer = (state = initialState.fire, action) => {
    switch (action.type) {
        case types.PROFILE_USER:
            return {
                ...state,
                profileUser: action.profileUser
            }
    
        default:
            return state;
    }
}

export default FirebaseReducer;