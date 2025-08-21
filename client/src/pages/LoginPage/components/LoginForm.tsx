import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router";


interface LoginFormProps {
    email: string;
    password: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    validationErrors: { email?: string; password?: string[] } | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    isLoading,
    validationErrors
}) => {
    
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    let navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
      };

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked); 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    
    return (
        <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder='Email'
                    id="email"
                    value={email}
                    onChange={onEmailChange}
                    required
                    disabled={isLoading}
                />
                {validationErrors?.email && (
                    <p className="error-message">{validationErrors.email}</p>
                )}
            </div>
            <div className="form-group password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                    required
                    disabled={isLoading}
                />
                <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
                {validationErrors?.password && validationErrors.password.length > 0 && (
                    <ul className="error-list">
                        {validationErrors.password.map((msg, index) => (
                            <li key={index} className="error-message">{msg}</li>
                        ))}
                    </ul>
                )}
                </div>
            </div>

            <button type='submit' className='login-button' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign In'} 
            </button>

            <div className="options-group">
                <a href="/forgot-password">Forgot password?</a>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            sx={{ 
                                color: 'white',
                                '&.Mui-checked': {
                                    color: 'gold',
                                },
                            }}
                            color="primary"
                            disabled={isLoading}
                        />
                    }
                    label="Remember me"
                    disabled={isLoading} 
                />
            </div>
            <p className="signup-link">
            Not a member of ShowTime yet?
            <span
                onClick={handleRegisterClick}
                style={{ color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline', marginLeft: 10}}
            >
                Sign up now!
            </span>
            </p>
        </form>
    );
};

export default LoginForm;