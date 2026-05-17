import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import api from '../api/axios';

const EmailRegistration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setSubmitted(true);

  //   try {

  //     const response = await api.post(
  //       "/api/auth/start",
  //       email
  //     );

  //     console.log(response.data);

  //   } catch (error) {

  //     console.log(error);

  //     console.log(error.response?.data);
  //   }
  // };
  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsLoading(true);

    try {

      const response = await api.post(
        "/api/auth/start",
        {
          email: email
        }
      );

      console.log(response.data);

      setSubmitted(true);

    } catch (error) {

      console.log(error);

      console.log(error.response?.data);

      alert(
        error.response?.data || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (submitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent a verification link to complete your registration."
      >
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <CheckCircle size={64} color="var(--success-green)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3 style={{ marginBottom: '1rem' }}>Verification Link Sent!</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.5' }}>
            A verification link has been sent to <strong>{email}</strong>.
            Please click the link in the email to complete your account setup.
          </p>

          <button
            className="btn-secondary"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Enter your email address to get started."
      isLoading={isLoading}
      loadingMessage="TRANSMITTING SECURE VERIFICATION LINK..."
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter your email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail size={18} className="input-icon" />
          </div>
        </div>

        <button type="submit" className="btn-primary">Send Verification Link</button>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--accent-blue)' }}>Sign In</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default EmailRegistration;
