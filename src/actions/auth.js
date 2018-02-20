import {USER_LOGGED_IN} from "../types";
import api from "../api";


export const userloggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
});

export const login = (credentials) => async (dispatch) => {
    try {
        const user = await api.user.login(credentials); 
        return dispatch(userloggedIn(user));
    } catch (error) {
        throw error
    }
    
}


