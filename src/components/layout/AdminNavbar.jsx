import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/icons/search-admin.svg";
import NotificationIcon from "../../assets/icons/Notification.svg";
import ProfileImage from "../../assets/images/profileImage.png";

const AdminNavbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const styles = {
    navbar: {
      backgroundColor: "#FFFFFF",
      height: isMobile ? "70px" : "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 12px" : isTablet ? "0 20px" : "0 32px",
      borderBottom: "1px solid #EAEAEA",
      position: "sticky",
      top: 0,
      zIndex: 500,
      boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "16px",
      flex: 1,
      maxWidth: isDesktop ? "600px" : "auto",
    },
    toggleButton: {
      display: isMobile || isTablet ? "flex" : "none",
      width: isMobile ? "32px" : "36px",
      height: isMobile ? "32px" : "36px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CDA1F8",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      cursor: "pointer",
      border: "none",
      fontSize: isMobile ? "16px" : "18px",
      transition: "all 0.2s ease",
      ":hover": {
        backgroundColor: "#BA8FE6",
      },
    },
    searchContainer: {
      position: "relative",
      flex: 1,
      minWidth: isMobile ? "150px" : "200px",
      maxWidth: isDesktop ? "478px" : "100%",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "16px",
      height: "16px",
      opacity: isSearchFocused ? 1 : 0.6,
      transition: "opacity 0.2s ease",
      pointerEvents: "none",
    },
    searchInput: {
      width: "95%",
      height: isMobile ? "34px" : "38px",
      borderRadius: "8px",
      border: `1px solid ${isSearchFocused ? "#CDA1F8" : "#D9D9D9"}`,
      padding: "8px 12px 8px 40px",
      fontSize: isMobile ? "13px" : "14px",
      outline: "none",
      backgroundColor: "#F9F9F9",
      transition: "all 0.2s ease",
      ":focus": {
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 0 3px rgba(205, 161, 248, 0.1)",
      },
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : isTablet ? "16px" : "24px",
    },
    notificationWrapper: {
      position: "relative",
      cursor: "pointer",
    },
    notification: {
      width: isMobile ? "20px" : "22px",
      height: isMobile ? "20px" : "22px",
    },
    notificationBadge: {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      width: "8px",
      height: "8px",
      backgroundColor: "#FF4757",
      borderRadius: "50%",
      border: "2px solid #FFFFFF",
    },
    profileWrapper: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "12px",
      cursor: "pointer",
      padding: "4px 8px",
      borderRadius: "8px",
      transition: "background-color 0.2s ease",
      ":hover": {
        backgroundColor: "#F5F5F5",
      },
    },
    profileInfo: {
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.2",
      textAlign: "right",
    },
    profileName: {
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      color: "#111",
      whiteSpace: "nowrap",
    },
    profileRole: {
      fontSize: isMobile ? "10px" : "12px",
      color: "#666",
      marginTop: "2px",
    },
    profileImage: {
      width: isMobile ? "32px" : "40px",
      height: isMobile ? "32px" : "40px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #F0F0F0",
    },
    // Mobile search toggle (for very small screens)
    mobileSearchToggle: {
      display: windowWidth <= 480 ? "flex" : "none",
      width: "32px",
      height: "32px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    },
    mobileSearchIcon: {
      width: "18px",
      height: "18px",
      opacity: 0.7,
    },
  };

  // Handle mobile search toggle
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  if (isMobile && showMobileSearch) {
    return (
      <nav style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <button
            onClick={() => setShowMobileSearch(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "10px",
              color: "#666",
            }}
          >
            ←
          </button>
          <form onSubmit={handleSearch} style={{ flex: 1 }}>
            <div style={{ position: "relative" }}>
              <img src={SearchIcon} alt="Search" style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{
                  ...styles.searchInput,
                  width: "100%",
                  fontSize: "16px",
                }}
                autoFocus
              />
            </div>
          </form>
        </div>
      </nav>
    );
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        {/* Toggle button for mobile and tablet */}
        {(isMobile || isTablet) && (
          <button
            style={styles.toggleButton}
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        )}

        {/* Mobile search toggle button (only on very small screens) */}
        {windowWidth <= 480 ? (
          <button
            style={styles.mobileSearchToggle}
            onClick={() => setShowMobileSearch(true)}
            aria-label="Search"
          >
            <img src={SearchIcon} alt="Search" style={styles.mobileSearchIcon} />
          </button>
        ) : (
          // Regular search bar for larger screens
          <form onSubmit={handleSearch} style={styles.searchContainer}>
            <img src={SearchIcon} alt="Search" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={styles.searchInput}
            />
          </form>
        )}
      </div>

      <div style={styles.rightSection}>
        {/* Notification icon with badge */}
        <div style={styles.notificationWrapper}>
          <img
            src={NotificationIcon}
            alt="Notifications"
            style={styles.notification}
          />
          <div style={styles.notificationBadge}></div>
        </div>

        {/* Profile section */}
        <div style={styles.profileWrapper}>
          <div style={styles.profileInfo}>
            <span style={styles.profileName}>Rahul Jagtap</span>
            <span style={styles.profileRole}>Admin</span>
          </div>
          <img src={ProfileImage} alt="Profile" style={styles.profileImage} />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;