import React from 'react';

const Login = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Montserrat', sans-serif",
      color: 'white',
    }}>
      <h1>User Login Page</h1>
      <p style={{ marginTop: '20px' }}>
        This is the regular user login page.
      </p>
      <a 
        href="/admin/login" 
        style={{
          marginTop: '20px',
          color: 'white',
          textDecoration: 'underline',
          fontSize: '18px',
        }}
      >
        Go to Admin Login
      </a>
    </div>
  );
};

export default Login;

