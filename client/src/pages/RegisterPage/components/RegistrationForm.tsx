import React, { useState } from 'react';
import { RegisterPayload } from '../../../types/User';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { USER_GENDERS } from '../../../utils/genders';
import '../styles/RegistrationForm.css';

interface RegistrationFormProps {
  formData: RegisterPayload;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateOfBirthChange: (date: Date | null) => void;
  onGenderChange: (gender: typeof USER_GENDERS[number]) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  validationErrors: { email?: string; password?: string[] } | null;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  onInputChange,
  onDateOfBirthChange,
  onGenderChange,
  onSubmit,
  isLoading,
  validationErrors,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordMatch = formData.password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordMatch) {
      onSubmit(e);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="form-columns">
        {/* Column 1 */}
        <div className="column">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              id="fullName"
              value={formData.fullName || ''}
              onChange={onInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="form-group password-container">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={onInputChange}
                required
                disabled={isLoading}
              />
              <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            {validationErrors?.password && validationErrors.password.length > 0 && (
              <ul className="error-list">
                {validationErrors.password.map((msg, index) => (
                  <li key={index} className="error-message">{msg}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <DatePicker
              selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
              onChange={onDateOfBirthChange}
              dateFormat="dd/MM/yyyy"
              disabled={isLoading}
              placeholderText="DD/MM/YYYY"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="column">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={onInputChange}
              required
              disabled={isLoading}
            />
            {validationErrors?.email && (
              <p className="error-message">{validationErrors.email}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group password-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                disabled={isLoading}
              />
              <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            {!isPasswordMatch && confirmPassword && (
              <p className="error-message">Passwords do not match</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={(e) => onGenderChange(e.target.value as typeof USER_GENDERS[number])}
              disabled={isLoading}
            >
              {USER_GENDERS.map((genderOption) => (
                <option key={genderOption} value={genderOption}>
                  {genderOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button" disabled={isLoading || !isPasswordMatch}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegistrationForm;
