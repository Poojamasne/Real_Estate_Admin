import React, { useState, useEffect } from "react";

// Icons
import TotalPropertiesIcon from "../../assets/icons/Total Properties1.svg";
import TotalInquiriesIcon from "../../assets/icons/Total Inquiries1.svg";
import AvailablePropertiesIcon from "../../assets/icons/Available Properties1.svg";
import ActiveLeadsIcon from "../../assets/icons/Active Leads1.svg";

// Sample data
const SAMPLE_STATS = [
  {
    id: 1,
    title: "Total Properties",
    value: 21,
    change: "+12% from last month",
    icon: TotalPropertiesIcon,
    bgColor: "#B4F8FF",
  },
  {
    id: 2,
    title: "Total Inquiries",
    value: 12,
    change: "+8% from last month",
    icon: TotalInquiriesIcon,
    bgColor: "#B4FFD9",
  },
  {
    id: 3,
    title: "Available Properties",
    value: 15,
    change: "6 properties",
    icon: AvailablePropertiesIcon,
    bgColor: "#FFE8B4",
  },
  {
    id: 4,
    title: "Active Leads",
    value: 10,
    change: "Pending follow-up",
    icon: ActiveLeadsIcon,
    bgColor: "#B4FFD9",
  },
];

const SAMPLE_RECENT_INQUIRIES = [
  { id: 1, name: "Rahul Jagtap", property: "Luxury Villa in Beverly Hills", status: "Contacted" },
  { id: 2, name: "Ganesh Sharma", property: "Modern Downtown Apartment", status: "New" },
  { id: 3, name: "Ajay Gupta", property: "Suburban Family Home", status: "Closed" },
];

const SAMPLE_RECENT_PROPERTIES = [
  { id: 1, name: "Luxury Villa in Beverly Hills", date: "Jan 15, 2026", price: "₹2 Crore", status: "Available" },
  { id: 2, name: "Modern Downtown Apartment", date: "Jan 14, 2026", price: "₹85 Lakh", status: "Available" },
  { id: 3, name: "Contemporary 3 BHK Apartment", date: "Jan 12, 2026", price: "₹18k", status: "Rented" },
];

