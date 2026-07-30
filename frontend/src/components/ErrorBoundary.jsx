import React from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught Error caught by HelpGlow ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{
            backgroundColor: 'rgba(230, 28, 114, 0.1)',
            padding: '20px',
            borderRadius: '50%',
            marginBottom: '24px',
            border: '1px solid rgba(230, 28, 114, 0.3)'
          }}>
            <AlertTriangle size={48} color="#E61C72" />
          </div>

          <h1 style={{
            fontFamily: "'Clash Display', 'Outfit', sans-serif",
            fontSize: '32px',
            fontWeight: 800,
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #FFFFFF 40%, #FCDCB5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Something went wrong
          </h1>

          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '500px',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            Don't worry! HelpGlow automatically intercepted a temporary loading error. Please try refreshing or returning to the homepage.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReload}
              style={{
                background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(10, 144, 181, 0.3)'
              }}
            >
              <RefreshCw size={18} />
              Reload Page
            </button>

            <button
              onClick={this.handleGoHome}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '14px 28px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
