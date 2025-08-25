// App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TitlePage from './pages/TitlePage/TitlePage';
import TitlesListingPage from './pages/TitlesListingPage/TitlesListingPage';

const PageWithHeader = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <div className="main-content">{children}</div>
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ללא Header */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* עם Header */}
          <Route path="/" element={<PageWithHeader><HomePage /></PageWithHeader>} />
          <Route
            path="/movies"
            element={
              <PageWithHeader>
                <TitlesListingPage mediaType="movie" />
              </PageWithHeader>
            }
          />
          <Route
            path="/tv-shows"
            element={
              <PageWithHeader>
                <TitlesListingPage mediaType="tv" />
              </PageWithHeader>
            }
          />

          <Route
            path="/title/:mediaType/:id"
            element={<PageWithHeader><TitlePage /></PageWithHeader>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
