import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../types";
import api from "../api";


export const userloggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = (credentials) => async (dispatch) => {
    try {
        const user = await api.user.login(credentials); 
        localStorage.bookwormJWT = user.token;
        return dispatch(userloggedIn(user));
    } catch (error) {
        throw error
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('bookwormJWT');
    dispatch(userLoggedOut());

}
