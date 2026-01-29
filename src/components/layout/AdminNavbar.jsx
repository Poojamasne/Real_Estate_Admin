import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/icons/search-admin.svg";
import NotificationIcon from "../../assets/icons/Notification.svg";
import ProfileImage from "../../assets/images/profileImage.png";

const AdminNavbar = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const styles = {
    navbar: {
      backgroundColor: "#FFFFFF",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "0 42px",
      borderBottom: "1px solid #EAEAEA",
      position: "sticky",
      top: 0,
      zIndex: 500,
    },
    leftSection: {
      flex: 1,
      maxWidth: isMobile ? "70%" : isTablet ? "50%" : "478px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    toggleButton: {
      display: isMobile ? "flex" : "none",
      width: "36px",
      height: "36px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#CDA1F8",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      cursor: "pointer",
    },
    searchContainer: {
  position: "relative",
  width: isMobile ? "92%" : "100%", // 92% on mobile, full width on tablet/desktop
  height: "38px",
},
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "16px",
      height: "16px",
      opacity: 0.6,
      pointerEvents: "none",
    },
    searchInput: {
      width: isMobile ? "92%" : "100%", 
      height: "38px",
      borderRadius: "6px",
      border: "1px solid #D9D9D9",
      padding: "10px 12px 10px 40px",
      fontSize: "14px",
      outline: "none",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : "24px",
    },
    notification: {
      width: "22px",
      height: "22px",
      cursor: "pointer",
      display: isMobile ? "none" : "block",
    },
    profileWrapper: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : "12px",
      cursor: "pointer",
    },
    profileInfo: {
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.2",
      textAlign: "right",
    },
    profileName: {
  fontSize: isMobile ? "12px" : "14px", // 12px on mobile, 14px on desktop/tablet
  fontWeight: "600",
  color: "#111",
},

profileRole: {
  fontSize: isMobile ? "10px" : "12px", // 10px on mobile, 12px on desktop/tablet
  color: "#666",
  marginTop: "2px",
},

    profileImage: {
      width: isMobile ? "30px" : "36px",
      height: isMobile ? "30px" : "36px",
      borderRadius: "50%",
      objectFit: "cover",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        {isMobile && (
          <div style={styles.toggleButton} onClick={onToggleSidebar}>
            ☰
          </div>
        )}

        <form onSubmit={handleSearch} style={styles.searchContainer}>
          <img src={SearchIcon} alt="Search" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </form>
      </div>

      <div style={styles.rightSection}>
        <img
          src={NotificationIcon}
          alt="Notifications"
          style={styles.notification}
        />
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
