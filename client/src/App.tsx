import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
