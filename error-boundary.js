import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          {/* Uncomment the next line if you want to display the error to users */}
          {/* <details>{this.state.error && this.state.error.toString()}</details> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
