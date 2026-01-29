import React, { useState, useEffect } from 'react';
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
  // Sample inquiry data
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
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilter, setShowFilter] = useState(false);
 const [selectedStatus, setSelectedStatus] = useState('New');

  
  // Responsive items per page
  const getItemsPerPage = () => {
    if (windowWidth < 640) return 5;
    if (windowWidth < 1024) return 7;
    return 10;
  };
  
  const itemsPerPage = getItemsPerPage();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    
    return matchesSearch ;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = filteredInquiries.slice(startIndex, endIndex);
  const totalInquiries = filteredInquiries.length;

  // Reset page when filters change
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchTerm, selectedStatus]);

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

  // Status options
  const statusOptions = [
  'New',
  'Contacted',
  'Closed',
  'Converted'
];


  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('-')) {
      const [day, month, year] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }
    if (dateString.includes('/')) {
      return dateString;
    }
    return dateString;
  };

  // CSS Styles with responsive adjustments
  const styles = {
    container: {
      padding: windowWidth < 640 ? '16px' : '42px',
      minHeight: '100vh',
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
    headerRow: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: windowWidth < 640 ? 'flex-start' : 'center',
      marginBottom: '24px',
      gap: windowWidth < 640 ? '16px' : '0',
    },
    headerText: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: windowWidth < 640 ? '24px' : windowWidth < 768 ? '26px' : '28px',
      fontWeight: 700,
      color: '#1E293B',
      margin: '0 0 8px 0',
      fontFamily: 'Montserrat',
    },
    subtitle: {
      fontSize: windowWidth < 640 ? '14px' : '16px',
      color: '#3F74E2',
      margin: 0,
      fontWeight: 500,
      fontFamily: 'Montserrat',
    },
    whiteSection: {
      width: '100%',
      maxWidth: '1111px',
      backgroundColor: 'white',
      borderRadius: '11px',
      border: '1px solid #E2E8F0',
      padding: windowWidth < 640 ? '16px' : '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      margin: '0 auto',
    },
    searchRow: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      alignItems: windowWidth < 640 ? 'stretch' : 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      gap: '16px',
    },
    searchContainer: {
      position: 'relative',
      flex: windowWidth < 640 ? '0 0 auto' : 1,
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
      width: windowWidth < 640 ? '100%' : '324px',
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
    controlsGroup: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      gap: '16px',
      alignItems: windowWidth < 640 ? 'stretch' : 'center',
    },
    filterContainer: {
      position: 'relative',
    },
    allFilterButton: {
      width: windowWidth < 640 ? '100%' : '208px',
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
    },
    filterDropdown: {
      position: 'absolute',
      top: '45px',
      right: 0,
      left: windowWidth < 640 ? 0 : 'auto',
      width: windowWidth < 640 ? '100%' : '208px',
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
    deleteButton: {
      width: windowWidth < 640 ? '100%' : '163px',
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
      textAlign: windowWidth < 640 ? 'center' : 'left',
    },
    tableContainer: {
      width: '100%',
      overflowX: 'auto',
      marginBottom: '24px',
      WebkitOverflowScrolling: 'touch',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      minWidth: windowWidth < 768 ? '800px' : '1100px',
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
    // Responsive table cells
    tableHeaderCell: {
      textAlign: 'left',
      fontSize: windowWidth < 640 ? '12px' : '14px',
      fontWeight: 600,
      color: '#374151',
      whiteSpace: 'nowrap',
      position: 'relative',
      fontFamily: 'Montserrat',
      height: '62px',
      boxSizing: 'border-box',
      borderRight: '1px solid #E5E7EB',
      padding: '8px 12px',
    },
    headerCellContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    checkboxHeaderCell: {
      width: windowWidth < 640 ? '30px' : '40px',
      minWidth: windowWidth < 640 ? '30px' : '40px',
      padding: '8px 8px',
    },
    checkboxCell: {
      width: windowWidth < 640 ? '30px' : '40px',
      minWidth: windowWidth < 640 ? '30px' : '40px',
      padding: '8px 8px',
      textAlign: 'center',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    nameHeaderCell: {
      width: windowWidth < 768 ? '150px' : '200px',
      minWidth: windowWidth < 768 ? '150px' : '200px',
    },
    nameCell: {
      width: windowWidth < 768 ? '150px' : '200px',
      minWidth: windowWidth < 768 ? '150px' : '200px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    emailHeaderCell: {
      width: windowWidth < 768 ? '180px' : '200px',
      minWidth: windowWidth < 768 ? '180px' : '200px',
    },
    emailCell: {
      width: windowWidth < 768 ? '180px' : '200px',
      minWidth: windowWidth < 768 ? '180px' : '200px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    messageHeaderCell: {
      width: windowWidth < 768 ? '200px' : '250px',
      minWidth: windowWidth < 768 ? '200px' : '250px',
    },
    messageCell: {
      width: windowWidth < 768 ? '200px' : '250px',
      minWidth: windowWidth < 768 ? '200px' : '250px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    phoneHeaderCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
    },
    phoneCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    dateHeaderCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
    },
    dateCell: {
      width: windowWidth < 768 ? '120px' : '150px',
      minWidth: windowWidth < 768 ? '120px' : '150px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 640 ? '13px' : '15px',
      lineHeight: '140%',
    },
    statusHeaderCell: {
      width: windowWidth < 768 ? '100px' : '150px',
      minWidth: windowWidth < 768 ? '100px' : '150px',
    },
    statusCell: {
      width: windowWidth < 768 ? '100px' : '150px',
      minWidth: windowWidth < 768 ? '100px' : '150px',
      padding: '8px 12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    actionsHeaderCell: {
      width: windowWidth < 768 ? '80px' : '120px',
      minWidth: windowWidth < 768 ? '80px' : '120px',
    },
    actionsCell: {
      width: windowWidth < 768 ? '80px' : '120px',
      minWidth: windowWidth < 768 ? '80px' : '120px',
      padding: '8px 12px',
      textAlign: 'center',
      borderTop: '1px solid #E5E7EB',
    },
    checkbox: {
      width: windowWidth < 640 ? '14px' : '16px',
      height: windowWidth < 640 ? '14px' : '16px',
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
      fontSize: windowWidth < 640 ? '12px' : '14px',
      fontWeight: 500,
      cursor: 'default',
      fontFamily: 'Montserrat',
      padding: windowWidth < 640 ? '6px 8px' : '8px 16px',
      width: windowWidth < 768 ? '80px' : '120px',
      height: windowWidth < 640 ? '30px' : '36px',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: windowWidth < 640 ? '6px' : '12px',
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
      minWidth: '32px',
      minHeight: '32px',
    },
    paginationContainer: {
      display: 'flex',
      flexDirection: windowWidth < 768 ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
      gap: windowWidth < 768 ? '16px' : '0',
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#64748B',
      fontFamily: 'Montserrat',
      textAlign: windowWidth < 768 ? 'center' : 'left',
      order: windowWidth < 768 ? 2 : 1,
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: windowWidth < 768 ? 'center' : 'flex-end',
      order: windowWidth < 768 ? 1 : 2,
    },
    paginationButton: {
      padding: windowWidth < 640 ? '6px 12px' : '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: windowWidth < 640 ? '12px' : '14px',
      color: '#374151',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      fontFamily: 'Montserrat',
      whiteSpace: 'nowrap',
    },
    disabledPaginationButton: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      cursor: 'not-allowed',
      borderColor: '#E5E7EB',
    },
    pageNumberButton: {
      minWidth: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: windowWidth < 640 ? '12px' : '14px',
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
      padding: '0 4px',
      color: '#6B7280',
      fontFamily: 'Montserrat',
    },
    // Modal styles - Responsive
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
      padding: windowWidth < 640 ? '8px' : '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: windowWidth < 640 ? '12px' : '20px',
      width: '100%',
      maxWidth: windowWidth < 640 ? '95%' : windowWidth < 768 ? '90%' : '781px',
      minHeight: windowWidth < 640 ? 'auto' : '655px',
      maxHeight: windowWidth < 640 ? '90vh' : 'none',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      border: '1px solid #E5E7EB',
      padding: windowWidth < 640 ? '12px 20px' : '15px 35px',
      display: 'flex',
      flexDirection: 'column',
      gap: windowWidth < 640 ? '12px' : '15px',
      overflowY: 'auto',
    },
    modalHeader: {
      padding: '0',
      borderBottom: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1,
    },
    modalTitle: {
      fontSize: windowWidth < 640 ? '20px' : '24px',
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
      padding: 0,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: windowWidth < 640 ? '12px' : '20px',
    },
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth < 640 ? '1fr' : '1fr 1fr',
      gap: windowWidth < 640 ? '12px' : '20px',
      marginBottom: windowWidth < 640 ? '12px' : '20px',
    },
    singleColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    fieldGroup: {
      marginBottom: 0,
    },
    fieldLabel: {
      fontSize: windowWidth < 640 ? '13px' : '14px',
      fontWeight: 600,
      color: '#6B7280',
      marginBottom: '6px',
      fontFamily: 'Montserrat',
      display: 'block',
    },
    fieldValue: {
      fontSize: windowWidth < 640 ? '14px' : '16px',
      color: '#1F2937',
      fontFamily: 'Montserrat',
      padding: windowWidth < 640 ? '10px 12px' : '12px 16px',
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      minHeight: windowWidth < 640 ? '40px' : '44px',
      display: 'flex',
      alignItems: 'center',
      wordBreak: 'break-word',
    },
    modalStatusButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: 'none',
      borderRadius: '9px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
      fontWeight: 500,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      padding: windowWidth < 640 ? '10px 12px' : '12px 16px',
      width: '100%',
      minHeight: windowWidth < 640 ? '40px' : '44px',
    },
    messageSection: {
      marginTop: windowWidth < 640 ? '8px' : '10px',
    },
    sectionTitle: {
      fontSize: windowWidth < 640 ? '16px' : '18px',
      fontWeight: 600,
      color: '#1E293B',
      margin: '0 0 8px 0',
      fontFamily: 'Montserrat',
    },
    messageBox: {
      backgroundColor: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: windowWidth < 640 ? '12px' : '16px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
      color: '#1F2937',
      fontFamily: 'Montserrat',
      lineHeight: '1.5',
      minHeight: windowWidth < 640 ? '80px' : '120px',
      flex: 1,
      wordBreak: 'break-word',
    },
    actionButtonsGroup: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      gap: windowWidth < 640 ? '12px' : '16px',
      marginTop: windowWidth < 640 ? '16px' : '24px',
      justifyContent: 'center',
    },
    callButton: {
      width: windowWidth < 640 ? '100%' : '230px',
      height: windowWidth < 640 ? '42px' : '46px',
      padding: '10px',
      backgroundColor: 'white',
      color: '#A237FF',
      border: '1px solid #A237FF',
      borderRadius: '7px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
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
      width: windowWidth < 640 ? '100%' : '230px',
      height: windowWidth < 640 ? '42px' : '46px',
      padding: '10px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '7px',
      fontSize: windowWidth < 640 ? '14px' : '16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'background-color 0.3s ease',
    },
    // Mobile table row styles for better touch
    mobileTableRow: {
      cursor: 'pointer',
    },
    // Responsive icons
    responsiveIcon: {
      width: windowWidth < 640 ? '14px' : '16px',
      height: windowWidth < 640 ? '14px' : '16px',
    },
  };

  // Generate page numbers for mobile
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = windowWidth < 640 ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
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

          <div style={styles.controlsGroup}>
            <div style={styles.filterContainer}>
              
              {showFilter && (
                <div style={styles.filterDropdown}>
                  {statusOptions.map((status) => (
                    <div
                      key={status}
                      style={{
                        ...styles.filterOption,
                        backgroundColor: status === selectedStatus ? '#F3F4F6' : 'white',
                      }}
                      onClick={() => {
                        setSelectedStatus(status);
                        setShowFilter(false);
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = status === selectedStatus ? '#F3F4F6' : 'white'}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
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
                style={styles.responsiveIcon}
                onError={(e) => e.target.style.display = 'none'}
              />
              Delete ({selectedInquiries.length})
            </button>
          </div>
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
                    <div>Name</div>
                  </div>
                </th>

                {/* Email */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.emailHeaderCell }}
                  onClick={() => handleSort('email')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Email</div>
                  </div>
                </th>

                {/* Message */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.messageHeaderCell }}
                  onClick={() => handleSort('message')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Message</div>
                  </div>
                </th>

                {/* Date */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.dateHeaderCell }}
                  onClick={() => handleSort('inquiryDate')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Date</div>
                  </div>
                </th>

                {/* Phone */}
                <th style={{ ...styles.tableHeaderCell, ...styles.phoneHeaderCell }}>
                  Phone
                </th>

                {/* Status */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.statusHeaderCell }}
                  onClick={() => handleSort('status')}
                >
                  <div style={styles.headerCellContent}>
                    <div>Status</div>
                  </div>
                </th>

                {/* Actions */}
                <th style={{ ...styles.tableHeaderCell, ...styles.actionsHeaderCell }}>
                  Actions
                </th>
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
                    <td style={styles.messageCell}>
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
                          aria-label="View inquiry"
                        >
                          <img src={ViewIcon} alt="View" style={styles.responsiveIcon} />
                        </button>
                        <button 
                          style={{ ...styles.actionButton, ...styles.deleteActionButton }}
                          onClick={() => handleDeleteSingle(inquiry.id)}
                          aria-label="Delete inquiry"
                        >
                          <img src={DeleteActionIcon} alt="Delete" style={styles.responsiveIcon} />
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
              aria-label="Previous page"
            >
              <img 
                src={PreviousIcon} 
                alt="Previous" 
                style={styles.responsiveIcon}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const span = document.createElement('span');
                  span.textContent = '←';
                  e.target.parentNode.appendChild(span);
                }}
              />
              {windowWidth >= 640 && 'Previous'}
            </button>

            {getPageNumbers().map((page, index) => (
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
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
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
              aria-label="Next page"
            >
              {windowWidth >= 640 && 'Next'}
              <img 
                src={NextIcon} 
                alt="Next" 
                style={styles.responsiveIcon}
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
                aria-label="Close modal"
              >
                <img 
                  src={CloseIcon} 
                  alt="Close" 
                  style={styles.responsiveIcon}
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
                    aria-label={`Change status from ${selectedInquiry.status}`}
                  >
                    <span>{selectedInquiry.status}</span>
                    <span style={{ fontSize: windowWidth < 640 ? '10px' : '12px' }}>▼</span>
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
                  aria-label={`Call ${selectedInquiry.phone}`}
                >
                  <img 
                    src={CallIcon} 
                    alt="Call" 
                    style={styles.responsiveIcon}
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
                  aria-label={`Email ${selectedInquiry.email}`}
                >
                  <img 
                    src={EmailIcon} 
                    alt="Email" 
                    style={styles.responsiveIcon}
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