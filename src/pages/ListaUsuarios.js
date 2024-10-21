// src/components/UsuarioLista.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuarioLista = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users'); // Ajuste a URL conforme necessário
                setUsuarios(response.data);
            } catch (error) {
                setError('Erro ao carregar usuários');
                console.error(error);
            }
        };

        fetchUsuarios();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            {usuarios.length === 0 ? (
                <div className="alert alert-warning">Nenhum usuário encontrado.</div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.cpf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UsuarioLista;
