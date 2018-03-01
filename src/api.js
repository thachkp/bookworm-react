import axios from "axios";

export default {
    user: {
        login: async (credentials) =>{
            try {
                const res = await axios.post('/api/auth', {credentials})
                return res.data.user;
            } catch (error) {
                throw error;
            }
        },
        signup: async (user) => {
            try {
                const res = await axios.post('/api/users', {user})
                return res.data.user;
            } catch (error) {
                throw error;
            }
        },
        confirm: async (token) => {
            try {
                const res = await axios.post('/api/auth/confirmation', {token})
                return res.data.user;
            } catch (error) {
                throw error;
            }
        }
    }
}
