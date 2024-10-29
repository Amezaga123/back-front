import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

function UsuarioLista() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editData, setEditData] = useState({ nome: '', email: '', cpf: '' });
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

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setEditData({ nome: user.nome, email: user.email, cpf: user.cpf });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateSubmit = async (userId) => {
        try {
            await userService.updateUser(userId, editData);
            setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, ...editData } : user)));
            setEditingUserId(null);
        } catch (err) {
            setError('Erro ao atualizar usuário');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Usuários</h2>
            {error && <p className="text-danger">{error}</p>}
            {users.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                <ul className="list-group">
                    {users.map((user) => (
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {editingUserId === user.id ? (
                                <div className="w-100">
                                    <input
                                        type="text"
                                        name="nome"
                                        value={editData.nome}
                                        onChange={handleInputChange}
                                        placeholder="Nome"
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="cpf"
                                        value={editData.cpf}
                                        onChange={handleInputChange}
                                        placeholder="CPF"
                                        className="form-control mb-2"
                                    />
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleUpdateSubmit(user.id)}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className="btn btn-secondary ms-2"
                                        onClick={() => setEditingUserId(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <strong>Nome:</strong> {user.nome} <br />
                                        <strong>Email:</strong> {user.email} <br />
                                        <strong>CPF:</strong> {user.cpf}
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Atualizar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UsuarioLista;
