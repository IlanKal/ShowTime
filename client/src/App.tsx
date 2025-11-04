import React from 'react';
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TitlePage from './pages/TitlePage/TitlePage';
import TitlesListingPage from './pages/TitlesListingPage/TitlesListingPage';
import RequireAuth from './context/RequireAuth';
import { listTitles, mediaLabels } from "./services/titles";
import { listWatchlist } from "./services/watchlist";

const LayoutWithHeader: React.FC = () => (
  <>
    <Header />
    <div className="main-content">
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <div className="App">
      <Routes>
        {/* shared components*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* דפים עם Header (Layout) */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={
              <TitlesListingPage
                title={mediaLabels.movie}
                fetcher={({ signal }) => listTitles("movie")}
                emptyMessage="No movies found."
              />
            }
          />
          <Route
            path="/tv-shows"
            element={
              <TitlesListingPage
                title={mediaLabels.movie}
                fetcher={({ signal }) => listTitles("tv")}
                emptyMessage="No tv shows found."
              />
            }
          />
          <Route element={<RequireAuth />}>
          <Route
            path="/watchlist"
            element={
              <TitlesListingPage
                title="My Watchlist"
                fetcher={({ signal }) => listWatchlist(signal)}
                emptyMessage="No watchlist found."
              />
            }
          />
          <Route path="/title/:mediaType/:id" element={<TitlePage />} />
          <Route
            path="/suggestion"
            element={
              <TitlesListingPage
                title="For you"
                fetcher={({ signal, genres }) => listTitles("tv", signal)}
                emptyMessage="No suggestions found."
                showGenrePicker={true}
              />
            }
          />
          </Route>
        </Route>
      </Routes>

      {/* Footer לכל הדפים; אם תרצה שיופיע רק עם Header — העבר אותו ל-LayoutWithHeader */}
      <Footer />
    </div>
  );
}

export default App;