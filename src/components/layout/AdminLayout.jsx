import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed by default
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );

  // Handle window resize
  const handleResize = () => {
    const width = window.innerWidth;
    const mobile = width <= 768;
    const tablet = width > 768 && width <= 1024;
    
    setIsMobile(mobile);
    setIsTablet(tablet);
    
    // Auto-manage sidebar based on device
    if (mobile) {
      // On mobile, close sidebar
      setSidebarOpen(false);
    } else if (tablet) {
      // On tablet, close by default (especially on smaller tablets)
      if (width <= 834) {
        setSidebarOpen(false);
      }
    }
    // On desktop, don't auto-open - let user control it
  };

  useEffect(() => {
    
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on all devices when needed
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Handle when main content is clicked (for mobile/tablet)
  const handleMainContentClick = () => {
    if ((isMobile || isTablet) && sidebarOpen) {
      closeSidebar();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F6F8FA",
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* RIGHT SECTION */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={handleMainContentClick}
      >
        {/* NAVBAR */}
        <AdminNavbar onToggleSidebar={toggleSidebar} />

        {/* PAGE CONTENT */}
        <div
          style={{
            flex: 1,
            padding: "16px 16px",
            overflowY: "auto",
            cursor: (isMobile || isTablet) && sidebarOpen ? "pointer" : "default",
            // Add blur effect when sidebar is open on mobile/tablet
            filter: (isMobile || isTablet) && sidebarOpen ? "blur(2px)" : "none",
            transition: "filter 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;