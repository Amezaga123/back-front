import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';

function AtualizarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ nome: '', email: '', cpf: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userService.getUserById(id);
                setUser(userData);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                setError('Erro ao buscar usuário');
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(id, user);
            alert('Usuário atualizado com sucesso!');
            navigate('/usuarios');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            setError('Erro ao atualizar usuário. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Atualizar Usuário</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-light p-4 border rounded">
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={user.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        value={user.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Atualizar</button>
            </form>
        </div>
    );
}

export default AtualizarUsuario;
