import React, { useState, useEffect } from 'react';

// Import SVG icons
import SearchIcon from '../../assets/icons/Search-property.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import PreviousIcon from '../../assets/icons/PreviousIcon.svg';
import NextIcon from '../../assets/icons/NextIcon.svg';
import AscendingIcon from '../../assets/icons/ChevronLeft.svg';
import DescendingIcon from '../../assets/icons/ChevronRight.svg';
import DeleteActionIcon from '../../assets/icons/Button (1).svg';
import CloseIcon from '../../assets/icons/close.svg'; 

const Properties = () => {
  // Sample property data with all required fields
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Luxury Villa in Beverly Hills',
      location: 'Baner, Pune',
      price: '₹ 70 Lakh',
      details: '3,000 sq ft 3 BHK Villa',
      status: 'Available',
      addedDate: '11/02/2026'
    },
    {
      id: 2,
      name: 'Modern Downtown Apartment',
      location: 'Shingada Road, Suncity',
      price: '₹ 85 Lakh',
      details: '1,300 sq ft Apartment',
      status: 'Rented',
      addedDate: '11/02/2026'
    },
    {
      id: 3,
      name: 'Suburban Family Home',
      location: 'Thane Maharashtra',
      price: '₹ 70 Lakh',
      details: '3,000 sq ft 3 BHK Villa',
      status: 'Sold',
      addedDate: '11/02/2026'
    },
    {
      id: 4,
      name: 'Mountain View Estate',
      location: 'Wakad, Pune',
      price: '₹ 2 Crore',
      details: '1,300 sq ft Apartment',
      status: 'Available',
      addedDate: '11/02/2026'
    },
    {
      id: 5,
      name: 'Urban Loft',
      location: 'Hinjewadi, Pune',
      price: '₹ 70 Lakh',
      details: '2,500 sq ft Commercial',
      status: 'Rented',
      addedDate: '11/02/2026'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    bedrooms: '',
    area: '',
    status: 'Available',
    description: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card' for mobile

  // Responsive items per page
  const itemsPerPage = windowWidth < 768 ? 5 : 10;

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Switch to card view on very small screens
      if (window.innerWidth < 640) {
        setViewMode('card');
      } else if (window.innerWidth < 1024 && viewMode === 'card') {
        setViewMode('table');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  // Sort properties
  const sortedProperties = [...properties].sort((a, b) => {
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

  // Filter properties based on search and status
  const filteredProperties = sortedProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);
  const totalProperties = filteredProperties.length;

  // Helper functions
  const handleSelectProperty = (id) => {
    setSelectedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propertyId => propertyId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === currentProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(currentProperties.map(property => property.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProperties.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProperties.length} property(ies)?`)) {
      setProperties(prev => prev.filter(property => !selectedProperties.includes(property.id)));
      setSelectedProperties([]);
    }
  };

  const handleDeleteSingle = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(property => property.id !== id));
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setShowFilterDropdown(false);
    setCurrentPage(1);
  };

  const handleAddPropertyClick = () => {
    setModalType('add');
    setFormData({
      name: '',
      price: '',
      location: '',
      bedrooms: '',
      area: '',
      status: 'Available',
      description: ''
    });
    setUploadedFiles([]);
    setShowModal(true);
  };

  const handleEditPropertyClick = (property) => {
    setModalType('edit');
    setEditingProperty(property);
    setFormData({
      name: property.name,
      price: property.price.replace('₹ ', ''),
      location: property.location,
      bedrooms: '',
      area: property.details.split(' sq ft')[0],
      status: property.status,
      description: ''
    });
    setUploadedFiles([]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProperty(null);
    setUploadedFiles([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      const newProperty = {
        id: properties.length + 1,
        name: formData.name,
        location: formData.location,
        price: `₹ ${formData.price}`,
        details: `${formData.area} sq ft ${formData.bedrooms} BHK Villa`,
        status: formData.status,
        addedDate: new Date().toLocaleDateString('en-GB')
      };
      
      setProperties(prev => [...prev, newProperty]);
    } else {
      setProperties(prev => prev.map(property => 
        property.id === editingProperty.id 
          ? {
              ...property,
              name: formData.name,
              location: formData.location,
              price: `₹ ${formData.price}`,
              details: `${formData.area} sq ft ${formData.bedrooms} BHK Villa`,
              status: formData.status
            }
          : property
      ));
    }
    
    handleCloseModal();
  };

  // File upload handlers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setUploadedFiles(prev => [...prev, ...imageFiles]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusButtonStyle = (status) => {
    switch(status) {
      case 'Available': 
        return { 
          backgroundColor: '#C5FAC9', 
          color: '#151816',
          borderRadius: '9px',
          gap: '10px'
        };
      case 'Rented': 
        return { 
          backgroundColor: '#E9F8FF', 
          color: '#272A2F',
          borderRadius: '9px',
          gap: '10px'
        };
      case 'Sold': 
        return { 
          backgroundColor: '#FFBBBB', 
          color: '#282425',
          borderRadius: '9px',
          gap: '10px'
        };
      default: 
        return { 
          backgroundColor: '#E5E7EB', 
          color: '#374151',
          borderRadius: '9px',
          gap: '10px'
        };
    }
  };

  // Filter options
  const filterOptions = ['All Status', 'Available', 'Rented', 'Sold'];

  // Generate responsive page numbers
  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };

  // Responsive Styles
  const styles = {
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: windowWidth < 768 ? '16px' : '14px',
      flexWrap: 'wrap',
      gap: windowWidth < 768 ? '12px' : '0',
    },
    mobileHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: windowWidth < 768 ? '12px' : '0',
    },
    headerText: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: windowWidth < 768 ? '20px' : windowWidth < 1024 ? '24px' : '28px',
      fontWeight: 700,
      color: '#1E293B',
      margin: '0 0 4px 0',
      fontFamily: 'Montserrat',
    },
    subtitle: {
      fontSize: windowWidth < 768 ? '12px' : '14px',
      color: '#3F74E2',
      margin: 0,
      fontWeight: 500,
      fontFamily: 'Montserrat',
    },
    addPropertyButton: {
      width: windowWidth < 768 ? '140px' : '183px',
      height: windowWidth < 768 ? '40px' : '46px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '7px',
      fontSize: windowWidth < 768 ? '12px' : '14px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '8px 12px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
      fontFamily: 'Montserrat',
    },
    whiteSection: {
      width: '100%',
      maxWidth: '1111px',
      backgroundColor: 'white',
      borderRadius: '11px',
      border: '1px solid #E2E8F0',
      padding: windowWidth < 768 ? '16px' : '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      margin: '0 auto',
    },
    searchRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: windowWidth < 768 ? '16px' : '24px',
      gap: '12px',
      flexWrap: windowWidth < 640 ? 'wrap' : 'nowrap',
      position: 'relative',
    },
    searchContainer: {
      position: 'relative',
      flex: windowWidth < 640 ? '1 0 100%' : '1',
      order: windowWidth < 640 ? 1 : 0,
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
      width: '100%',
      height: windowWidth < 768 ? '36px' : '38px',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      padding: '8px 12px 8px 40px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      color: '#1E293B',
      outline: 'none',
      backgroundColor: 'white',
      fontFamily: 'Montserrat',
    },
    filterButtonContainer: {
      position: 'relative',
      order: windowWidth < 640 ? 2 : 0,
      flex: windowWidth < 640 ? '1 0 calc(50% - 6px)' : 'none',
    },
    allFilterButton: {
      width: windowWidth < 768 ? '100%' : '208px',
      height: windowWidth < 768 ? '36px' : '39px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '5px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      color: '#475569',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      transition: 'border-color 0.3s ease',
      fontFamily: 'Montserrat',
      position: 'relative',
    },
    filterDropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      left: windowWidth < 640 ? 0 : 'auto',
      marginTop: '4px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 100,
      minWidth: windowWidth < 640 ? '100%' : '200px',
      overflow: 'hidden',
    },
    filterOption: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      borderBottom: '1px solid #F3F4F6',
      transition: 'background-color 0.3s ease',
      backgroundColor: 'white',
    },
    deleteButton: {
      width: windowWidth < 640 ? '100%' : windowWidth < 768 ? '140px' : '163px',
      height: windowWidth < 768 ? '36px' : '40px',
      backgroundColor: '#FF3C3C',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '8px 12px',
      transition: 'background-color 0.3s ease',
      fontFamily: 'Montserrat',
      order: windowWidth < 640 ? 3 : 0,
      flex: windowWidth < 640 ? '1 0 calc(50% - 6px)' : 'none',
    },
    disabledDeleteButton: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
      cursor: 'not-allowed',
    },
    showingText: {
      fontSize: windowWidth < 768 ? '12px' : '14px',
      color: '#64748B',
      marginBottom: '16px',
      fontFamily: 'Montserrat',
      textAlign: windowWidth < 768 ? 'center' : 'left',
    },
    // Table View Styles
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
      minWidth: windowWidth < 1024 ? '800px' : '1100px',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeaderRow: {
      backgroundColor: '#F9FAFB',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      height: windowWidth < 768 ? '48px' : '62px',
    },
    tableHeaderCell: {
      textAlign: 'left',
      fontSize: windowWidth < 768 ? '12px' : '14px',
      fontWeight: 600,
      color: '#374151',
      whiteSpace: 'nowrap',
      position: 'relative',
      fontFamily: 'Montserrat',
      height: windowWidth < 768 ? '48px' : '62px',
      boxSizing: 'border-box',
      borderRight: '1px solid #E5E7EB',
      padding: windowWidth < 768 ? '8px' : '12px',
    },
    headerCellContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    sortIconsContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '4px',
    },
    sortIcon: {
      width: '10px',
      height: '10px',
      cursor: 'pointer',
      opacity: 0.5,
      margin: '1px 0',
    },
    activeSortIcon: {
      opacity: 1,
    },
    tableCell: {
      padding: windowWidth < 768 ? '8px' : '12px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: windowWidth < 768 ? '12px' : '15px',
      lineHeight: '140%',
      verticalAlign: 'middle',
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
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '9px',
      fontSize: windowWidth < 768 ? '11px' : '14px',
      fontWeight: 500,
      cursor: 'default',
      fontFamily: 'Montserrat',
      padding: windowWidth < 768 ? '6px 12px' : '8px 16px',
      width: windowWidth < 768 ? 'auto' : '100%',
      minWidth: windowWidth < 768 ? '80px' : 'auto',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: windowWidth < 768 ? '8px' : '12px',
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
    // Card View Styles for Mobile
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    propertyCard: {
      backgroundColor: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1E293B',
      margin: '0 0 8px 0',
      lineHeight: 1.3,
      flex: 1,
    },
    cardCheckbox: {
      marginLeft: '8px',
    },
    cardDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px',
    },
    cardDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: '#64748B',
    },
    cardDetailLabel: {
      fontWeight: 600,
      color: '#374151',
      minWidth: '70px',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '12px',
      borderTop: '1px solid #E5E7EB',
    },
    // Pagination
    paginationContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
      flexWrap: 'wrap',
      gap: windowWidth < 640 ? '12px' : '0',
    },
    paginationInfo: {
      fontSize: windowWidth < 768 ? '12px' : '14px',
      color: '#64748B',
      fontFamily: 'Montserrat',
      order: windowWidth < 640 ? 2 : 0,
      width: windowWidth < 640 ? '100%' : 'auto',
      textAlign: windowWidth < 640 ? 'center' : 'left',
      marginTop: windowWidth < 640 ? '12px' : '0',
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: windowWidth < 768 ? '4px' : '8px',
      order: windowWidth < 640 ? 1 : 0,
      overflowX: windowWidth < 640 ? 'auto' : 'visible',
      paddingBottom: windowWidth < 640 ? '8px' : '0',
    },
    paginationButton: {
      padding: windowWidth < 768 ? '6px 12px' : '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: windowWidth < 768 ? '12px' : '14px',
      color: '#374151',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
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
      minWidth: windowWidth < 768 ? '28px' : '32px',
      height: windowWidth < 768 ? '28px' : '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: windowWidth < 768 ? '12px' : '14px',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'Montserrat',
      whiteSpace: 'nowrap',
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
      display: 'flex',
      alignItems: 'center',
    },
    // View Toggle
    viewToggle: {
      display: windowWidth < 1024 ? 'flex' : 'none',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
    },
    viewToggleButton: {
      padding: '6px 12px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      fontSize: '12px',
      color: '#64748B',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeViewToggle: {
      backgroundColor: '#A237FF',
      color: 'white',
      borderColor: '#A237FF',
    },
    // Modal Styles (Responsive)
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
      padding: windowWidth < 768 ? '16px' : '20px',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '100%',
      maxWidth: windowWidth < 768 ? '100%' : '600px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    modalHeader: {
      padding: windowWidth < 768 ? '16px' : '24px 16px 16px',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: windowWidth < 768 ? '18px' : '24px',
      fontWeight: 600,
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
      padding: windowWidth < 768 ? '16px' : '24px 32px',
    },
    formGroup: {
      marginBottom: windowWidth < 768 ? '16px' : '20px',
    },
    formLabel: {
      display: 'block',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '6px',
      fontFamily: 'Montserrat',
    },
    formInput: {
      width: '100%',
      padding: windowWidth < 768 ? '10px 12px' : '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      color: '#1E293B',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      fontFamily: 'Montserrat',
      boxSizing: 'border-box',
    },
    formSelect: {
      width: '100%',
      padding: windowWidth < 768 ? '10px 12px' : '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      color: '#1E293B',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      boxSizing: 'border-box',
    },
    modalFooter: {
      padding: windowWidth < 768 ? '16px' : '16px 32px 24px',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      flexWrap: 'wrap',
    },
    submitButton: {
      padding: windowWidth < 768 ? '10px 20px' : '12px 24px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'background-color 0.3s ease',
      flex: windowWidth < 640 ? '1' : 'none',
    },
    cancelButton: {
      padding: windowWidth < 768 ? '10px 20px' : '12px 24px',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'all 0.3s ease',
      flex: windowWidth < 640 ? '1' : 'none',
    },
    textArea: {
      width: '100%',
      padding: windowWidth < 768 ? '10px 12px' : '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      color: '#1E293B',
      outline: 'none',
      fontFamily: 'Montserrat',
      resize: 'vertical',
      minHeight: '80px',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      flexDirection: windowWidth < 640 ? 'column' : 'row',
      gap: windowWidth < 768 ? '12px' : '16px',
      marginBottom: windowWidth < 768 ? '16px' : '20px',
    },
    col: {
      flex: 1,
      width: windowWidth < 640 ? '100%' : 'auto',
    },
    // Upload section
    uploadSection: {
      marginBottom: '20px',
    },
    uploadLabel: {
      display: 'block',
      fontSize: windowWidth < 768 ? '13px' : '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '8px',
      fontFamily: 'Montserrat',
    },
    uploadContainer: {
      width: '100%',
      height: windowWidth < 768 ? '120px' : '146px',
      border: '1px dashed #D1D5DB',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease, background-color 0.3s ease',
    },
    uploadContainerHover: {
      borderColor: '#A237FF',
      backgroundColor: '#F9F5FF',
    },
    uploadIcon: {
      width: windowWidth < 768 ? '32px' : '40px',
      height: windowWidth < 768 ? '32px' : '40px',
      color: '#9CA3AF',
    },
    uploadText: {
      fontSize: windowWidth < 768 ? '12px' : '14px',
      color: '#6B7280',
      fontWeight: 500,
      fontFamily: 'Montserrat',
      textAlign: 'center',
    },
    uploadSubtext: {
      fontSize: windowWidth < 768 ? '10px' : '12px',
      color: '#9CA3AF',
      fontFamily: 'Montserrat',
      textAlign: 'center',
    },
    fileInput: {
      display: 'none',
    },
    // Empty State
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#64748B',
      fontFamily: 'Montserrat',
    },
  };

  // Card view render for mobile
  const renderCardView = () => (
    <div style={styles.cardContainer}>
      {currentProperties.map((property) => {
        const statusStyle = getStatusButtonStyle(property.status);
        return (
          <div key={property.id} style={styles.propertyCard}>
            <div style={styles.cardHeader}>
              <div style={{ flex: 1 }}>
                <h3 style={styles.cardTitle}>{property.name}</h3>
                <div style={styles.cardDetails}>
                  <div style={styles.cardDetail}>
                    <span style={styles.cardDetailLabel}>Location:</span>
                    <span>{property.location}</span>
                  </div>
                  <div style={styles.cardDetail}>
                    <span style={styles.cardDetailLabel}>Price:</span>
                    <span>{property.price}</span>
                  </div>
                  <div style={styles.cardDetail}>
                    <span style={styles.cardDetailLabel}>Details:</span>
                    <span>{property.details}</span>
                  </div>
                  <div style={styles.cardDetail}>
                    <span style={styles.cardDetailLabel}>Added:</span>
                    <span>{property.addedDate}</span>
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={selectedProperties.includes(property.id)}
                onChange={() => handleSelectProperty(property.id)}
              />
            </div>
            
            <div style={styles.cardFooter}>
              <div 
                style={{
                  ...styles.statusButton,
                  ...statusStyle,
                }}
              >
                {property.status}
              </div>
              
              <div style={styles.actionsContainer}>
                <button 
                  style={{ ...styles.actionButton, color: '#3B82F6' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#EFF6FF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  title="Edit"
                  onClick={() => handleEditPropertyClick(property)}
                >
                  <img 
                    src={EditIcon} 
                    alt="Edit" 
                    style={{ width: '18px', height: '18px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = '✏️';
                      e.target.parentNode.appendChild(span);
                    }}
                  />
                </button>
                <button 
                  style={{ ...styles.actionButton, color: '#EF4444' }}
                  onClick={() => handleDeleteSingle(property.id)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  title="Delete"
                >
                  <img 
                    src={DeleteActionIcon} 
                    alt="Delete" 
                    style={{ width: '18px', height: '18px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = '🗑️';
                      e.target.parentNode.appendChild(span);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Table view render
  const renderTableView = () => (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHeaderRow}>
          <tr>
            <th style={{ ...styles.tableHeaderCell, width: '40px' }}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={selectedProperties.length === currentProperties.length && currentProperties.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            
            <th 
              style={{ ...styles.tableHeaderCell, minWidth: '200px' }}
              onClick={() => handleSort('name')}
            >
              <div style={styles.headerCellContent}>
                <div>Property Name</div>
                <div style={styles.sortIconsContainer}>
                  <img 
                    src={AscendingIcon} 
                    alt="Sort Ascending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'name' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                    }}
                  />
                  <img 
                    src={DescendingIcon} 
                    alt="Sort Descending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'name' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                    }}
                  />
                </div>
              </div>
            </th>
            
            <th 
              style={{ ...styles.tableHeaderCell, minWidth: '180px' }}
              onClick={() => handleSort('location')}
            >
              <div style={styles.headerCellContent}>
                <div>Location</div>
                <div style={styles.sortIconsContainer}>
                  <img 
                    src={AscendingIcon} 
                    alt="Sort Ascending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'location' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                    }}
                  />
                  <img 
                    src={DescendingIcon} 
                    alt="Sort Descending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'location' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                    }}
                  />
                </div>
              </div>
            </th>
            
            <th 
              style={{ ...styles.tableHeaderCell, minWidth: '120px' }}
              onClick={() => handleSort('price')}
            >
              <div style={styles.headerCellContent}>
                <div>Price</div>
                <div style={styles.sortIconsContainer}>
                  <img 
                    src={AscendingIcon} 
                    alt="Sort Ascending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'price' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                    }}
                  />
                  <img 
                    src={DescendingIcon} 
                    alt="Sort Descending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'price' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                    }}
                  />
                </div>
              </div>
            </th>
            
            <th style={{ ...styles.tableHeaderCell, minWidth: '180px' }}>
              <div>Details</div>
            </th>
            
            <th 
              style={{ ...styles.tableHeaderCell, minWidth: '120px' }}
              onClick={() => handleSort('status')}
            >
              <div style={styles.headerCellContent}>
                <div>Status</div>
                <div style={styles.sortIconsContainer}>
                  <img 
                    src={AscendingIcon} 
                    alt="Sort Ascending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'status' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                    }}
                  />
                  <img 
                    src={DescendingIcon} 
                    alt="Sort Descending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'status' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                    }}
                  />
                </div>
              </div>
            </th>
            
            <th 
              style={{ ...styles.tableHeaderCell, minWidth: '120px' }}
              onClick={() => handleSort('addedDate')}
            >
              <div style={styles.headerCellContent}>
                <div>Added Date</div>
                <div style={styles.sortIconsContainer}>
                  <img 
                    src={AscendingIcon} 
                    alt="Sort Ascending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'addedDate' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                    }}
                  />
                  <img 
                    src={DescendingIcon} 
                    alt="Sort Descending" 
                    style={{
                      ...styles.sortIcon,
                      ...(sortConfig.key === 'addedDate' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                    }}
                  />
                </div>
              </div>
            </th>
            
            <th style={{ ...styles.tableHeaderCell, width: '100px' }}>
              <div>Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProperties.map((property) => {
            const statusStyle = getStatusButtonStyle(property.status);
            return (
              <tr 
                key={property.id}
                style={{ 
                  transition: 'background-color 0.3s ease',
                  height: windowWidth < 768 ? '48px' : '62px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={styles.tableCell}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={selectedProperties.includes(property.id)}
                    onChange={() => handleSelectProperty(property.id)}
                  />
                </td>
                
                <td style={{ ...styles.tableCell, minWidth: '200px' }}>
                  {property.name}
                </td>
                
                <td style={{ ...styles.tableCell, minWidth: '180px' }}>
                  {property.location}
                </td>
                
                <td style={{ ...styles.tableCell, minWidth: '120px' }}>
                  {property.price}
                </td>
                
                <td style={{ ...styles.tableCell, minWidth: '180px' }}>
                  {property.details}
                </td>
                
                <td style={{ ...styles.tableCell, minWidth: '120px' }}>
                  <div 
                    style={{
                      ...styles.statusButton,
                      ...statusStyle,
                    }}
                  >
                    {property.status}
                  </div>
                </td>
                
                <td style={{ ...styles.tableCell, minWidth: '120px' }}>
                  {property.addedDate}
                </td>
                
                <td style={styles.tableCell}>
                  <div style={styles.actionsContainer}>
                    <button 
                      style={{ ...styles.actionButton, color: '#3B82F6' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#EFF6FF'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      title="Edit"
                      onClick={() => handleEditPropertyClick(property)}
                    >
                      <img 
                        src={EditIcon} 
                        alt="Edit" 
                        style={{ width: '18px', height: '18px' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const span = document.createElement('span');
                          span.textContent = '✏️';
                          e.target.parentNode.appendChild(span);
                        }}
                      />
                    </button>
                    <button 
                      style={{ ...styles.actionButton, color: '#EF4444' }}
                      onClick={() => handleDeleteSingle(property.id)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      title="Delete"
                    >
                      <img 
                        src={DeleteActionIcon} 
                        alt="Delete" 
                        style={{ width: '18px', height: '18px' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const span = document.createElement('span');
                          span.textContent = '🗑️';
                          e.target.parentNode.appendChild(span);
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        {windowWidth < 768 && (
          <div style={styles.mobileHeader}>
            <button 
              style={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            </button>
            <div style={styles.headerText}>
              <h1 style={styles.title}>Properties</h1>
              <p style={styles.subtitle}>Manage listings</p>
            </div>
          </div>
        )}
        
        {windowWidth >= 768 && (
          <div style={styles.headerText}>
            <h1 style={styles.title}>Property Management</h1>
            <p style={styles.subtitle}>Manage all your real estate listings</p>
          </div>
        )}
        
        <button
          onClick={handleAddPropertyClick}
          style={styles.addPropertyButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#8A2BE2'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#A237FF'}
        >
          Add Property
        </button>
      </div>

      {/* White Section */}
      <div style={styles.whiteSection}>
        {/* View Toggle for Mobile/Tablet */}
        {windowWidth < 1024 && (
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewToggleButton,
                ...(viewMode === 'table' && styles.activeViewToggle),
              }}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button
              style={{
                ...styles.viewToggleButton,
                ...(viewMode === 'card' && styles.activeViewToggle),
              }}
              onClick={() => setViewMode('card')}
            >
              Card View
            </button>
          </div>
        )}

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
              placeholder="Search properties..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={handleDeleteSelected}
            disabled={selectedProperties.length === 0}
            style={{
              ...styles.deleteButton,
              ...(selectedProperties.length === 0 && styles.disabledDeleteButton),
            }}
            onMouseEnter={(e) => {
              if (selectedProperties.length > 0) {
                e.target.style.backgroundColor = '#DC2626';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedProperties.length > 0) {
                e.target.style.backgroundColor = '#FF3C3C';
              }
            }}
          >
            <img 
              src={DeleteIcon} 
              alt="Delete" 
              style={{ width: '14px', height: '14px' }}
            />
            Delete ({selectedProperties.length})
          </button>

          {/* Filter Button with Dropdown */}
          <div style={styles.filterButtonContainer}>
            <button 
              style={styles.allFilterButton}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              onMouseEnter={(e) => e.target.style.borderColor = '#A237FF'}
              onMouseLeave={(e) => e.target.style.borderColor = '#E2E8F0'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={FilterIcon} 
                  alt="Filter" 
                  style={{ width: '14px', height: '14px' }}
                /> 
                <span>{statusFilter}</span>
              </div>
              <img 
                src={DescendingIcon} 
                alt="Dropdown" 
                style={{ 
                  width: '14px', 
                  height: '14px',
                  transform: showFilterDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
            
            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div style={styles.filterDropdown}>
                {filterOptions.map((option) => (
                  <div
                    key={option}
                    style={{
                      ...styles.filterOption,
                      backgroundColor: statusFilter === option ? '#F3F4F6' : 'white',
                      fontWeight: statusFilter === option ? 600 : 'normal',
                    }}
                    onClick={() => handleStatusFilterChange(option)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 
                      statusFilter === option ? '#F3F4F6' : 'white'
                    }
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Close dropdown when clicking outside */}
        {showFilterDropdown && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
            }}
            onClick={() => setShowFilterDropdown(false)}
          />
        )}

        {/* Showing text */}
        <div style={styles.showingText}>
          Showing {startIndex + 1} - {Math.min(endIndex, totalProperties)} out of {totalProperties}
        </div>

        {/* Empty State */}
        {currentProperties.length === 0 ? (
          <div style={styles.emptyState}>
            <h3>No properties found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            {/* Render appropriate view based on screen size and view mode */}
            {viewMode === 'card' && windowWidth < 1024 ? renderCardView() : renderTableView()}

            {/* Pagination */}
            <div style={styles.paginationContainer}>
              <div style={styles.paginationInfo}>
                Showing {startIndex + 1} - {Math.min(endIndex, totalProperties)} of {totalProperties}
              </div>
              
              <div style={styles.paginationControls}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    ...styles.paginationButton,
                    ...(currentPage === 1 && styles.disabledPaginationButton),
                  }}
                >
                  <img 
                    src={PreviousIcon} 
                    alt="Previous" 
                    style={{ width: '14px', height: '14px' }}
                  />
                  Prev
                </button>

                {generatePageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} style={styles.ellipsis}>...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={{
                        ...styles.pageNumberButton,
                        ...(currentPage === page && styles.activePageNumber),
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
                >
                  Next
                  <img 
                    src={NextIcon} 
                    alt="Next" 
                    style={{ width: '14px', height: '14px' }}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal for Add/Edit Property */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {modalType === 'add' ? 'Add Property' : 'Edit Property'}
              </h2>
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
                />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.modalBody}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Property Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.formInput}
                    required
                  />
                </div>
                
                <div style={styles.row}>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., 85 Lakh"
                        required
                      />
                    </div>
                  </div>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., Pune"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div style={styles.row}>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., 3"
                        required
                      />
                    </div>
                  </div>
                  <div style={styles.col}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Area (sq ft)</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        style={styles.formInput}
                        placeholder="e.g., 3000"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={styles.formSelect}
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                
                {/* Upload Section */}
                <div style={styles.uploadSection}>
                  <label style={styles.uploadLabel}>Upload Images</label>
                  <div
                    style={{
                      ...styles.uploadContainer,
                      ...(isDragging && styles.uploadContainerHover),
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload').click()}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#A237FF'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
                  >
                    <svg
                      style={styles.uploadIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    
                    <div style={styles.uploadText}>Click to upload images</div>
                    <div style={styles.uploadSubtext}>PNG, JPG up to 10 MB</div>
                    
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/jpg"
                      style={styles.fileInput}
                      onChange={handleFileUpload}
                    />
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                        {uploadedFiles.length} file(s) selected
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              backgroundColor: '#F3F4F6',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                            }}
                          >
                            <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(index);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#EF4444',
                                fontSize: '14px',
                                padding: '0',
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={styles.textArea}
                    placeholder="Enter property description..."
                  />
                </div>
              </div>
              
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                >
                  {modalType === 'add' ? 'Add Property' : 'Update Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;