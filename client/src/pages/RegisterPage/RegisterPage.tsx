import React, { useState } from 'react';
import { User, Gender, MovieGenre } from '../../types/User';
import RegistrationForm from './components/RegistrationForm';
// import { registerUser } from '../../services/authService'; // A service function to be created
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { USER_GENDERS } from '../../utils/genders';
import './styles/RegisterPage.css';


const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        fullName: '',
        dateOfBirth: new Date(),
        gender: USER_GENDERS[3],
    });
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string[] } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const onDateOfBirthChange = (date: Date | null) => {
        setFormData(prev => ({
            ...prev,
            dateOfBirth: date || new Date()
        }));
    };

    const onGenderChange = (gender: Gender) => {
        setFormData(prev => ({
            ...prev,
            gender: gender
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setValidationErrors(null);

        // Here you would call your registration service with the formData
        try {
            // const response = await registerUser(formData);
            // console.log('Registration successful!', response);
            // After successful registration, you might redirect the user
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle and display validation errors from the server
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="register-page">
            <h1>Sign Up</h1>
            <p> Welcome to ShowTime - Let's create your account</p>
            <RegistrationForm
                formData={formData}
                onInputChange={handleInputChange}
                onDateOfBirthChange={onDateOfBirthChange}
                onGenderChange={onGenderChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                validationErrors={validationErrors}
            />

            <div className='or-divider'>
                <span>or</span>
            </div>
            <GoogleLoginButton onGoogleSuccess={(res: any) => console.log(res)} />
        </div>
    );
};

export default RegisterPage;