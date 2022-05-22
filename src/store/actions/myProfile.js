import { AUTH, UPDATE } from "../constans/actionTypes"


export const signin = (data) => {
    return {
        type: AUTH,
        data
    };
};

export const signup = (data) => {
    return {
        type: AUTH,
        data
    };
};

export const updateUser = (data) => {
    return {
        type: UPDATE,
        data
    };
}