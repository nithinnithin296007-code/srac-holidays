import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--dark)',
          color: 'var(--light)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Something went wrong.</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '480px', marginBottom: '2rem', lineHeight: '1.6' }}>
            An unexpected error occurred. Please try reloading the page or contact support if the issue persists.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
