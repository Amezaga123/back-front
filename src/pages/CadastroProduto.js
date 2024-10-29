// src/pages/CadastroProduto.js
import React, { useState } from 'react';
import productService from '../services/productService';

const CadastroProduto = () => {
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
        <div className="container mt-5">
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 border rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome do Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Nome"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Preço</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Preço"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">ID do Usuário</label>
                    <input
                        type="number"
                        className="form-control"
                        id="userId"
                        name="userId"
                        placeholder="ID do Usuário"
                        value={product.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default CadastroProduto;
