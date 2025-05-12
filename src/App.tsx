import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <nav className="navbar">
                <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/analytics">Analytics</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </Router>
    );
};

export default App;
