import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [Password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://bcrypt-project.onrender.com/api/auth/login', {
                usernameOrEmail,
                Password,
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
