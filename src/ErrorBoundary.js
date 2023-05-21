import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false,error:'',info:'' };
  }

  static getDerivedStateFromError(error) {

    // Update state so the next render will show the fallback UI.
    this.setState({
      hasError: true,
    })
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    this.setState({
      error: error,
      errorInfo: info,
    })
  }

  render() {
    return this.state.hasError? this.props.fallback:this.props.children
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return this.props.fallback;
    // }
    //
    // return this.props.children;
  }
}

export default ErrorBoundary;