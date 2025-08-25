import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { suggestTitles, type CategoryFilter, type Suggestion } from "../../services/search";
import SuggestionList from "./SuggestionList";
import "./Header.css";

const Header: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName] = useState("John Doe");

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  const handleSignIn = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const next = event.target.value as CategoryFilter;
    setSelectedCategory(next);
    // רענון רשימת ההצעות לפי קטגוריה חדשה
    if (searchText.trim()) {
      // טריגר ל-effect
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  };

  const doSearch = (q?: string) => {
    const query = (q ?? searchText).trim();
    const params = new URLSearchParams({ query, category: selectedCategory });
    navigate(`/search?${params.toString()}`);
    setOpen(false);
  };

  // Debounce אוטוקומפליט
  useEffect(() => {
    const q = searchText.trim();
    if (!q) {
      setSuggestions([]);
      setLoading(false);
      setOpen(false);
      return;
    }

    setLoading(true);
    setOpen(true);
    const t = setTimeout(async () => {
      try {
        const res = await suggestTitles({ query: q, category: selectedCategory }, 8);
        setSuggestions(res);
      } catch (e) {
        // אין טיפול שגיאות מיוחד לאוטוקומפליט בשלב זה
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [searchText, selectedCategory]);

  // סגירה בלחיצה מחוץ לאזור החיפוש
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const onSelectSuggestion = (s: Suggestion) => {
    navigate(`/title/${s.mediaType}/${s.id}`);
    setOpen(false);
    setSearchText("");
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doSearch();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
        </div>

        <nav className="header-nav">
          <ul>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tv-shows">TV Shows</Link></li>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li><Link to="/suggestion">Suggestion</Link></li>
          </ul>
        </nav>

        <div className="header-right">
          <div className="search-bar" ref={searchWrapRef}>
            <FormControl sx={{ border: "none", flexShrink: 0 }}>
              <Select
                value={selectedCategory}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Select search category" }}
                sx={{
                  ".MuiSelect-select": {
                    padding: "4px 8px",
                    backgroundColor: "transparent",
                    color: "var(--text-color-light)",
                    borderRight: "1px solid var(--secondary-color)",
                  },
                  "&:before, &:after": { borderBottom: "none !important" },
                  ".MuiSvgIcon-root": { color: "var(--text-color-light)" },
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&.Mui-focused:before, &.Mui-focused:after": { borderBottom: "none !important" },
                  "&.Mui-focused": { backgroundColor: "transparent !important" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--background-dark)",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                    },
                  },
                }}
              >
                <MenuItem value="All" sx={{ color: "var(--text-color-light)", backgroundColor: "var(--background-dark)", "&:hover": { backgroundColor: "var(--secondary-color)", color: "var(--primary-color)" }, "&.Mui-selected": { color: "var(--primary-color)", backgroundColor: "var(--background-dark)", "&:hover": { backgroundColor: "var(--secondary-color)", color: "var(--primary-color)" } } }}>All</MenuItem>
                <MenuItem value="Movies" sx={{ color: "var(--text-color-light)", backgroundColor: "var(--background-dark)", "&:hover": { backgroundColor: "var(--secondary-color)", color: "var(--primary-color)" }, "&.Mui-selected": { color: "var(--primary-color)", backgroundColor: "var(--background-dark)", "&:hover": { backgroundColor: "var(--secondary-color)", color: "var(--primary-color)" } } }}>Movies</MenuItem>
                <MenuItem value="TV Shows" sx={{ color: "var(--text-color-light)", backgroundColor: "var(--background-dark)", "&:hover": { backgroundColor: "var(--secondary-color)", color: "var(--primary-color)" }, "&.Mui-selected": { color: "var(--primary-color)", backgroundColor: "var(--background-dark)", "&:hover": { backgroundColor: "var(--secondary-color)", color: "var(--primary-color)" } } }}>TV Shows</MenuItem>
              </Select>
            </FormControl>

            <input
              type="text"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => { if (searchText.trim()) setOpen(true); }}
              aria-autocomplete="list"
              aria-expanded={open}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "inherit",
                outline: "none",
                padding: "4px 8px",
                flexGrow: 1,
                height: "100%",
              }}
            />

            <i className="search-icon" onClick={() => searchText.trim() && doSearch()}>
              <SearchIcon />
            </i>

            {open && (
              <SuggestionList
                query={searchText}
                suggestions={suggestions}
                loading={loading}
                onSelect={onSelectSuggestion}
                className="suggestion-dropdown"
              />
            )}
          </div>

          {isLoggedIn ? (
            <span className="user-name">Hello, {userName}</span>
          ) : (
            <button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
