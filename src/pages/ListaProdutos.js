// src/pages/ListaProdutos.js
import React, { useEffect, useState } from 'react';
import productService from '../services/productService';

const ListaProdutos = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', price: '', userId: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsList = await productService.getProducts();
                setProducts(productsList);
            } catch (err) {
                setError('Erro ao carregar produtos');
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setEditFormData({
            name: product.name,
            price: product.price,
            userId: product.userId,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.updateProduct(editingProduct, editFormData);
            setEditingProduct(null);
            const updatedProducts = await productService.getProducts();
            setProducts(updatedProducts);
        } catch (error) {
            setError('Erro ao atualizar produto');
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Produtos</h2>
            {error && <p className="text-danger">{error}</p>}
            {products.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <ul className="list-group">
                    {products.map((product) => (
                        <li key={product.id} className="list-group-item">
                            <strong>Nome:</strong> {product.name} <br />
                            <strong>Preço:</strong> R$ {product.price.toFixed(2)} <br />
                            <strong>ID do Usuário:</strong> {product.userId}
                            <br />
                            <button
                                className="btn btn-primary btn-sm mt-2"
                                onClick={() => handleEditClick(product)}
                            >
                                Atualizar
                            </button>
                            {editingProduct === product.id && (
                                <form onSubmit={handleEditSubmit} className="mt-2">
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nome do produto"
                                            value={editFormData.name}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Preço"
                                            value={editFormData.price}
                                            onChange={handleEditChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success btn-sm">
                                        Salvar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm ml-2"
                                        onClick={() => setEditingProduct(null)}
                                    >
                                        Cancelar
                                    </button>
                                </form>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaProdutos;
