import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import api from '../api/axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    setIsLoading(true);
    try {
      // Call the backend endpoint for starting forgot password
      const response = await api.post('/api/auth/forgot/start', { username });
      setMessage('A reset link has been sent to your registered email.');
    } catch (err) {
      setError('Failed to send reset link. Please check your username.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your username to receive a password reset link."
      isLoading={isLoading}
      loadingMessage="TRANSMITTING RESET PASSWORD KEY..."
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </div>
        )}
        {message && (
          <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Username</label>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <User size={18} className="input-icon" />
          </div>
        </div>

        <button type="submit" className="btn-primary">Send Reset Link</button>

        <div className="divider"><span>OR</span></div>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
