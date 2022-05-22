import * as Actions from '../constans/actionTypes';

const myAuthreducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case Actions.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}))
            return{ ...state, authData: action?.data };
        case Actions.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case Actions.UPDATE:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}))
            return{ ...state, authData: action?.data };
        default: 
        return state;
    }
}

export default myAuthreducer;