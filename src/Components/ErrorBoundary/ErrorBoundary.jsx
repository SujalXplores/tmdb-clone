import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
        }}>
          <h1>Something went wrong...</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
