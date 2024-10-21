// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import ListaUsuarios from './pages/ListaUsuarios';

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
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/usuarios" element={<ListaUsuarios />} />
                    <Route path="/" element={<Cadastro />} /> {/* Página inicial */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
