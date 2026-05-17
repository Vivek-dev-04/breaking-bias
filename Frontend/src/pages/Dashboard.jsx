import React, { useState, useEffect } from 'react';

import {
  Shield,
  Sparkles,
  Activity,
  CheckCircle2,
  ChevronRight,
  Loader2
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import api from '../api/axios';

import './Dashboard.css';

const Dashboard = () => {

  const navigate = useNavigate();

  const [requestText, setRequestText] = useState('');

  const [analysisResult, setAnalysisResult] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // Protect dashboard route
  useEffect(() => {

    const token =
      localStorage.getItem('token');

    if (!token) {

      navigate('/login');
    }

  }, []);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/');
  };

  // Analyze request
  const handleAnalyze = async () => {

    if (!requestText.trim()) return;

    setIsLoading(true);

    setError(null);

    try {

      const token =
        localStorage.getItem('token');

      const response = await api.post(

        '/api/analyze',

        {
          request: requestText
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAnalysisResult(response.data);

    } catch (err) {

      console.error(err);

      if (err.response?.status === 401) {

        setError('Unauthorized. Please login again.');

        localStorage.removeItem('token');

        navigate('/login');

      } else {

        setError(
          'Failed to analyze the request. Please try again.'
        );
      }

    } finally {

      setIsLoading(false);
    }
  };

  return (

    <div className="dashboard">

      <header className="dash-header">

        <div className="header-brand">

          <div
            className="logo-container"
            style={{
              width: '36px',
              height: '36px',
              marginBottom: 0,
              marginRight: '1rem'
            }}
          >
            <Shield size={18} color="#fff" />
          </div>

          <div>

            <div
              className="product-label"
              style={{ marginBottom: 0 }}
            >
              INTELLIGENT SYSTEMS
            </div>

            <div
              className="brand-name"
              style={{ fontSize: '1.25rem' }}
            >
              Breaking Bias
            </div>

          </div>

        </div>

        <button
          className="btn-secondary"
          style={{
            width: 'auto',
            padding: '0.5rem 1rem'
          }}
          onClick={handleLogout}
        >
          Sign Out
        </button>

      </header>

      <main className="dash-main container">

        <div className="analysis-input-card">

          <div className="card-header">

            <span className="label">
              MESSAGE ANALYSIS
            </span>

          </div>

          <div className="input-row">

            <div className="input-wrapper">

              <ChevronRight
                size={18}
                className="icon"
              />

              <input
                type="text"

                placeholder="Describe the claim or query you'd like to analyze..."

                value={requestText}

                onChange={(e) =>
                  setRequestText(e.target.value)
                }

                onKeyDown={(e) =>
                  e.key === 'Enter' && handleAnalyze()
                }

                disabled={isLoading}
              />

            </div>

            <button
              className="btn-analyze"

              onClick={handleAnalyze}

              disabled={
                isLoading || !requestText.trim()
              }
            >

              {isLoading

                ? <Loader2
                  size={16}
                  className="spinner"
                />

                : 'Analyze'
              }

              {!isLoading &&
                <Sparkles size={16} />
              }

            </button>

          </div>

          {error && (

            <div
              style={{
                color: 'red',
                marginTop: '10px',
                fontSize: '14px'
              }}
            >
              {error}
            </div>
          )}

        </div>

        {analysisResult && (

          <div className="results-container">

            <div className="results-header">

              <div
                className="flex-center"
                style={{ gap: '0.75rem' }}
              >

                <div className="icon-box">

                  <Activity
                    size={20}
                    color="var(--accent-blue)"
                  />

                </div>

                <h2 style={{ marginBottom: 0 }}>
                  Analysis Results
                </h2>

              </div>

              <div className="live-status">

                <span className="dot success"></span>

                Analysis Complete

              </div>

            </div>

            <div className="results-grid">

              <div className="grid-col left-col">

                <div className="result-card highlight-card">

                  <div className="card-label">

                    <Activity size={14} />

                    CLASSIFICATION

                  </div>

                  <h3
                    className="classification-title"

                    style={{
                      color:
                        analysisResult.classification === 'FAKE'
                          ? '#ff4d4f'
                          : analysisResult.classification === 'TRUE'
                            ? '#52c41a'
                            : 'inherit'
                    }}
                  >
                    {analysisResult.classification}
                  </h3>

                </div>

                <div className="result-card confidence-card">

                  <div className="card-label">

                    <CheckCircle2 size={14} />

                    CONFIDENCE

                  </div>

                  <div className="confidence-value">

                    {analysisResult.confidence}%

                  </div>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"

                      style={{
                        width:
                          `${analysisResult.confidence}%`
                      }}
                    ></div>

                  </div>

                </div>

              </div>

              <div className="grid-col right-col">

                <div
                  className="result-card rationale-card"

                  style={{ height: '100%' }}
                >

                  <div className="card-label">

                    <Shield size={14} />

                    REASONING

                  </div>

                  <p className="rationale-text">

                    {analysisResult.reason}

                  </p>

                </div>

              </div>

            </div>

            <div className="results-grid lower-grid">

              <div className="result-card">

                <div className="card-label">

                  ESTABLISHED FACTS

                </div>

                <ul
                  className="extraction-list"

                  style={{
                    paddingLeft: '1rem',
                    listStyleType: 'disc',
                    marginTop: '10px'
                  }}
                >

                  {analysisResult.facts?.map(
                    (fact, index) => (

                      <li
                        key={index}

                        style={{
                          marginBottom: '8px',
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}
                      >
                        {fact}
                      </li>
                    )
                  )}

                </ul>

              </div>

              <div className="result-card">

                <div className="card-label">

                  INDICATORS

                </div>

                <div
                  className="tags-container"

                  style={{ marginTop: '10px' }}
                >

                  {analysisResult.indicators?.map(
                    (indicator, index) => (

                      <span
                        key={index}

                        className="tag"

                        style={{
                          whiteSpace: 'normal',
                          display: 'inline-block',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}
                      >
                        {indicator}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      <footer className="dash-footer">

        <div className="footer-left">

          <div
            className="logo-container"

            style={{
              width: '24px',
              height: '24px',
              marginBottom: 0,
              marginRight: '0.5rem'
            }}
          >
            <Shield size={12} color="#fff" />
          </div>

          INTELLIGENT SYSTEMS

          <span
            style={{
              fontWeight: 400,
              color: 'var(--text-secondary)',
              marginLeft: '0.5rem'
            }}
          >
            Breaking Bias
          </span>

        </div>

        <div className="footer-links">

          <a href="#">Privacy</a>

          <a href="#">Terms</a>

          <a href="#">Support</a>

        </div>

        <div className="footer-right">

          © 2024 IS Labs. Built for performance.

        </div>

      </footer>

    </div>
  );
};

export default Dashboard;