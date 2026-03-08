import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render errors and displays a recovery UI instead of crashing the app.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-10">
          <div className="text-center max-w-md">
            <h1 className="font-display font-extrabold text-3xl tracking-tighter uppercase mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="font-mono text-xs uppercase tracking-[0.15em] border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Return home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
