import { useState, useEffect } from 'react';
import data from '../sample-data.json';

const useTableData = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    category: [],
    subcategory: [],
    createdAt: { from: '', to: '' },
    updatedAt: { from: '', to: '' },
    price: { from: '', to: '' },
  });
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    sale_price: true,
  });

  useEffect(() => {
    setRows(data);
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleSliderChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = (rows) => {
    return rows.filter((row) => {
      return (
        (filters.name === '' || row.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.category.length === 0 || filters.category.includes(row.category)) &&
        (filters.subcategory.length === 0 || filters.subcategory.includes(row.subcategory)) &&
        (filters.createdAt.from === '' || new Date(row.createdAt) >= new Date(filters.createdAt.from)) &&
        (filters.createdAt.to === '' || new Date(row.createdAt) <= new Date(filters.createdAt.to)) &&
        (filters.updatedAt.from === '' || new Date(row.updatedAt) >= new Date(filters.updatedAt.from)) &&
        (filters.updatedAt.to === '' || new Date(row.updatedAt) <= new Date(filters.updatedAt.to)) &&
        (filters.price.from === '' || row.price >= parseFloat(filters.price.from)) &&
        (filters.price.to === '' || row.price <= parseFloat(filters.price.to))
      );
    });
  };

  const filteredRows = applyFilters(rows).filter((row) =>
    Object.keys(row).some((key) =>
      String(row[key]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (typeof a[orderBy] === 'number' || typeof b[orderBy] === 'number') {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    } else if (orderBy === 'createdAt' || orderBy === 'updatedAt') {
      return order === 'asc'
        ? new Date(a[orderBy]) - new Date(b[orderBy])
        : new Date(b[orderBy]) - new Date(a[orderBy]);
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return {
    rows: sortedRows,
    page,
    rowsPerPage,
    order,
    orderBy,
    searchQuery,
    filters,
    visibleColumns,
    setPage,
    setRowsPerPage,
    handleRequestSort,
    handleSearch,
    handleFilterChange,
    handleAutocompleteChange,
    handleSliderChange,
    setVisibleColumns,
  };
};

export default useTableData;
