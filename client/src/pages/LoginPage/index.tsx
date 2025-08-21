// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import './styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../services/authService';
import LoginForm from "./components/LoginForm";
import { validateLoginForm } from '../../utils/validation';
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { CredentialResponse } from '@react-oauth/google';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string[] } | null>(null);
    const navigate = useNavigate();

    // A new function to handle the successful Google login response
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Call a new service function to send the token to your backend
            // const response = await loginWithGoogle(credentialResponse.credential);
            // console.log('Google login successful!', response);
            // navigate("/");
            
            // For now, let's just log the token
            console.log('Google login token:', credentialResponse.credential);

        } catch (error: any) {
            console.log('Google login failed: ', error);
            setError(error.message || 'An unexpected error occurred during Google login.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        // Your existing email/password login logic
        e.preventDefault();

        const validation = validateLoginForm(email, password);
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            return;
        }

        setValidationErrors(null);
        setIsLoading(true);
        setError(null);

        try {
            const response = await loginUser(email, password);
            console.log('Login successful!', response);
            // TODO: make after backend is done
            // save data in local storage
            navigate("/");

        } catch (error: any) {
            console.log('Login failed: ', error);
            setValidationErrors({ password: [error.message || 'An unexpected error occurred.'] });
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='login-page'>
            <h1 className='login-title'>Sign In</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <LoginForm
                email={email}
                password={password}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={handleLogin}
                isLoading={isLoading}
                validationErrors={validationErrors}
            />

            <div className="or-divider">
                <span>or</span>
            </div>
            
            <GoogleLoginButton onGoogleSuccess={handleGoogleLoginSuccess} />
        </div>
    )
}

export default LoginPage;