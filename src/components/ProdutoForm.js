import React, { useState } from 'react';
import productService from '../services/productService';

function ProdutoForm() {
    const [product, setProduct] = useState({ name: '', price: '', userId: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.register(product);
            alert('Produto cadastrado com sucesso!');
            setProduct({ name: '', price: '', userId: '' });
        } catch (err) {
            setError('Erro ao cadastrar produto. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Preço:</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </div>
            <div>
                <label>ID do Usuário:</label>
                <input type="text" name="userId" value={product.userId} onChange={handleChange} required />
            </div>
            <button type="submit">Cadastrar Produto</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default ProdutoForm;
