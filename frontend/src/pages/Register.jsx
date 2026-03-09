import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse login styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, roles: ['user'] }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Create Account</h2>
                    <p>Join Adarsh Awning family today</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message" style={{ color: 'green', textAlign: 'center', marginBottom: '16px' }}>{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Register</button>
                </form>
                <div className="login-footer">
                    <p>Already have an account? <span className="link" onClick={() => navigate('/login')}>Login</span></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
