import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-red-500 text-2xl">!</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-400 mb-6">
                We're sorry for the inconvenience. Please refresh the page to try
                again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
