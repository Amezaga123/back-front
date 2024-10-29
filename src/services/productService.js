// src/services/productService.js
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/products';

const productService = {
    register: async (product) => {
        try {
            await axios.post(`${apiUrl}/register`, product);
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            throw error;
        }
    },
    getProducts: async () => {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            throw error;
        }
    },
// Adicione isso ao seu productService.js
    updateProduct: async (id, updatedProduct) => {
    try {
        await axios.put(`${apiUrl}/update/${id}`, updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
},

};

export default productService;