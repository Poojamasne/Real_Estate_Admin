import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import AdminLogo from "../../assets/icons/Admin-Logo.svg";
import DashboardIcon from "../../assets/icons/Dashboard.svg";
import PropertyIcon from "../../assets/icons/Property.svg";
import InquiryIcon from "../../assets/icons/Inquiry.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";

const AdminSidebar = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );
  const sidebarRef = useRef(null);

  // Device breakpoints
  const checkDeviceType = () => {
    const width = window.innerWidth;
    const mobile = width <= 768;
    const tablet = width > 768 && width <= 1024;
    
    setIsMobile(mobile);
    setIsTablet(tablet);
  };

  // Close sidebar if clicked outside on mobile/tablet
  const handleClickOutside = (event) => {
    if (
      (isMobile || isTablet) &&
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      onClose(false);
    }
  };

  useEffect(() => {
  
    
    // Add event listeners
    window.addEventListener("resize", checkDeviceType);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkDeviceType);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobile, isTablet, isOpen]);

  // Handle escape key press to close sidebar
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
    { id: 2, name: "Property", path: "/admin/properties", icon: PropertyIcon },
    { id: 3, name: "Inquiry", path: "/admin/inquiries", icon: InquiryIcon },
    { id: 4, name: "Logout", path: "/admin/login", icon: LogoutIcon },
  ];

  // Responsive sidebar width based on device
  const getSidebarWidth = () => {
    if (isMobile) return "280px";
    if (isTablet) {
      const width = window.innerWidth;
      if (width <= 834) return "280px";
      if (width <= 1024) return "300px";
      return "300px";
    }
    return "265px";
  };

  const styles = {
    overlay: {
      display: (isMobile || isTablet) && isOpen ? "block" : "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 999,
      backdropFilter: "blur(2px)",
    },
    sidebar: {
      width: getSidebarWidth(),
      height: "100vh",
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #EAEAEA",
      overflow: "hidden",
      position: isMobile || isTablet ? "fixed" : "relative",
      top: 0,
      left: isMobile || isTablet ? (isOpen ? 0 : `-${getSidebarWidth()}`) : 0,
      transition: "left 0.3s ease",
      zIndex: 1000,
      boxShadow: (isMobile || isTablet) && isOpen ? "2px 0 15px rgba(0,0,0,0.1)" : "none",
    },
    logoSection: {
      height: isMobile ? "70px" : "80px",
      minHeight: isMobile ? "70px" : "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid #EAEAEA",
      padding: isMobile ? "0 20px" : "0",
    },
    logo: {
      height: isMobile ? "36px" : "60px",
      objectFit: "contain",
      maxWidth: "100%",
    },
    menuSection: {
      flex: 1,
      paddingTop: isMobile ? "24px" : "32px",
      overflowY: "auto",
      paddingBottom: isMobile ? "20px" : "0",
    },
    menuList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    menuItem: { 
      marginBottom: isMobile ? "12px" : "16px",
      padding: "0 8px",
    },
    menuLink: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : "14px",
      padding: isMobile ? "12px 16px" : "14px 16px",
      margin: isMobile ? "0 12px" : "0 16px",
      textDecoration: "none",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "500",
      color: "#111",
      borderRadius: "10px",
      border: "1px solid transparent",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    activeMenuLink: { 
      border: "1px solid #CDA1F8", 
      color: "#111",
      backgroundColor: "rgba(205, 161, 248, 0.1)",
    },
    menuIcon: { 
      width: isMobile ? "18px" : "20px", 
      height: isMobile ? "18px" : "20px",
      flexShrink: 0,
    },
  };

  return (
    <>
      {/* Overlay for mobile and tablet */}
      {(isMobile || isTablet) && isOpen && (
        <div 
          style={styles.overlay} 
          onClick={() => onClose(false)}
          onTouchStart={() => onClose(false)}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
        ></div>
      )}

      <aside ref={sidebarRef} style={styles.sidebar}>
        {/* LOGO */}
        <div style={styles.logoSection}>
          <img src={AdminLogo} alt="Admin Logo" style={styles.logo} />
        </div>

        {/* MENU */}
        <div style={styles.menuSection}>
          <ul style={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.id} style={styles.menuItem}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    ...styles.menuLink,
                    ...(isActive ? styles.activeMenuLink : {}),
                  })}
                  onClick={() => {
                    // Close sidebar on mobile/tablet when clicking a menu item
                    if (isMobile || isTablet) {
                      onClose(false);
                    }
                  }}
                >
                  <img src={item.icon} alt={item.name} style={styles.menuIcon} />
                  <span style={{ flex: 1 }}>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;