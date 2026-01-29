import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/layout/AdminNavbar';
import AdminSidebar from '../components/layout/AdminSidebar';

const AdminLayout = () => {
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F5F7FA',
      fontFamily: "'Inter', sans-serif",
    },
    sidebarWrapper: {
      width: '250px',
      backgroundColor: '#FFFFFF',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
      transition: 'all 0.3s ease',
    },
    mainContent: {
      flex: 1,
      marginLeft: '250px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
    },
    contentArea: {
      flex: 1,
      padding: '30px',
      overflowY: 'auto',
    },
  };

  const responsiveStyles = {
    sidebarWrapper: {
      '@media (max-width: 1024px)': {
        width: '220px',
      },
      '@media (max-width: 768px)': {
        transform: 'translateX(-100%)',
        width: '280px',
      },
    },
    mainContent: {
      '@media (max-width: 768px)': {
        marginLeft: '0',
      },
    },
    contentArea: {
      '@media (max-width: 768px)': {
        padding: '20px 15px',
      },
      '@media (max-width: 480px)': {
        padding: '15px 10px',
      },
    },
  };

  const getResponsiveStyle = (baseStyle, responsiveStyle) => {
    return {
      ...baseStyle,
      ...(window.innerWidth <= 1024 && responsiveStyle['@media (max-width: 1024px)']),
      ...(window.innerWidth <= 768 && responsiveStyle['@media (max-width: 768px)']),
      ...(window.innerWidth <= 480 && responsiveStyle['@media (max-width: 480px)']),
    };
  };

  return (
    <div style={styles.container}>
      <div style={{...styles.sidebarWrapper, ...getResponsiveStyle({}, responsiveStyles.sidebarWrapper)}}>
        <AdminSidebar />
      </div>
      <div style={{...styles.mainContent, ...getResponsiveStyle({}, responsiveStyles.mainContent)}}>
        <AdminNavbar />
        <div style={{...styles.contentArea, ...getResponsiveStyle({}, responsiveStyles.contentArea)}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;