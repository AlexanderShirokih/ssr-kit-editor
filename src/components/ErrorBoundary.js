import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here
    console.error(error, errorInfo);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Ошибка при построении экрана</h1>
          <button onClick={this.handleTryAgain}>Обновить</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
