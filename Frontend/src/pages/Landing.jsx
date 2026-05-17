import React from 'react';
import { 
  Shield, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  FileSearch,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-container">
      {/* Background Cyber Grid Grid Overlay */}
      <div className="landing-grid-bg"></div>

      <div className="landing-content">
        {/* Navigation Bar */}
        <nav className="landing-nav animate-fade-in">
          <div className="nav-brand">
            <div className="nav-logo-box">
              <Shield size={18} color="#fff" />
            </div>
            <span className="nav-brand-name">BREAKING BIAS</span>
          </div>

          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#process" className="nav-link">How it Works</a>
            <button className="nav-btn" onClick={handleRegister}>Register</button>
            <button className="nav-btn-primary" onClick={handleStart}>Launch App</button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero-section">
          <div className="hero-badge animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Sparkles size={14} />
            <span>POWERED BY ADVANCED COGNITIVE ANALYTICS</span>
          </div>

          <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Uncover Truth. Detect Deception.<br />
            <span className="title-gradient-text">Break the Bias.</span>
          </h1>

          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Breaking Bias is an intelligent message analysis workspace. Evaluate claims, 
            detect informational slant, extract factual references, and dissect structural media bias 
            with cryptographic precision.
          </p>

          <div className="hero-ctas animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button className="btn-hero-primary" onClick={handleStart}>
              Analyze a Claim Now
              <ArrowRight size={18} />
            </button>
            <a href="#features" className="btn-hero-secondary">
              Explore Capabilities
            </a>
          </div>

          {/* Interactive Hero Visual (Futuristic Scanning Radar) */}
          <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* Dashed Radar rings */}
            <div className="visual-radar-ring ring-lg"></div>
            <div className="visual-radar-ring ring-md"></div>
            <div className="visual-radar-ring ring-sm"></div>

            {/* Glowing scanline animation */}
            <div className="visual-scanline"></div>

            {/* Floating Claim Cards (Simulation) */}
            <div className="visual-claims claim-1">
              <div className="claim-type">
                <AlertTriangle size={10} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                UNVERIFIED INCOMING CLAIM
              </div>
              <p className="claim-txt">"COVID vaccines contain synthetic micro-tracking chips."</p>
              <div className="claim-type" style={{ marginTop: '6px', textAlign: 'right' }}>
                RESULT: <span className="claim-fake">FAKE (99% CONF)</span>
              </div>
            </div>

            <div className="visual-claims claim-2">
              <div className="claim-type">
                <CheckCircle2 size={10} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                VERIFIED GLOBAL CLAIM
              </div>
              <p className="claim-txt">"Increased CO2 emissions directly accelerate global temperatures."</p>
              <div className="claim-type" style={{ marginTop: '6px', textAlign: 'right' }}>
                RESULT: <span className="claim-verified">TRUE (98% CONF)</span>
              </div>
            </div>

            {/* Center Glowing Shield */}
            <div className="visual-shield-container">
              <div className="shield-glowing-glow"></div>
              <div className="visual-shield-icon">
                <Shield size={36} color="var(--neon-cyan)" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="product-label" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', margin: 0 }}>INTELLIGENT MATRIX</div>
                <div className="brand-name" style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Bias Parser Active</div>
              </div>
            </div>
          </div>
        </header>

        {/* Features Capabilities Grid */}
        <section id="features" className="features-section">
          <div className="features-header">
            <p className="features-subtitle">Workspace Capabilities</p>
            <h2 className="features-title">Designed for Deep Claim Auditing</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <Activity size={22} />
              </div>
              <h3>Fact Classification</h3>
              <p>
                Evaluate claims against active knowledge matrices. Classify claims instantly as True, 
                Fake, or Slanted with rigorous cross-referencing.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Cpu size={22} />
              </div>
              <h3>Confidence Mapping</h3>
              <p>
                Obtain precise confidence indices backed by neural reasoning patterns, eliminating 
                guesswork in information analysis.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <FileSearch size={22} />
              </div>
              <h3>Factual Extraction</h3>
              <p>
                Automatically distill raw, complex statements into established facts, isolating 
                objective truths from subjective clutter.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <TrendingUp size={22} />
              </div>
              <h3>Linguistic Indicators</h3>
              <p>
                Parse text for emotional appeals, logical fallacies, propaganda markers, and slanted 
                adjectives to flag inherent cognitive bias.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works (Process) */}
        <section id="process" className="process-section">
          <div className="features-header">
            <p className="features-subtitle">System Pipeline</p>
            <h2 className="features-title">How Bias Parsing Works</h2>
          </div>

          <div className="process-grid">
            <div className="process-step">
              <div className="process-number">01</div>
              <h4>Input Statement</h4>
              <p>Submit any claim, news segment, or conversational argument into the secure parser.</p>
            </div>

            <div className="process-step">
              <div className="process-number">02</div>
              <h4>Cognitive Analysis</h4>
              <p>The parser scans the structure, pulls key factual assertions, and weighs conflicting media biases.</p>
            </div>

            <div className="process-step">
              <div className="process-number">03</div>
              <h4>Dissected Report</h4>
              <p>Review standard confidence scores, extraction lists, bias flags, and deep rationale reports.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="cta-section">
          <div className="cta-box">
            <h2>Take Control of Your Information Sphere</h2>
            <p>
              Join the ranks of modern researchers, media analysts, and conscious readers 
              combating the spread of cognitive bias.
            </p>
            <button className="btn-hero-primary" onClick={handleStart} style={{ padding: '1rem 3rem' }}>
              Launch Workspace
              <ExternalLink size={18} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="landing-footer-container">
            <div className="nav-brand" style={{ gap: '0.5rem' }}>
              <div className="nav-logo-box" style={{ width: '24px', height: '24px' }}>
                <Shield size={12} color="#fff" />
              </div>
              <span className="nav-brand-name" style={{ fontSize: '0.95rem' }}>BREAKING BIAS</span>
            </div>
            
            <div className="footer-links" style={{ margin: 0 }}>
              <a href="#">Privacy policy</a>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href="#">Terms of service</a>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href="#">System status</a>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              © 2026 Intelligent Systems Archive. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
