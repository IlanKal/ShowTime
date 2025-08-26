import React, { useState } from 'react';
import './styles/LoginPage.css';
import { useAuth } from "../../context/AuthContext";
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

  const { loginWithPassword, loginWithGoogle } = useAuth();

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError("Missing Google token");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle(credentialResponse.credential);
    } catch (err: any) {
      console.log('Google login failed: ', err);
      setError(err.message || 'An unexpected error occurred during Google login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
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
      await loginWithPassword({ email, password });
    } catch (err: any) {
      console.log('Login failed: ', err);
      setValidationErrors({ password: [err.message || 'An unexpected error occurred.'] });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
  );
};

export default LoginPage;
