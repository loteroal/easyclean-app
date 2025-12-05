import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        if (email && password) {
            onLogin();
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <Card style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <img src="/logo-blue.png" alt="EasyClean Logo" style={{ height: '80px', marginBottom: '16px' }} />
                    <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Sign in to manage your home cleaning.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div style={{ marginTop: '24px' }}>
                        <Button type="submit" style={{ width: '100%' }}>Sign In</Button>
                    </div>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
                    <a href="#" style={{ color: 'var(--color-text-secondary)' }}>Forgot password?</a>
                </div>
            </Card>
        </div>
    );
};

export default Login;
