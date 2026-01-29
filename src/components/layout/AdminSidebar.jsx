import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import AdminLogo from "../../assets/icons/Admin-Logo.svg";
import DashboardIcon from "../../assets/icons/Dashboard.svg";
import PropertyIcon from "../../assets/icons/Property.svg";
import InquiryIcon from "../../assets/icons/Inquiry.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";

const AdminSidebar = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null);

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) onClose(false); // ensure sidebar open on desktop
  };

  // Close sidebar if clicked outside
  const handleClickOutside = (event) => {
    if (
      isMobile &&
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      onClose(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen]);

  const menuItems = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
    { id: 2, name: "Property", path: "/admin/properties", icon: PropertyIcon },
    { id: 3, name: "Inquiry", path: "/admin/inquiries", icon: InquiryIcon },
    { id: 4, name: "Logout", path: "/admin/login", icon: LogoutIcon },
  ];

  const styles = {
    overlay: {
      display: isMobile && isOpen ? "block" : "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 999,
    },
    sidebar: {
      width: "265px",
      height: "100vh",
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #EAEAEA",
      overflow: "hidden",
      position: isMobile ? "fixed" : "relative",
      top: 0,
      left: isOpen ? 0 : "-300px",
      transition: "left 0.3s ease",
      zIndex: 1000,
    },
    logoSection: {
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid #EAEAEA",
    },
    logo: {
      height: "42px",
      objectFit: "contain",
    },
    menuSection: {
      flex: 1,
      paddingTop: "32px",
    },
    menuList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    menuItem: { marginBottom: "16px" },
    menuLink: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "14px 20px",
      margin: "0 24px",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "500",
      color: "#111",
      borderRadius: "10px",
      border: "1px solid transparent",
      transition: "all 0.2s ease",
    },
    activeMenuLink: { border: "1px solid #CDA1F8", color: "#111" },
    menuIcon: { width: "20px", height: "20px" },
    logoutSection: {
      padding: "24px",
      borderTop: "1px solid #EAEAEA",
    },
    logoutButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "14px 20px",
      backgroundColor: "transparent",
      border: "1px solid transparent",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "500",
      color: "#111",
      transition: "all 0.2s ease",
    },
  };

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay}></div>

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
                >
                  <img src={item.icon} alt={item.name} style={styles.menuIcon} />
                  {item.name}
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
