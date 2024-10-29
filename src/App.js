// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import ListaUsuarios from './pages/ListaUsuarios';
import CadastroProduto from './pages/CadastroProduto'; // Importando o novo componente
import ListaProdutos from './pages/ListaProdutos'; // Importando o novo componente
import AtualizarUsuario from './components/AtualizarUsuario';
import UserUpdate from './pages/UserUpdate';


const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">APICadastro App</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cadastro">Cadastro</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/usuarios">Lista de Usuários</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cadastro-produto">Cadastrar Produto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/produtos">Lista de Produtos</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/update-user/:userId" element={<UserUpdate />} />
                    <Route path="/atualizar-usuario/:id" element={<AtualizarUsuario />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/usuarios" element={<ListaUsuarios />} />
                    <Route path="/cadastro-produto" element={<CadastroProduto />} /> {/* Nova rota */}
                    <Route path="/produtos" element={<ListaProdutos />} /> {/* Nova rota */}
                    <Route path="/" element={<Cadastro />} /> {/* Página inicial */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
