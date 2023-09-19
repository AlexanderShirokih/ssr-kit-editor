import React, { ReactNode } from 'react';

interface State {
  hasError: boolean;
  errorInfo: any;
}

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false, errorInfo: null });
  };

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
