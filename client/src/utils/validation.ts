interface ValidationResult {
    isValid: boolean;
    errors: {
        email?: string;
        password?: string[]; // שינוי: סיסמה תהיה מערך של מחרוזות
    };
}

/**
 * Validates the email and password for login.
 * @param email The user's email address.
 * @param password The user's password.
 * @returns An object with validation results and error messages.
 */
export const validateLoginForm = (email: string, password: string): ValidationResult => {
    const errors: {
        email?: string;
        password?: string[];
    } = {};

    // 1. Email validation
    if (!email) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address.';
    }

    // 2. Password validation
    if (!password) {
        errors.password = ['Password is required.'];
    } else {
        const passwordErrors: string[] = [];

        if (password.length < 6) {
            passwordErrors.push('Must be at least 6 characters long.');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            passwordErrors.push('Must contain at least one uppercase letter.');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            passwordErrors.push('Must contain at least one lowercase letter.');
        }
        if (!/(?=.*\d)/.test(password)) {
            passwordErrors.push('Must contain at least one digit.');
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            passwordErrors.push('Must contain at least one special character (@$!%*?&).');
        }

        if (passwordErrors.length > 0) {
            errors.password = passwordErrors;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};