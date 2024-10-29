import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/userService';

function UserUpdate() {
    const { userId } = useParams();
    const [user, setUser] = useState({ nome: '', email: '', cpf: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await userService.getUserById(userId);
                setUser(fetchedUser);
            } catch (err) {
                setError('Erro ao carregar os dados do usuário.');
                console.error(err);
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(userId, user);
            setSuccess('Usuário atualizado com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar o usuário.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Atualizar Usuário</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" className="form-control" name="nome" value={user.nome} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>CPF:</label>
                    <input type="text" className="form-control" name="cpf" value={user.cpf} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default UserUpdate;
