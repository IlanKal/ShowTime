
import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

// We define the props the component will accept
interface GoogleLoginButtonProps {
    onGoogleSuccess: (response: CredentialResponse) => void;
}

// The component now accepts props
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onGoogleSuccess }) => {
    const onError = () => {
        // This function runs if the login process fails.
        console.log("Login Failed");
    };

    return <GoogleLogin onSuccess={onGoogleSuccess} onError={onError} locale="en" />;
};

export default GoogleLoginButton;