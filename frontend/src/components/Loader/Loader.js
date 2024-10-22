// components/Loader/Loader.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Loader.css'; // CSS for the loader

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the loader on route change
    setLoading(true);
    
    const timeout = setTimeout(() => {
      // Simulate a delay for loader (you can adjust this)
      setLoading(false);
    }, 500); // Adjust the delay as per your preference

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      {children}
    </>
  );
};

export default Loader;
