import React, { useState } from 'react';
import userService from '../services/userService';

function UsuarioForm() {
    const [user, setUser] = useState({ nome: '', email: '', cpf: '', senha: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.register(user);
            alert('Usuário registrado com sucesso!');
            setUser({ nome: '', email: '', cpf: '', senha: '' });
        } catch (err) {
            setError('Erro ao registrar usuário. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 border rounded">
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
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
                        placeholder="Email"
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
                        placeholder="CPF"
                        value={user.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        value={user.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default UsuarioForm;
