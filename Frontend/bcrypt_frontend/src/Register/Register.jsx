import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1430/api/auth/register', {
                userName,
                Email,
                Password,
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="Email"
                    id="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="Password"
                    id="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
