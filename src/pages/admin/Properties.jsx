import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      addedDate: '11-02-2026'
    },
    {
      id: 2,
      name: 'Modern Downtown Apartment',
      location: 'Shingada Road, Suncity',
      price: '₹ 85 Lakh',
      details: '1,300 sq ft Apartment',
      status: 'Rented',
      addedDate: '11-02-2026'
    },
    {
      id: 3,
      name: 'Suburban Family Home',
      location: 'Thane Maharashtra',
      price: '₹ 70 Lakh',
      details: '3,000 sq ft 3 BHK Villa',
      status: 'Sold',
      addedDate: '11-02-2026'
    },
    {
      id: 4,
      name: 'Mountain View Estate',
      location: 'Wakad, Pune',
      price: '₹ 2 Crore',
      details: '1,300 sq ft Apartment',
      status: 'Available',
      addedDate: '11-02-2026'
    },
    {
      id: 5,
      name: 'Urban Loft',
      location: 'Hinjewadi, Pune',
      price: '₹ 70 Lakh',
      details: '2,500 sq ft Commercial',
      status: 'Rented',
      addedDate: '11-02-2026'
    },
    
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
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

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // NEW: State for filter dropdown
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

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

  // Handle property selection
  const handleSelectProperty = (id) => {
    setSelectedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propertyId => propertyId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProperties.length === currentProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(currentProperties.map(property => property.id));
    }
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    if (selectedProperties.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProperties.length} property(ies)?`)) {
      setProperties(prev => prev.filter(property => !selectedProperties.includes(property.id)));
      setSelectedProperties([]);
    }
  };

  // Handle delete single property
  const handleDeleteSingle = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(property => property.id !== id));
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

  // NEW: Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setShowFilterDropdown(false);
    // Reset to first page when filter changes
    setCurrentPage(1);
  };

  // File upload handlers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // You can add validation here for file types and size
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
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setUploadedFiles(prev => [...prev, ...imageFiles]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Modal handlers
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
    
    // Handle file uploads here
    // You can upload the files to a server or handle them as needed
    console.log('Uploaded files:', uploadedFiles);
    
    if (modalType === 'add') {
      // Add new property
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
      // Edit existing property
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

  // Get status button styles based on status
  const getStatusButtonStyle = (status) => {
    switch(status) {
      case 'Available': 
        return { 
          backgroundColor: '#C5FAC9', 
          color: '#151816',
          width: '198px',
          height: '39px',
          borderRadius: '9px',
          gap: '10px'
        };
      case 'Rented': 
        return { 
          backgroundColor: '#E9F8FF', 
          color: '#272A2F',
          width: '198px',
          height: '39px',
          borderRadius: '9px',
          gap: '10px'
        };
      case 'Sold': 
        return { 
          backgroundColor: '#FFBBBB', 
          color: '#282425',
          width: '198px',
          height: '39px',
          borderRadius: '9px',
          gap: '10px'
        };
      default: 
        return { 
          backgroundColor: '#E5E7EB', 
          color: '#374151',
          width: '198px',
          height: '39px',
          borderRadius: '9px',
          gap: '10px'
        };
    }
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
    addPropertyButton: {
      width: '183px',
      height: '46px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '7px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '10px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
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
      position: 'relative', // For dropdown positioning
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
    // Updated filter button styles
    filterButtonContainer: {
      position: 'relative',
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
      top: '100%',
      right: 0,
      marginTop: '4px',
      backgroundColor: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '6px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 100,
      minWidth: '200px',
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
    filterOptionHover: {
      backgroundColor: '#F9FAFB',
    },
    filterOptionActive: {
      backgroundColor: '#F3F4F6',
      fontWeight: 600,
      color: '#1E293B',
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
    // Property Name column
    propertyNameHeaderCell: {
      width: '311px',
      minWidth: '311px',
      padding: '8px 8px 8px 11px',
      gap: '8px',
      borderRight: '1px solid #E5E7EB',
    },
    propertyNameCell: {
      width: '311px',
      minWidth: '311px',
      padding: '8px 8px 8px 11px',
      gap: '8px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Location column
    locationHeaderCell: {
      width: '299px',
      minWidth: '299px',
      padding: '8px 15px',
      gap: '4px',
      borderRight: '1px solid #E5E7EB',
    },
    locationCell: {
      width: '299px',
      minWidth: '299px',
      padding: '8px 15px',
      gap: '4px',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Price column
    priceHeaderCell: {
      width: '206px',
      minWidth: '206px',
      padding: '8px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderLeft: '1px solid #E5E7EB',
    },
    priceCell: {
      width: '206px',
      minWidth: '206px',
      padding: '8px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderLeft: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Details column
    detailsHeaderCell: {
      width: '455px',
      minWidth: '455px',
      padding: '8px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderLeft: '1px solid #E5E7EB',
    },
    detailsCell: {
      width: '455px',
      minWidth: '455px',
      padding: '8px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderLeft: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '140%',
    },
    // Status column
    statusHeaderCell: {
      width: '239px',
      minWidth: '239px',
      padding: '10px 10px 10px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
    },
    statusCell: {
      width: '239px',
      minWidth: '239px',
      padding: '10px 10px 10px 15px',
      justifyContent: 'space-between',
      borderRight: '1px solid #E5E7EB',
      borderTop: '1px solid #E5E7EB',
    },
    // Added Date column
    addedDateHeaderCell: {
      width: '150px',
      minWidth: '150px',
      padding: '8px 15px',
      borderRight: '1px solid #E5E7EB',
    },
    addedDateCell: {
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
      width: '100px',
      minWidth: '100px',
      padding: '8px 15px',
      textAlign: 'center',
    },
    actionsCell: {
      width: '100px',
      minWidth: '100px',
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
    editButton: {
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
    // Modal styles
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
      borderRadius: '12px',
      width: '600px',
      maxWidth: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    modalHeader: {
      padding: '24px 32px 16px',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: '24px',
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
      padding: '24px 32px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '8px',
      fontFamily: 'Montserrat',
    },
    formInput: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1E293B',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      fontFamily: 'Montserrat',
      boxSizing: 'border-box',
    },
    formInputFocus: {
      borderColor: '#A237FF',
    },
    formSelect: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1E293B',
      outline: 'none',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      boxSizing: 'border-box',
    },
    modalFooter: {
      padding: '16px 32px 24px',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
    },
    submitButton: {
      padding: '12px 24px',
      backgroundColor: '#A237FF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'background-color 0.3s ease',
    },
    cancelButton: {
      padding: '12px 24px',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      transition: 'all 0.3s ease',
    },
    textArea: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1E293B',
      outline: 'none',
      fontFamily: 'Montserrat',
      resize: 'vertical',
      minHeight: '100px',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      gap: '16px',
      marginBottom: '20px',
    },
    col: {
      flex: 1,
    },
    // Upload section styles
    uploadSection: {
      marginBottom: '20px',
    },
    uploadLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '8px',
      fontFamily: 'Montserrat',
    },
    uploadContainer: {
      width: '519px',
      height: '146px',
      border: '1px dashed #D1D5DB',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '10px',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease, background-color 0.3s ease',
    },
    uploadContainerHover: {
      borderColor: '#A237FF',
      backgroundColor: '#F9F5FF',
    },
    uploadIcon: {
      width: '40px',
      height: '40px',
      color: '#9CA3AF',
    },
    uploadText: {
      fontSize: '14px',
      color: '#6B7280',
      fontWeight: 500,
      fontFamily: 'Montserrat',
    },
    uploadSubtext: {
      fontSize: '12px',
      color: '#9CA3AF',
      fontFamily: 'Montserrat',
    },
    fileInput: {
      display: 'none',
    },
  };

  // Filter options
  const filterOptions = ['All Status', 'Available', 'Rented', 'Sold'];

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <div style={styles.headerText}>
          <h1 style={styles.title}>Property Management</h1>
          <p style={styles.subtitle}>Manage all your real estate listings</p>
        </div>
        
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
              style={{ width: '16px', height: '16px' }}
              onError={(e) => e.target.style.display = 'none'}
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
                  style={{ width: '16px', height: '16px' }}
                  onError={(e) => e.target.style.display = 'none'}
                /> 
                <span>{statusFilter}</span>
              </div>
              <img 
                src={DescendingIcon} 
                alt="Dropdown" 
                style={{ 
                  width: '16px', 
                  height: '16px',
                  transform: showFilterDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
                onError={(e) => e.target.style.display = 'none'}
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
                      ...(statusFilter === option && styles.filterOptionActive),
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
                    checked={selectedProperties.length === currentProperties.length && currentProperties.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                
                {/* Property Name Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.propertyNameHeaderCell }}
                  onClick={() => handleSort('name')}
                >
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Property Name</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'name' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const span = document.createElement('span');
                          span.textContent = '↑';
                          span.style.fontSize = '12px';
                          e.target.parentNode.appendChild(span);
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'name' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const span = document.createElement('span');
                          span.textContent = '↓';
                          span.style.fontSize = '12px';
                          e.target.parentNode.appendChild(span);
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Location Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.locationHeaderCell }}
                  onClick={() => handleSort('location')}
                >
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Location</div>
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
                
                {/* Price Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.priceHeaderCell }}
                  onClick={() => handleSort('price')}
                >
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Price</div>
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
                
                {/* Details Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.detailsHeaderCell }}
                >
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Details</div>
                    <div style={styles.sortIconsContainer}>
                      <img 
                        src={AscendingIcon} 
                        alt="Sort Ascending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'Details' && sortConfig.direction === 'asc' && styles.activeSortIcon),
                        }}
                      />
                      <img 
                        src={DescendingIcon} 
                        alt="Sort Descending" 
                        style={{
                          ...styles.sortIcon,
                          ...(sortConfig.key === 'Details' && sortConfig.direction === 'desc' && styles.activeSortIcon),
                        }}
                      />
                    </div>
                  </div>
                </th>
                
                {/* Status Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.statusHeaderCell }}
                  onClick={() => handleSort('status')}
                >
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Status</div>
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
                
                {/* Added Date Column */}
                <th 
                  style={{ ...styles.tableHeaderCell, ...styles.addedDateHeaderCell }}
                  onClick={() => handleSort('addedDate')}
                >
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Added Date</div>
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
                
                {/* Actions Column */}
                <th style={{ ...styles.tableHeaderCell, ...styles.actionsHeaderCell }}>
                  <div style={styles.headerCellContent}>
                    <div style={styles.headerTextContainer}>Actions</div>
                  </div>
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
                      height: '62px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Checkbox Cell */}
                    <td style={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        style={styles.checkbox}
                        checked={selectedProperties.includes(property.id)}
                        onChange={() => handleSelectProperty(property.id)}
                      />
                    </td>
                    
                    {/* Property Name Cell */}
                    <td style={styles.propertyNameCell}>
                      {property.name}
                    </td>
                    
                    {/* Location Cell */}
                    <td style={styles.locationCell}>
                      {property.location}
                    </td>
                    
                    {/* Price Cell */}
                    <td style={styles.priceCell}>
                      {property.price}
                    </td>
                    
                    {/* Details Cell */}
                    <td style={styles.detailsCell}>
                      {property.details}
                    </td>
                    
                    {/* Status Cell */}
                    <td style={styles.statusCell}>
                      <div 
                        style={{
                          ...styles.statusButton,
                          ...statusStyle,
                        }}
                      >
                        {property.status}
                      </div>
                    </td>
                    
                    {/* Added Date Cell */}
                    <td style={styles.addedDateCell}>
                      {property.addedDate}
                    </td>
                    
                    {/* Actions Cell */}
                    <td style={styles.actionsCell}>
                      <div style={styles.actionsContainer}>
                        <button 
                          style={{ ...styles.actionButton, ...styles.editButton }}
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
                          style={{ ...styles.actionButton, ...styles.deleteActionButton }}
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

        {/* Pagination */}
        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            Showing {startIndex + 1} - {Math.min(endIndex, totalProperties)} out of {totalProperties}
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
                    {/* Upload Icon SVG */}
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
                  
                  {/* Show uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontFamily: 'Montserrat' }}>
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
                              fontFamily: 'Montserrat',
                            }}
                          >
                            <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#8A2BE2'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#A237FF'}
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