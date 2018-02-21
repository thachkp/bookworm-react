import api from "../api";
import { userloggedIn } from "./auth";


export const signup = (data) => async (dispatch) => {
    try {
        const user = await api.user.signup(data); 
        localStorage.bookwormJWT = user.token;
        return dispatch(userloggedIn(user));
    } catch (error) {
        throw error
    }
}
