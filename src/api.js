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
        }
    }
}
