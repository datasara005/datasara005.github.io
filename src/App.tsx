import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/Cart';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <div>
            <Link className="navbar-brand" to="/">
              Product App
            </Link>
            <Link className="nav-link" to="/add-product">Add Products</Link>
            <Link className="nav-link" to="/cart">Cart</Link>
          </div>
          <motion.button
            className="btn btn-secondary"
            onClick={toggleDarkMode}
            initial={{ scale: 1 }} 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            transition={{ duration: 0.2 }} 
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>

        
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductList />
                </motion.div>
              }
            />
            <Route
              path="/add-product"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AddProduct />
                </motion.div>
              }
            />
            <Route
              path="/cart"
              element={<motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Cart />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
