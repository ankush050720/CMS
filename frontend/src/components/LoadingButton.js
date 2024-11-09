// LoadingButton.js
import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useLoading } from './LoadingContext';

const LoadingButton = ({ onClick, children, ...props }) => {
    const { loading, setLoading } = useLoading();
  
    const handleClick = async (event) => {
      if (onClick && typeof onClick === "function") {
        setLoading(true);
        await onClick(event);  // Wait for the action to complete
        setLoading(false);
      } else {
        console.error("onClick is not a function");
      }
    };
  
    return (
      <Button onClick={handleClick} disabled={loading} {...props}>
        {loading ? <CircularProgress size={24} /> : children}
      </Button>
    );
  };
  

export default LoadingButton;