import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

function UsuarioLista() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await userService.getUsers();
                setUsers(usersList);
            } catch (err) {
                setError('Erro ao carregar usuários');
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Lista de Usuários</h2>
            {error && <p className="text-danger">{error}</p>}
            {users.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                <ul className="list-group">
                    {users.map(user => (
                        <li key={user.id} className="list-group-item">
                            <strong>Nome:</strong> {user.nome} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>CPF:</strong> {user.cpf}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UsuarioLista;
