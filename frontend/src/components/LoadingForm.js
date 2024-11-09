// LoadingForm.js
import React from 'react';
import { useLoading } from './LoadingContext';

const LoadingForm = ({ onSubmit, children, ...props }) => {
  const { loading, setLoading } = useLoading();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(event); // Handle submission
    } finally {
      setLoading(false); // Ensure loading is stopped regardless of success/failure
    }
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

export default LoadingForm;