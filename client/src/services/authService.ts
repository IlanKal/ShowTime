import { rejects } from "assert"
import { resolve } from "path"

const loginUser = async(email: string, password: string): Promise<any> => {
    // const response = await axios.post('/api/auth/login', { email, password });

    return new Promise((resolve, reject) => { // תיקון בתחביר של ה-Promise והפונקציה
        setTimeout(() => {
            console.log('Mock API call with:', { email, password });

            if (email && password) {
                resolve({
                    token: 'mock-token-123',
                    user: {
                        id: "1",
                        email: email,
                        name: "user-mock-name"
                    }
                });
            } else {
                reject(new Error('Email and password must not be empty.'));
            }

        }, 1500);
    });
};

export { loginUser };

