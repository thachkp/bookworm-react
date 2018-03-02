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

export const confirm = (token) => (dispatch) => api.user.confirm(token)
.then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userloggedIn(user));
})

export const resetPasswordRequest = ({ email }) => () =>
    api.user.resetPasswordRequest(email);

export const validateToken = (token) => () =>
    api.user.validateToken(token);
