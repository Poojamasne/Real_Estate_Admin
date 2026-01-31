import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminLoginImage from '../../assets/images/admin-login.png';
import AdminLogo from '../../assets/Logo/AdminLogo.svg';

// Import SVG icons
import EmailIcon from '../../assets/icons/Email-address.svg';
import PasswordIcon from '../../assets/icons/password.svg';
import EyeOpenIcon from '../../assets/icons/eye-open.svg';
import EyeCloseIcon from '../../assets/icons/eye-close.svg';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@clinic.com');
  const [password, setPassword] = useState('Password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === 'admin@clinic.com' && password === 'Password') {
        localStorage.setItem('adminToken', 'demo-token');
        navigate('/admin/dashboard');
      } else {
        alert('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check device type with more specific iPad breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isSmallMobile = windowWidth <= 480;
  const isIpadPro = windowWidth > 1024 && windowWidth <= 1366; // iPad Pro 12.9"
  const isIpadAir = windowWidth > 1024 && windowWidth <= 1180; // iPad Air 10.9"
  const isLargeTablet = isIpadPro || isIpadAir;
  const isLandscape = windowWidth > windowHeight && windowWidth > 768;

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#EBF2FF',
      padding: isSmallMobile ? '10px' : 
               isMobile ? '15px' : 
               isTablet ? '20px' : 
               '20px',
      fontFamily: "'Montserrat', sans-serif",
      overflow: 'auto',
    },
    wrapper: {
      width: isMobile ? '100%' : 
             isTablet ? (isLandscape ? '90%' : '90%') : 
             isLargeTablet ? (isLandscape ? '80%' : '90%') : 
             '1248px',
      height: isMobile ? 'auto' : 
              isTablet ? (isLandscape ? '500px' : 'auto') : 
              isLargeTablet ? (isLandscape ? '500px' : 'auto') : 
              '500px',
      minHeight: isTablet ? '500px' : isLargeTablet ? '500px' : 'auto',
      background: 'white',
      borderRadius: isSmallMobile ? '10px' : 
                    isMobile ? '15px' : 
                    '20px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      maxWidth: isMobile ? '100%' : 
                isTablet ? (isLandscape ? '1100px' : '800px') : 
                isLargeTablet ? (isLandscape ? '1200px' : '1000px') : 
                '1248px',
      margin: isMobile ? '0' : '20px',
    },
    // Image Container - Only shown on mobile as above login
    imageContainer: {
      display: isMobile ? 'block' : 'none',
      width: '100%',
      height: isSmallMobile ? '150px' : 
              isMobile ? (isLandscape ? '180px' : '200px') : 
              '200px',
      borderRadius: isMobile ? (isSmallMobile ? '8px 8px 0 0' : '10px 10px 0 0') : '10px',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    },
    // Desktop/Tablet Image Container - Side by side layout
    desktopImageContainer: {
      display: isMobile ? 'none' : 'flex',
      width: isTablet ? (isLandscape ? '45%' : '40%') : 
             isLargeTablet ? (isLandscape ? '50%' : '45%') : 
             '500px',
      height: isTablet ? (isLandscape ? '100%' : 'auto') : 
              isLargeTablet ? (isLandscape ? '100%' : 'auto') : 
              '500px',
      margin: isTablet ? (isLandscape ? '20px' : '30px 0 30px 20px') : 
              isLargeTablet ? (isLandscape ? '25px' : '30px 0 30px 25px') : 
              '30px 0 30px 30px',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      alignSelf: isTablet && !isLandscape ? 'center' : 'stretch',
    },

    loginImage: {
      width: '500px',
      height: '450px',
      // objectFit: 'cover',
      borderRadius: 'inherit',
    },
    formContainer: {
      flex: 1,
      padding: isSmallMobile ? '20px' : 
               isMobile ? '25px' : 
               isTablet ? (isLandscape ? '30px' : '40px') : 
               isLargeTablet ? (isLandscape ? '40px 60px' : '40px') : 
               '30px 86px 30px 94px',
      display: 'flex',
      flexDirection: 'column',
      gap: isSmallMobile ? '20px' : 
           isMobile ? '25px' : 
           isTablet ? (isLandscape ? '20px' : '30px') : 
           isLargeTablet ? (isLandscape ? '25px' : '35px') : 
           '46px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    header: {
      marginBottom: isMobile ? '10px' : 
                    isTablet ? '15px' : 
                    '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: isSmallMobile ? '10px' : 
           isMobile ? '15px' : 
           isTablet ? '15px' : 
           '20px',
      width: '100%',
      textAlign: 'center',
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    logo: {
      height: isSmallMobile ? '78px' : 
              isMobile ? '90px' : 
              isTablet ? (isLandscape ? '70px' : '80px') : 
              isLargeTablet ? (isLandscape ? '85px' : '95px') : 
              '102px',
      width: isSmallMobile ? '178px' : 
             isMobile ? '250px' : 
             isTablet ? (isLandscape ? '180px' : '200px') : 
             isLargeTablet ? (isLandscape ? '200px' : '220px') : 
             '245px',
      objectFit: 'contain',
    },
    headerText: {
      fontSize: isSmallMobile ? '20px' : 
                isMobile ? '22px' : 
                isTablet ? (isLandscape ? '24px' : '26px') : 
                isLargeTablet ? (isLandscape ? '28px' : '30px') : 
                '32px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      margin: 0,
      lineHeight: '1.2',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: isSmallMobile ? '15px' : 
           isMobile ? '20px' : 
           isTablet ? (isLandscape ? '15px' : '20px') : 
           isLargeTablet ? (isLandscape ? '20px' : '25px') : 
           '30px',
      width: '100%',
      maxWidth: isMobile ? '100%' : 
                isTablet ? (isLandscape ? '400px' : '350px') : 
                isLargeTablet ? (isLandscape ? '450px' : '400px') : 
                '471px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: isSmallMobile ? '6px' : 
           isTablet ? '8px' : 
           '10px',
      position: 'relative',
      width: '100%',
    },
    label: {
      fontWeight: '300',
      fontSize: isSmallMobile ? '14px' : 
                isTablet ? '15px' : 
                '16px',
      lineHeight: '145%',
      color: '#000000',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    inputContainer: {
      position: 'relative',
      width: '100%',
    },
    input: {
      width: '100%',
      height: isSmallMobile ? '40px' : 
              isTablet ? (isLandscape ? '42px' : '45px') : 
              isLargeTablet ? (isLandscape ? '45px' : '47px') : 
              '47px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: `0 15px 0 ${isSmallMobile ? '40px' : 
                                         isTablet ? '45px' : 
                                         '45px'}`,
      fontSize: isSmallMobile ? '14px' : 
                isTablet ? '15px' : 
                '16px',
      transition: 'all 0.3s ease',
      fontFamily: "'Montserrat', sans-serif",
      boxSizing: 'border-box',
    },
    iconContainer: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 1,
    },
    icon: {
      width: isSmallMobile ? '16px' : 
             isTablet ? '18px' : 
             '20px',
      height: isSmallMobile ? '16px' : 
              isTablet ? '18px' : 
              '20px',
    },
    passwordToggle: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      zIndex: 2,
    },
    toggleIcon: {
      width: isSmallMobile ? '16px' : 
             isTablet ? '18px' : 
             '20px',
      height: isSmallMobile ? '16px' : 
              isTablet ? '18px' : 
              '20px',
    },
    loginButton: {
      width: '100%',
      height: isSmallMobile ? '40px' : 
              isTablet ? (isLandscape ? '42px' : '45px') : 
              isLargeTablet ? (isLandscape ? '45px' : '47px') : 
              '47px',
      background: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: isSmallMobile ? '14px' : 
                isTablet ? '15px' : 
                '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontFamily: "'Montserrat', sans-serif",
      marginTop: isMobile ? '10px' : '0',
      boxSizing: 'border-box',
    },
    buttonDisabled: {
      background: '#ccc',
      cursor: 'not-allowed',
      opacity: 0.7,
    },
    demoCredentials: {
      marginTop: '20px',
      padding: isTablet ? '12px' : '15px',
      background: '#f9f9f9',
      borderRadius: '8px',
      borderLeft: '4px solid #A237FF',
      width: '100%',
      maxWidth: isTablet ? (isLandscape ? '400px' : '350px') : 
                isLargeTablet ? (isLandscape ? '450px' : '400px') : 
                '471px',
      display: isMobile ? 'none' : 'block',
    },
    demoText: {
      fontSize: isTablet ? '13px' : '14px',
      color: '#666',
      margin: '5px 0',
      lineHeight: '1.4',
    },
    demoTitle: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px',
      fontSize: isTablet ? '14px' : '15px',
    },
    // Mobile specific styles
    mobileDemo: {
      display: isMobile ? 'block' : 'none',
      marginTop: '15px',
      padding: '12px',
      background: '#f9f9f9',
      borderRadius: '8px',
      borderLeft: '3px solid #A237FF',
      width: '100%',
    },
    mobileDemoText: {
      fontSize: '12px',
      color: '#666',
      margin: '3px 0',
      lineHeight: '1.4',
    },
    mobileDemoTitle: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '6px',
      fontSize: '13px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
       

        {/* Tablet/Desktop View: Image on left side */}
        {!isMobile && (
          <div style={styles.desktopImageContainer}>
            <img 
              src={adminLoginImage} 
              alt="Admin Login" 
              style={styles.loginImage}
              onError={(e) => {
                console.log('Image failed to load');
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.display = 'flex';
                e.target.style.alignItems = 'center';
                e.target.style.justifyContent = 'center';
                e.target.style.color = '#666';
                e.target.innerHTML = '<div style="text-align: center; padding: 20px;"><h3 style="margin: 0;">Admin Portal</h3></div>';
              }}
            />
          </div>
        )}

        {/* Right side - Login Form (Same for all devices) */}
        <div style={styles.formContainer}>
          <div style={styles.header}>
            {/* Admin Logo */}
            <div style={styles.logoContainer}>
              <img 
                src={AdminLogo} 
                alt="Admin Logo" 
                style={styles.logo}
                onError={(e) => {
                  console.log('Logo failed to load');
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<h1 style="color: #A237FF; font-size: 24px;">Admin Portal</h1>';
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email Field */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <div style={styles.inputContainer}>
                <div style={styles.iconContainer}>
                  <img 
                    src={EmailIcon} 
                    alt="Email Icon" 
                    style={styles.icon}
                    onError={(e) => {
                      console.log('Email icon failed to load');
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@clinic.com"
                  required
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.borderColor = '#A237FF';
                    e.target.style.boxShadow = '0 0 0 2px rgba(162, 55, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = '';
                    e.target.style.borderColor = '#ddd';
                    e.target.style.boxShadow = '';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.inputContainer}>
                <div style={styles.iconContainer}>
                  <img 
                    src={PasswordIcon} 
                    alt="Password Icon" 
                    style={styles.icon}
                    onError={(e) => {
                      console.log('Password icon failed to load');
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.borderColor = '#A237FF';
                    e.target.style.boxShadow = '0 0 0 2px rgba(162, 55, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = '';
                    e.target.style.borderColor = '#ddd';
                    e.target.style.boxShadow = '';
                  }}
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={styles.passwordToggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img 
                    src={showPassword ? EyeOpenIcon : EyeCloseIcon} 
                    alt={showPassword ? "Hide password" : "Show password"} 
                    style={styles.toggleIcon}
                    onError={(e) => {
                      console.log('Eye icon failed to load');
                      e.target.style.display = 'none';
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              style={{
                ...styles.loginButton,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.background = '#8a2be2')}
              onMouseLeave={(e) => !loading && (e.target.style.background = '#A237FF')}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;