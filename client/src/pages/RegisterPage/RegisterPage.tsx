import React, { useState } from 'react';
import { RegisterPayload } from '../../types/User';
import RegistrationForm from './components/RegistrationForm';
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { USER_GENDERS } from '../../utils/genders';
import './styles/RegisterPage.css';
import { useAuth } from "../../context/AuthContext";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',   // נשמור כ-ISO string
    gender: USER_GENDERS[0], // ברירת מחדל: "Male"
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string[] } | null>(null);

  const { register, loginWithGoogle } = useAuth();

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
      dateOfBirth: date ? date.toISOString().split('T')[0] : '' // YYYY-MM-DD
    }));
  };

  const onGenderChange = (gender: typeof USER_GENDERS[number]) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationErrors(null);

    try {
      await register(formData); // קריאה ל-AuthContext.register
      // הניווט נעשה בתוך AuthContext.finishLogin
    } catch (err: any) {
      console.error('Registration failed:', err);
      setValidationErrors({ email: err.message || "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h1>Sign Up</h1>
      <p>Welcome to ShowTime - Let's create your account</p>

      <RegistrationForm
        formData={formData}
        onInputChange={handleInputChange}
        onDateOfBirthChange={onDateOfBirthChange}
        onGenderChange={onGenderChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        validationErrors={validationErrors}
      />

      <div className="or-divider">
        <span>or</span>
      </div>

      <GoogleLoginButton 
        onGoogleSuccess={async (res: any) => {
          if (res.credential) {
            try {
              setIsLoading(true);
              await loginWithGoogle(res.credential);
            } catch (err) {
              console.error("Google registration/login failed:", err);
            } finally {
              setIsLoading(false);
            }
          }
        }} 
      />
    </div>
  );
};

export default RegisterPage;
