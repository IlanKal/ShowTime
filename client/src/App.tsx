import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TitlePage from './pages/TitlePage/TitlePage';

// This component will have the header and main content
const PageWithHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="main-content">
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* The login page without the header */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* All other pages with the header */}
          <Route path="/" element={<PageWithHeader><HomePage /></PageWithHeader>} />
          <Route path="/title/:mediaType/:id" element={<PageWithHeader> <TitlePage /> </PageWithHeader>} />
          
        </Routes>
        {/*
          הפוטר חייב להיות בתוך ה-BrowserRouter כדי שרכיבי הניווט יפעלו.
          הוא נמצא מחוץ לרכיב Routes מכיוון שהוא מוצג בכל העמודים.
        */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