const Dashboard = () => {
  // Initialize state from localStorage or use defaults
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('dashboardStats');
    return savedStats ? JSON.parse(savedStats) : SAMPLE_STATS;
  });

  const [recentInquiries, setRecentInquiries] = useState(() => {
    const savedInquiries = localStorage.getItem('dashboardRecentInquiries');
    return savedInquiries ? JSON.parse(savedInquiries) : SAMPLE_RECENT_INQUIRIES;
  });

  const [recentProperties, setRecentProperties] = useState(() => {
    const savedProperties = localStorage.getItem('dashboardRecentProperties');
    return savedProperties ? JSON.parse(savedProperties) : SAMPLE_RECENT_PROPERTIES;
  });

  // Calculate stats from actual data in localStorage
  useEffect(() => {
    const updateDashboardData = () => {
      try {
        // Get properties data from localStorage
        const propertiesData = localStorage.getItem('properties');
        const inquiriesData = localStorage.getItem('inquiries');
        
        let calculatedStats = [...stats];
        let calculatedRecentInquiries = [...recentInquiries];
        let calculatedRecentProperties = [...recentProperties];

        // Update stats based on actual data
        if (propertiesData) {
          const properties = JSON.parse(propertiesData);
          
          // Total Properties
          calculatedStats[0].value = properties.length;
          calculatedStats[0].change = `+${properties.length - SAMPLE_STATS[0].value} from sample`;
          
          // Available Properties
          const availableProperties = properties.filter(p => p.status === 'Available');
          calculatedStats[2].value = availableProperties.length;
          calculatedStats[2].change = `${availableProperties.length} properties`;
          
          // Update recent properties from actual data
          const sortedProperties = [...properties]
            .sort((a, b) => new Date(b.addedDate.split('-').reverse().join('-')) - new Date(a.addedDate.split('-').reverse().join('-')))
            .slice(0, 3);
          
          calculatedRecentProperties = sortedProperties.map((prop, index) => ({
            id: prop.id || index + 1,
            name: prop.name,
            date: prop.addedDate,
            price: prop.price,
            status: prop.status
          }));
          
          setRecentProperties(calculatedRecentProperties);
        }

        if (inquiriesData) {
          const inquiries = JSON.parse(inquiriesData);
          
          // Total Inquiries
          calculatedStats[1].value = inquiries.length;
          calculatedStats[1].change = `+${inquiries.length - SAMPLE_STATS[1].value} from sample`;
          
          // Active Leads (New + Contacted inquiries)
          const activeLeads = inquiries.filter(i => i.status === 'New' || i.status === 'Contacted');
          calculatedStats[3].value = activeLeads.length;
          calculatedStats[3].change = `${activeLeads.length} leads`;
          
          // Update recent inquiries from actual data
          const sortedInquiries = [...inquiries]
            .sort((a, b) => new Date(b.inquiryDate.split('-').reverse().join('-')) - new Date(a.inquiryDate.split('-').reverse().join('-')))
            .slice(0, 3);
          
          calculatedRecentInquiries = sortedInquiries.map((inq, index) => ({
            id: inq.id || index + 1,
            name: inq.name,
            property: inq.propertyInterested,
            status: inq.status
          }));
          
          setRecentInquiries(calculatedRecentInquiries);
        }

        setStats(calculatedStats);
        
        // Save updated data to localStorage
        localStorage.setItem('dashboardStats', JSON.stringify(calculatedStats));
        localStorage.setItem('dashboardRecentInquiries', JSON.stringify(calculatedRecentInquiries));
        localStorage.setItem('dashboardRecentProperties', JSON.stringify(calculatedRecentProperties));

      } catch (error) {
        console.error('Error updating dashboard data:', error);
      }
    };

    updateDashboardData();
    
    // Listen for changes in properties and inquiries
    const handleStorageChange = (e) => {
      if (e.key === 'properties' || e.key === 'inquiries') {
        updateDashboardData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    
    const intervalId = setInterval(updateDashboardData, 5000); // Update every 5 seconds
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('dashboardStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('dashboardRecentInquiries', JSON.stringify(recentInquiries));
  }, [recentInquiries]);

  useEffect(() => {
    localStorage.setItem('dashboardRecentProperties', JSON.stringify(recentProperties));
  }, [recentProperties]);

  const styles = {
    container: { 
      padding: "20px",
      maxWidth: "100%",
      overflowX: "hidden",
      boxSizing: "border-box"
    },

    /* Welcome */
    welcomeTitle: { 
      fontSize: "clamp(20px, 5vw, 24px)", 
      fontWeight: 700,
      marginBottom: "8px"
    },
    welcomeSubtitle: { 
      fontSize: "clamp(12px, 3vw, 14px)", 
      color: "#666", 
      marginBottom: "30px" 
    },

    /* Stats */
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    statCard: {
      background: "#fff",
      borderRadius: "15px",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      minHeight: "120px",
      boxSizing: "border-box"
    },
    statIconBox: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: "#F4F6FA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginLeft: "15px"
    },
    statContent: {
      flex: 1,
      minWidth: 0
    },
    statTitle: { 
      fontSize: "clamp(12px, 2.5vw, 13px)", 
      color: "#666",
      marginBottom: "8px"
    },
    statValue: { 
      fontSize: "clamp(22px, 4vw, 28px)", 
      fontWeight: 700,
      marginBottom: "4px"
    },
    statChange: { 
      fontSize: "clamp(11px, 2.5vw, 12px)", 
      color: "#666" 
    },

    /* Tables */
    tableCard: {
      background: "#fff",
      borderRadius: "15px",
      padding: "clamp(20px, 3vw, 30px)",
      border: "1px solid #E0E0E0",
      marginBottom: "30px",
      width: "100%",
      overflowX: "auto",
      boxSizing: "border-box"
    },
    tableTitle: { 
      fontSize: "clamp(14px, 3vw, 16px)", 
      fontWeight: 600, 
      marginBottom: "20px" 
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      minWidth: "600px",
    },
    th: {
      padding: "clamp(12px, 3vw, 14px) clamp(15px, 3vw, 20px)",
      fontSize: "clamp(11px, 2.5vw, 12px)",
      fontWeight: 600,
      background: "#EBF2FF",
      color: "#666",
      textAlign: "left",
      whiteSpace: "nowrap"
    },
    td: {
      padding: "clamp(12px, 3vw, 14px) clamp(15px, 3vw, 20px)",
      fontSize: "clamp(13px, 2.5vw, 14px)",
      verticalAlign: "middle",
      wordBreak: "break-word"
    },

    /* Properties Card */
    propertyCard: {
      background: "#EBF2FF",
      borderRadius: "10px",
      padding: "clamp(12px, 3vw, 15px) clamp(15px, 3vw, 20px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "10px"
    },
    propertyInfo: {
      flex: 1,
      minWidth: "250px"
    },
    propertyName: { 
      fontWeight: 600, 
      fontSize: "clamp(14px, 3vw, 16px)",
      marginBottom: "4px"
    },
    propertyDate: { 
      fontSize: "clamp(11px, 2.5vw, 12px)", 
      color: "#6B7280" 
    },
    propertyPriceStatus: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(15px, 4vw, 30px)",
      flexWrap: "wrap"
    },
    propertyPrice: { 
      fontWeight: "500", 
      fontSize: "clamp(14px, 3vw, 16px)",
      whiteSpace: "nowrap"
    },
    statusButton: (status) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "clamp(90px, 15vw, 110px)",
      height: "clamp(35px, 8vw, 40px)",
      borderRadius: "8px",
      padding: "0 clamp(15px, 3vw, 20px)",
      background: status === "Available" ? "#C5FAC9" : "#C5D6FA",
      fontWeight: 500,
      fontSize: "clamp(13px, 2.5vw, 14px)",
      whiteSpace: "nowrap"
    }),
    inquiryStatusButton: (status) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "clamp(90px, 15vw, 105px)",
      height: "clamp(38px, 8vw, 43px)",
      borderRadius: "6px",
      padding: "clamp(8px, 2vw, 10px)",
      fontWeight: 500,
      fontSize: "clamp(13px, 2.5vw, 14px)",
      background: status === "Contacted" ? "#D4FFD4" : status === "New" ? "#E0ECFF" : "#E5E5E5",
      whiteSpace: "nowrap"
    }),

    /* Reset button */
    resetButton: {
      backgroundColor: '#f0f0f0',
      color: '#333',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '8px 16px',
      marginBottom: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.3s ease',
    },

    /* Refresh button */
    refreshButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 16px',
      marginBottom: '20px',
      marginLeft: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.3s ease',
    },

    /* Media query styles for mobile */
    mobileStyles: {
      "@media (max-width: 768px)": {
        statsGrid: {
          gridTemplateColumns: "1fr",
          gap: "15px"
        },
        statCard: {
          padding: "15px",
          minHeight: "100px"
        },
        propertyCard: {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "15px"
        },
        propertyInfo: {
          minWidth: "100%"
        },
        propertyPriceStatus: {
          width: "100%",
          justifyContent: "space-between"
        }
      },
      "@media (max-width: 480px)": {
        container: {
          padding: "15px"
        },
        tableCard: {
          padding: "15px",
          borderRadius: "12px"
        },
        propertyCard: {
          padding: "12px 15px"
        }
      }
    }
  };


  

  return (
    <div style={styles.container}>
      {/* Welcome */}
      <div style={styles.welcomeTitle}>Welcome Admin</div>
      <div style={styles.welcomeSubtitle}>
        Here's a snapshot of your learning ecosystem today.
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.id} style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={styles.statTitle}>{s.title}</div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statChange}>{s.change}</div>
            </div>
            <div
              style={{
                ...styles.statIconBox,
                background: s.bgColor,
              }}
            >
              <img src={s.icon} alt="" width={24} height={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div style={styles.tableCard}>
        <div style={styles.tableTitle}>Recent Inquiries</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, borderRadius: "10px 0 0 10px" }}>Name</th>
              <th style={styles.th}>Properties</th>
              <th style={{ ...styles.th, borderRadius: "0 10px 10px 0" }}>Inquiries</th>
            </tr>
          </thead>
          <tbody>
            {recentInquiries.map((row, index) => (
              <tr key={row.id}>
                <td style={{ 
                  ...styles.td, 
                  borderTopLeftRadius: index === 0 ? "10px" : "0",
                  borderBottomLeftRadius: index === recentInquiries.length - 1 ? "10px" : "0"
                }}>
                  {row.name}
                </td>
                <td style={styles.td}>
                  {row.property}
                </td>
                <td style={{ 
                  ...styles.td, 
                  borderTopRightRadius: index === 0 ? "10px" : "0",
                  borderBottomRightRadius: index === recentInquiries.length - 1 ? "10px" : "0"
                }}>
                  <span style={styles.inquiryStatusButton(row.status)}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recently Added Properties */}
      <div style={styles.tableCard}>
        <div style={styles.tableTitle}>Recently Added Properties</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recentProperties.map((row) => (
            <div key={row.id} style={styles.propertyCard}>
              <div style={styles.propertyInfo}>
                <div style={styles.propertyName}>{row.name}</div>
                <div style={styles.propertyDate}>{row.date}</div>
              </div>
              <div style={styles.propertyPriceStatus}>
                <div style={styles.propertyPrice}>
                  {row.price}
                </div>
                <span style={styles.statusButton(row.status)}>
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;