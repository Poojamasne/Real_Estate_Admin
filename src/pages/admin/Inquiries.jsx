import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import SVG icons
import SearchIcon from '../../assets/icons/Search-property.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import ViewIcon from '../../assets/icons/eye-close.svg'; 
import PreviousIcon from '../../assets/icons/PreviousIcon.svg';
import NextIcon from '../../assets/icons/NextIcon.svg';
import AscendingIcon from '../../assets/icons/ChevronLeft.svg';
import DescendingIcon from '../../assets/icons/ChevronRight.svg';
import DeleteActionIcon from '../../assets/icons/Button (1).svg';
import CloseIcon from '../../assets/icons/close.svg';
import CallIcon from '../../assets/icons/call.svg';
import EmailIcon from '../../assets/icons/email.svg';
import StatusIcon from '../../assets/icons/ChevronRight.svg';

const Inquiries = () => {
  // Sample inquiry data based on the provided image
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: 'Riya Patil',
      email: 'riya.p@sumago.com',
      propertyInterested: 'Luxury Villa in Beverly Hills',
      phone: '91777877889',
      inquiryDate: '12-08-2026',
      status: 'Contacted',
      message: "I'm interested in Scheduling A Viewing For Property",
      deleteDate: '11-02-2026'
    },
    {
      id: 2,
      name: 'Rajesh Patil',
      email: 'shawtraders@yahoo.com',
      propertyInterested: 'Modern Downtown Apartment',
      phone: '91989898989',
      inquiryDate: '11-02-2026',
      status: 'New',
      message: 'Please send me more details about the apartment.',
      deleteDate: '11-02-2026'
    },
    {
      id: 3,
      name: 'Rakesh Shetty',
      email: 'guptasup@gmail.com',
      propertyInterested: 'Suburban Family Home',
      phone: '91777777777',
      inquiryDate: '10-02-2025',
      status: 'Closed',
      message: 'Can you provide floor plans?',
      deleteDate: '11-02-2025'
    },
    {
      id: 4,
      name: 'Kiran More',
      email: 'kmoretrans@gmail.com',
      propertyInterested: 'Mountain View Estate',
      phone: '91666666666',
      inquiryDate: '09-02-2026',
      status: 'New',
      message: 'I would like to schedule a virtual tour.',
      deleteDate: '11-02-2026'
    },
    {
      id: 5,
      name: 'Sunita Shah',
      email: 'sharmasteel@gmail.com',
      propertyInterested: 'Urban Loft',
      phone: '91555555555',
      inquiryDate: '08-02-2024',
      status: 'Contacted',
      message: 'Is there parking available?',
      deleteDate: '11-02-2024'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiries, setSelectedInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Sort inquiries
  const sortedInquiries = [...inquiries].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter inquiries based on search and status
  const filteredInquiries = sortedInquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.propertyInterested.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = filteredInquiries.slice(startIndex, endIndex);
  const totalInquiries = filteredInquiries.length;

  // Handle inquiry selection
  const handleSelectInquiry = (id) => {
    setSelectedInquiries(prev => 
      prev.includes(id) 
        ? prev.filter(inquiryId => inquiryId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedInquiries.length === currentInquiries.length) {
      setSelectedInquiries([]);
    } else {
      setSelectedInquiries(currentInquiries.map(inquiry => inquiry.id));
    }
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    if (selectedInquiries.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedInquiries.length} inquiry(ies)?`)) {
      setInquiries(prev => prev.filter(inquiry => !selectedInquiries.includes(inquiry.id)));
      setSelectedInquiries([]);
    }
  };

  // Handle delete single inquiry
  const handleDeleteSingle = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle view inquiry
  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  // Get status button styles based on status
  const getStatusButtonStyle = (status) => {
    switch(status) {
      case 'New': 
        return { 
          backgroundColor: '#E0ECFF', 
          color: '#272A2F',
          
        };
      case 'Contacted': 
        return { 
          backgroundColor: '#D4FFD4', 
          color: '#000000',
          
        };
      case 'Closed': 
        return { 
          backgroundColor: '#E5E5E5', 
          color: '#000000',
          
        };
      case 'Converted': 
        return { 
          backgroundColor: '#D4EDDA', 
          color: '#000000',
         
        };
      default: 
        return { 
          backgroundColor: '#E5E7EB', 
          color: '#000000',
          
        };
    }
  };

  // Status options for filter dropdown
  // const statusOptions = [
  //   'All Status',
  //   'New',
  //   'Contacted',
  //   'Follow-up',
  //   'Converted',
  //   'Lost',
  //   'Archived'
  // ];

 // Format date to display - FIXED VERSION
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Check if date contains '-' separator
  if (dateString.includes('-')) {
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  
  // If it already has '/' separator, return as is
  if (dateString.includes('/')) {
    return dateString;
  }
  
  return dateString;
};

  // CSS Styles
  const styles = {
    container: {
      padding: '24px',
      minHeight: '100vh',
      position: 'relative',
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    headerText: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1E293B',
      margin: '0 0 8px 0',
      fontFamily: 'Montserrat',
    },
    subtitle: {
      fontSize: '16px',
      color: '#3F74E2',
      margin: 0,
      fontWeight: 500,
      fontFamily: 'Montserrat',
    },
    whiteSection: {
      width: '1111px',
      backgroundColor: 'white',
      borderRadius: '11px',
      border: '1px solid #E2E8F0',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      margin: '0 auto',
    },
    searchRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      gap: '16px',
    },
    searchContainer: {
      position: 'relative',
      flex: 1,
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
    },
    searchInput: {
      width: '324px',
      height: '38px',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      padding: '10px 12px 10px 40px',
      fontSize: '14px',
      color: '#1E293B',
      outline: 'none',
      backgroundColor: 'white',
      fontFamily: 'Montserrat',
    },
    allFilterButton: {
      width: '208px',
      height: '39px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '5px',
      fontSize: '14px',
      color: '#475569',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      transition: 'border-color 0.3s ease',
      fontFamily: 'Montserrat',
      position: 'relative',
    },
    filterDropdown: {
      position: 'absolute',
      top: '45px',
      right: '0',
      width: '208px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    filterOption: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#475569',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'background-color 0.3s ease',
    },
    filterOptionHover: {
      backgroundColor: '#F3F4F6',
    },
    deleteButton: {
      width: '163px',
      height: '40px',
      backgroundColor: '#FF3C3C',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px',
      transition: 'background-color 0.3s ease',
      fontFamily: 'Montserrat',
    },
    disabledDeleteButton: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      cursor: 'not-allowed',
    },
    showingText: {
      fontSize: '14px',
      color: '#64748B',
      marginBottom: '16px',
      fontFamily: 'Montserrat',
    },
    tableContainer: {
      width: '100%',
      overflowY: 'auto',
      marginBottom: '24px',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      minWidth: '1100px',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeaderRow: {
      backgroundColor: '#F9FAFB',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      height: '62px',
    },
    tableHeaderCell: {
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: 600,
      color: '#374151',
      whiteSpace: 'nowrap',
      position: 'relative',
      fontFamily: 'Montserrat',
      height: '62px',
      boxSizing: 'border-box',
      borderRight: '1px solid #E5E7EB',
    },
    headerCellContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerTextContainer: {
      flex: 1,
    },
    sortIconsContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '8px',
    },
    // Checkbox column
    checkboxHeaderCell: {
      width: '40px',
      minWidth: '40px',
      padding: '8px 11px',
      textAlign: 'center',
      borderRight: '1px solid #E5E7EB',
    },
    checkboxCell: {
      width: '40px',
      minWidth: '40px',
      padding: '8px 11px',
      textAlign: 'center',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    // Name column
    nameHeaderCell: {
      width: '200px',
      minWidth: '200px',
      padding: '8px 8px 8px 11px',
      gap: '8px',
      borderRight: '1px solid #E5E7EB',
    },
    nameCell: {
      width: '200px',
      minWidth: '200px',
      padding: '8px 8px 8px 11px',
      gap: '8px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Email column
    emailHeaderCell: {
      width: '200px',
      minWidth: '200px',
      padding: '8px 15px',
      gap: '4px',
      borderRight: '1px solid #E5E7EB',
    },
    emailCell: {
      width: '200px',
      minWidth: '200px',
      padding: '8px 15px',
      gap: '4px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Property Interested column
    messageHeaderCell: {
      width: '250px',
      minWidth: '250px',
      padding: '8px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
    },
    messageCell: {
      width: '250px',
      minWidth: '250px',
      padding: '8px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Phone column
    phoneHeaderCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
    },
    phoneCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Inquiry Date column
    dateHeaderCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
    },
    dateCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Status column
    statusHeaderCell: {
      width: '150px',
      minWidth: '150px',
      padding: '10px 10px 10px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
    },
    statusCell: {
      width: '150px',
      minWidth: '150px',
      padding: '10px 10px 10px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    // Delete Date column
    deleteDateHeaderCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
    },
    deleteDateCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Actions column
    actionsHeaderCell: {
      width: '120px',
      minWidth: '120px',
      padding: '8px 15px',
      textAlign: 'center',
    },
    actionsCell: {
      width: '120px',
      minWidth: '120px',
      padding: '8px 15px',
      textAlign: 'center',
      borderTop: '1px solid #E5E7EB',
    },
    sortIcon: {
      width: '12px',
      height: '12px',
      cursor: 'pointer',
      opacity: 0.5,
      margin: '1px 0',
    },
    activeSortIcon: {
      opacity: 1,
    },
    checkbox: {
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      border: '2px solid #D1D5DB',
      cursor: 'pointer',
      accentColor: '#3B82F6',
    },
    statusButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '9px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'default',
      fontFamily: 'Montserrat',
      padding: '8px 16px',
      width: '120px',
      height: '36px',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
    actionButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewButton: {
      color: '#3B82F6',
    },
    deleteActionButton: {
      color: '#EF4444',
    },
    paginationContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#64748B',
      fontFamily: 'Montserrat',
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    paginationButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      fontFamily: 'Montserrat',
    },
    disabledPaginationButton: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      cursor: 'not-allowed',
      borderColor: '#E5E7EB',
    },
    pageNumberButton: {
      minWidth: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'Montserrat',
    },
    activePageNumber: {
      backgroundColor: '#3B82F6',
      color: 'white',
      borderColor: '#3B82F6',
    },
    ellipsis: {
      padding: '0 8px',
      color: '#6B7280',
      fontFamily: 'Montserrat',
    },
    // Modal styles - UPDATED
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '20px',
      width: '781px',
      minHeight: '655px',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      border: '1px solid #E5E7EB',
      padding: '15px 35px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    modalHeader: {
      padding: '0',
      borderBottom: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#1E293B',
      margin: 0,
      fontFamily: 'Montserrat',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s ease',
    },
    modalBody: {
      padding: '0',
      flex: 1,
      flexDirection: 'column',
    },
    viewSection: {
      marginBottom: 0,
    },
    fieldGroup: {
      marginBottom: '20px',
    },
    fieldLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#6B7280',
      marginBottom: '8px',
      fontFamily: 'Montserrat',
      display: 'block',
    },
    fieldValue: {
      fontSize: '16px',
      color: '#1F2937',
      fontFamily: 'Montserrat',
      padding: '12px 16px',
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
    },
    statusDropdown: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#1F2937',
      fontFamily: 'Montserrat',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 16px center',
      paddingRight: '40px',
    },
    messageBox: {
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '16px',
      fontSize: '16px',
      color: '#1F2937',
      fontFamily: 'Montserrat',
      lineHeight: '1.5',
      minHeight: '120px',
      flex: 1,
    },
    actionButtonsGroup: {
      display: 'flex',
      gap: '16px',
      marginTop: '24px',
      justifyContent: 'center',
    },
    callButton: {
      width: '230px',
      height: '46px',
      padding: '10px',
      backgroundColor: 'white',
      color: '#A237FF',
      border: '1px solid #A237FF',
      borderRadius: '7px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    emailButton: {
      width: '230px',
      height: '46px',
      padding: '10px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '7px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'background-color 0.3s ease',
    },
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    singleColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    messageSection: {
      marginTop: '10px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1E293B',
      margin: '0 0 12px 0',
      fontFamily: 'Montserrat',
    },
    modalStatusButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: 'none',
      borderRadius: '9px',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      padding: '12px 16px',
      width: '100%',
      minHeight: '44px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <div style={styles.headerText}>
          <h1 style={styles.title}>Inquiry Management</h1>
          <p style={styles.subtitle}>Manage customer inquiries and leads</p>
        </div>
      </div>

      {/* White Section */}
      <div style={styles.whiteSection}>
        {/* Search and Filter Row */}
        <div style={styles.searchRow}>
          <div style={styles.searchContainer}>
            <img 
              src={SearchIcon} 
              alt="Search" 
              style={styles.searchIcon}
              onError={(e) => e.target.style.display = 'none'}
            />
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={handleDeleteSelected}
            disabled={selectedInquiries.length === 0}
            style={{
              ...styles.deleteButton,
              ...(selectedInquiries.length === 0 && styles.disabledDeleteButton),
            }}
            onMouseEnter={(e) => {
              if (selectedInquiries.length > 0) {
                e.target.style.backgroundColor = '#DC2626';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedInquiries.length > 0) {
                e.target.style.backgroundColor = '#FF3C3C';
              }
            }}
          >
            <img 
              src={DeleteIcon} 
              alt="Delete" 
              style={{ width: '16px', height: '16px' }}
              onError={(e) => e.target.style.display = 'none'}
            />
            Delete ({selectedInquiries.length})
          </button>

          <div style={{ position: 'relative' }}>
          
          </div>
        </div>

        {/* Showing text */}
        <div style={styles.showingText}>
          Showing {startIndex + 1} - {Math.min(endIndex, totalInquiries)} out of {totalInquiries}
        </div>

        {/* Table Container with Scroll and Grid Lines */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeaderRow}>
  <tr>
    {/* Checkbox Column */}
    <th style={{ ...styles.tableHeaderCell, ...styles.checkboxHeaderCell }}>
      <input
        type="checkbox"
        style={styles.checkbox}
        checked={selectedInquiries.length === currentInquiries.length && currentInquiries.length > 0}
        onChange={handleSelectAll}
      />
    </th>

    {/* Name */}
    <th 
      style={{ ...styles.tableHeaderCell, ...styles.nameHeaderCell }}
      onClick={() => handleSort('name')}
    >
      <div style={styles.headerCellContent}>
        <div style={styles.headerTextContainer}>Name</div>
      </div>
    </th>

    {/* Email */}
    <th 
      style={{ ...styles.tableHeaderCell, ...styles.emailHeaderCell }}
      onClick={() => handleSort('email')}
    >
      <div style={styles.headerCellContent}>
        <div style={styles.headerTextContainer}>Email</div>
      </div>
    </th>

    {/* Message */}
    <th 
    style={{ ...styles.tableHeaderCell, ...styles.messageHeaderCell }}
    onClick={() => handleSort('message')}
    >
      <div style={styles.headerCellContent}>
        <div style={styles.headerTextContainer}>Message</div>
      </div>
    </th>

    {/* Date */}
    <th 
      style={{ ...styles.tableHeaderCell, ...styles.dateHeaderCell }}
      onClick={() => handleSort('inquiryDate')}
    >
      <div style={styles.headerCellContent}>
        <div style={styles.headerTextContainer}>Date</div>
      </div>
    </th>

    {/* Phone */}
    <th style={{ ...styles.tableHeaderCell, ...styles.phoneHeaderCell }}>Phone</th>

    {/* Status */}
    <th 
      style={{ ...styles.tableHeaderCell, ...styles.statusHeaderCell }}
      onClick={() => handleSort('status')}
    >
      <div style={styles.headerCellContent}>
        <div style={styles.headerTextContainer}>Status</div>
      </div>
    </th>

    {/* Actions */}
    <th style={{ ...styles.tableHeaderCell, ...styles.actionsHeaderCell }}>Actions</th>
  </tr>
</thead>

            <tbody>
  {currentInquiries.map((inquiry) => {
    const statusStyle = getStatusButtonStyle(inquiry.status);
    return (
      <tr key={inquiry.id} style={{ height: '62px' }}>
        {/* Checkbox */}
        <td style={styles.checkboxCell}>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={selectedInquiries.includes(inquiry.id)}
            onChange={() => handleSelectInquiry(inquiry.id)}
          />
        </td>

        {/* Name */}
        <td style={styles.nameCell}>{inquiry.name}</td>

        {/* Email */}
        <td style={styles.emailCell}>{inquiry.email}</td>

        {/* Message */}
        <td style={{ padding: '8px 15px', borderRight: '1px solid #E5E7EB', borderTop: '1px solid #E5E7EB' }}>
          {inquiry.message.length > 50 ? inquiry.message.substring(0, 50) + "..." : inquiry.message}
        </td>

        {/* Date */}
        <td style={styles.dateCell}>{formatDate(inquiry.inquiryDate)}</td>

        {/* Phone */}
        <td style={styles.phoneCell}>{inquiry.phone}</td>

        {/* Status */}
        <td style={styles.statusCell}>
          <div style={{ ...styles.statusButton, ...statusStyle }}>{inquiry.status}</div>
        </td>

        {/* Actions */}
        <td style={styles.actionsCell}>
          <div style={styles.actionsContainer}>
            <button 
              style={{ ...styles.actionButton, ...styles.viewButton }}
              onClick={() => handleViewInquiry(inquiry)}
            >
              <img src={ViewIcon} alt="View" style={{ width: '18px', height: '18px' }} />
            </button>
            <button 
              style={{ ...styles.actionButton, ...styles.deleteActionButton }}
              onClick={() => handleDeleteSingle(inquiry.id)}
            >
              <img src={DeleteActionIcon} alt="Delete" style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>

        {/* Pagination */}
        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            Showing {startIndex + 1} - {Math.min(endIndex, totalInquiries)} out of {totalInquiries}
          </div>
          
          <div style={styles.paginationControls}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 && styles.disabledPaginationButton),
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) e.target.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) e.target.style.backgroundColor = 'white';
              }}
            >
              <img 
                src={PreviousIcon} 
                alt="Previous" 
                style={{ width: '16px', height: '16px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const span = document.createElement('span');
                  span.textContent = '←';
                  e.target.parentNode.appendChild(span);
                }}
              />
              Previous
            </button>

            {[1, 2, '...', 9, 10].map((page, index) => (
              page === '...' ? (
                <span key={index} style={styles.ellipsis}>...</span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  style={{
                    ...styles.pageNumberButton,
                    ...(currentPage === page && styles.activePageNumber),
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) e.target.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== page) e.target.style.backgroundColor = 'white';
                  }}
                >
                  {page}
                </button>
              )
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages && styles.disabledPaginationButton),
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) e.target.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) e.target.style.backgroundColor = 'white';
              }}
            >
              Next
              <img 
                src={NextIcon} 
                alt="Next" 
                style={{ width: '16px', height: '16px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const span = document.createElement('span');
                  span.textContent = '→';
                  e.target.parentNode.appendChild(span);
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for View Inquiry Details */}
      {showModal && selectedInquiry && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Inquiry Details</h2>
              <button 
                style={styles.closeButton}
                onClick={handleCloseModal}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <img 
                  src={CloseIcon} 
                  alt="Close" 
                  style={{ width: '20px', height: '20px' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const span = document.createElement('span');
                    span.textContent = '×';
                    span.style.fontSize = '24px';
                    e.target.parentNode.appendChild(span);
                  }}
                />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              {/* First row with Customer Name and Property Interested */}
              <div style={styles.twoColumnGrid}>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Customer Name</label>
                  <div style={styles.fieldValue}>{selectedInquiry.name}</div>
                </div>
                
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Property Interested</label>
                  <div style={styles.fieldValue}>{selectedInquiry.propertyInterested}</div>
                </div>
              </div>
              
              {/* Second row with Email ID and Phone Number */}
              <div style={styles.twoColumnGrid}>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Email ID</label>
                  <div style={styles.fieldValue}>{selectedInquiry.email}</div>
                </div>
                
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Phone Number</label>
                  <div style={styles.fieldValue}>{selectedInquiry.phone}</div>
                </div>
              </div>
              
              {/* Third row with Inquiry Date and Status */}
              <div style={styles.twoColumnGrid}>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Inquiry Date</label>
                  <div style={styles.fieldValue}>{formatDate(selectedInquiry.inquiryDate)}</div>
                </div>
                
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Status</label>
                  <button 
                    style={{
                      ...styles.modalStatusButton,
                      ...getStatusButtonStyle(selectedInquiry.status),
                      justifyContent: 'space-between',
                    }}
                    onClick={() => {
                      const statuses = ['New', 'Contacted', 'Closed', 'Converted'];
const currentIndex = statuses.indexOf(selectedInquiry.status);
const newStatus = statuses[(currentIndex + 1) % statuses.length];

                      
                      const updatedInquiries = inquiries.map(inquiry => 
                        inquiry.id === selectedInquiry.id 
                          ? { ...inquiry, status: newStatus }
                          : inquiry
                      );
                      setInquiries(updatedInquiries);
                      setSelectedInquiry({...selectedInquiry, status: newStatus});
                    }}
                  >
                    <span>{selectedInquiry.status}</span>
                    <span style={{ fontSize: '12px' }}>▼</span>
                  </button>
                </div>
              </div>

              {/* Message section - single column */}
              <div style={styles.messageSection}>
                <h3 style={styles.sectionTitle}>Message</h3>
                <div style={styles.messageBox}>
                  {selectedInquiry.message}
                </div>
              </div>
              
              {/* Action buttons */}
              <div style={styles.actionButtonsGroup}>
                <button
                  type="button"
                  style={styles.callButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F5F0FF';
                    e.target.style.borderColor = '#8B1FFF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#A237FF';
                  }}
                  onClick={() => window.location.href = `tel:${selectedInquiry.phone}`}
                >
                  <img 
                    src={CallIcon} 
                    alt="Call" 
                    style={{ width: '16px', height: '16px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = '📞';
                      e.target.parentNode.appendChild(span);
                    }}
                  />
                  Call Customer
                </button>
                <button
                  type="button"
                  style={styles.emailButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#8B1FFF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#A237FF'}
                  onClick={() => window.location.href = `mailto:${selectedInquiry.email}`}
                >
                  <img 
                    src={EmailIcon} 
                    alt="Email" 
                    style={{ width: '16px', height: '16px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = '✉️';
                      e.target.parentNode.appendChild(span);
                    }}
                  />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;