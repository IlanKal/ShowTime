import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import './Header.css';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('John Doe')

    const navigate = useNavigate();

    const handleSignIn = () => {
        setIsLoggedIn(true);
        navigate("/login");
    }

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value as string);
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
                        <li><a href="/movies">Movies</a></li>
                        <li><a href="/tv-shows">TV Shows</a></li>
                        <li><a href="/watchlist">Watchlist</a></li>
                        <li><a href="/suggestion">Suggestion</a></li>
                    </ul>
                </nav>

                <div className="header-right">
                    <div className="search-bar">
                        <FormControl
                            sx={{
                                border: 'none',
                                flexShrink: 0,
                            }}
                        >
                            <Select
                                value={selectedCategory}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select search category' }}
                                sx={{
                                    '.MuiSelect-select': {
                                        padding: '4px 8px',
                                        backgroundColor: 'transparent',
                                        color: 'var(--text-color-light)',
                                        borderRight: '1px solid var(--secondary-color)',
                                    },
                                    '&:before, &:after': {
                                        borderBottom: 'none !important',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'var(--text-color-light)',
                                    },
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused:before, &.Mui-focused:after': {
                                        borderBottom: 'none !important',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'transparent !important',
                                    }
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: 'var(--background-dark)',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
                                        },
                                    },
                                }}
                            >
                                <MenuItem 
                                    value="All"
                                    sx={{
                                        color: 'var(--text-color-light)',
                                        backgroundColor: 'var(--background-dark)',
                                        '&:hover': {
                                            backgroundColor: 'var(--secondary-color)',
                                            color: 'var(--primary-color)',
                                        },
                                        '&.Mui-selected': {
                                            color: 'var(--primary-color)',
                                            backgroundColor: 'var(--background-dark)',
                                            '&:hover': {
                                                backgroundColor: 'var(--secondary-color)',
                                                color: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                >
                                    All
                                </MenuItem>
                                <MenuItem 
                                    value="Movies"
                                    sx={{
                                        color: 'var(--text-color-light)',
                                        backgroundColor: 'var(--background-dark)',
                                        '&:hover': {
                                            backgroundColor: 'var(--secondary-color)',
                                            color: 'var(--primary-color)',
                                        },
                                        '&.Mui-selected': {
                                            color: 'var(--primary-color)',
                                            backgroundColor: 'var(--background-dark)',
                                            '&:hover': {
                                                backgroundColor: 'var(--secondary-color)',
                                                color: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                >
                                    Movies
                                </MenuItem>
                                <MenuItem 
                                    value="TV Shows"
                                    sx={{
                                        color: 'var(--text-color-light)',
                                        backgroundColor: 'var(--background-dark)',
                                        '&:hover': {
                                            backgroundColor: 'var(--secondary-color)',
                                            color: 'var(--primary-color)',
                                        },
                                        '&.Mui-selected': {
                                            color: 'var(--primary-color)',
                                            backgroundColor: 'var(--background-dark)',
                                            '&:hover': {
                                                backgroundColor: 'var(--secondary-color)',
                                                color: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                >
                                    TV Shows
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <input
                            type="text"
                            placeholder="Search here"
                            style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: 'inherit',
                                outline: 'none',
                                padding: '4px 8px',
                                flexGrow: 1,
                                height: '100%',
                            }}
                        />

                        <i className="search-icon">
                            <SearchIcon />
                        </i>
                    </div>
                    {isLoggedIn ? 
                    (<span className="user-name">Hello, {userName}</span>) 
                    :
                    (<button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>)
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;