// components/ProdutoLista.js
import React, { useEffect, useState } from 'react';
import productService from '../services/productService';

function ProdutoLista() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div className="container mt-5">
            <h2>Lista de Produtos</h2>
            {error && <p className="text-danger">{error}</p>}
            {products.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <ul className="list-group">
                    {products.map(product => (
                        <li key={product.id} className="list-group-item">
                            <strong>Nome:</strong> {product.name} <br />
                            <strong>Preço:</strong> R$ {product.price.toFixed(2)} <br />
                            <strong>ID do Usuário:</strong> {product.userId}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProdutoLista;
