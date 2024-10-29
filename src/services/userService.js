import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/users';

const userService = {
    register: async (user) => {
        try {
            await axios.post(`${apiUrl}/register`, user);
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    },
    getUsers: async () => {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            throw error;
        }
    },
    updateUser: async (id, user) => {
        try {
            await axios.put(`${apiUrl}/${id}`, user);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    },
    
};

export default userService;
