import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err) {
    console.error("Error fetching properties:", err); // Log the error
    
  }

  

  render() {
    if (this.state.hasError) {
      // Render a fallback UI
      return (
        <div className="text-center py-10 text-red-500">
          <h1>Something went wrong.</h1>
          <p>Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;