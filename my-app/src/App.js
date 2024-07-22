import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  IconButton,
  Toolbar,
  InputAdornment,
  Box,
  Drawer,
  FormControlLabel,
  Switch,
  Button,
  Divider,
  Slider,
  Typography,
} from '@mui/material';
import { Search, FilterList, Visibility, ViewList } from '@mui/icons-material';
import { Autocomplete } from '@mui/lab';
import data from './sample-data.json';
import logo from './logo.svg';

function App() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
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

  const categories = ["Health", "Pets", "Clothing", "Activity", "Home", "Automotive", "Entertainment", "Beauty", "Electronics"];
  const subcategories = ["Nutrition", "Aquarium", "Cat", "First Aid", "Dog", "Tools", "Gadgets"];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name.from]:0,
      [name.to]: value,
    }));
  };

  const handleAutocompleteChange = (event, value, field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleSliderChange = (name, value) => {
    console.log(name);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name.from]: 0,
      [name.to]: 120
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

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
  };

  const handleColumnVisibilityChange = (event) => {
    setVisibleColumns({
      ...visibleColumns,
      [event.target.name]: event.target.checked,
    });
  };
  console.log(filters);

  return (
    <div className="App">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          style={{ marginRight: 16 }}
        />
        <IconButton onClick={handleFilterDrawerOpen}>
          <FilterList />
        </IconButton>
        <IconButton onClick={handleDrawerOpen}>
          <Visibility />
        </IconButton>
        <IconButton>
          <ViewList />
        </IconButton>
        <img src={logo} alt="logo" style={{ height: '40px', marginLeft: 16 }} />
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 250, padding: 2 }}>
          <h2>Show/Hide Columns</h2>
          {Object.keys(visibleColumns).map((column) => (
            <FormControlLabel
              key={column}
              control={
                <Switch
                  checked={visibleColumns[column]}
                  onChange={handleColumnVisibilityChange}
                  name={column}
                  color="primary"
                />
              }
              label={column.charAt(0).toUpperCase() + column.slice(1)}
            />
          ))}
          <Divider />
          <Button onClick={handleDrawerClose} variant="contained" color="primary" fullWidth>
            Apply
          </Button>
        </Box>
      </Drawer>
      <Drawer anchor="right" open={filterDrawerOpen} onClose={handleFilterDrawerClose}>
        <Box sx={{ width: 300, padding: 2 }}>
          <h2>Filters</h2>
          <TextField
            name="name"
            label="Name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
          <Autocomplete
            multiple
            options={categories}
            getOptionLabel={(option) => option}
            value={filters.category}
            onChange={(event, value) => handleAutocompleteChange(event, value, 'category')}
            renderInput={(params) => (
              <TextField {...params} label="Category" margin="normal" fullWidth />
            )}
          />
          <Autocomplete
            multiple
            options={subcategories}
            getOptionLabel={(option) => option}
            value={filters.subcategory}
            onChange={(event, value) => handleAutocompleteChange(event, value, 'subcategory')}
            renderInput={(params) => (
              <TextField {...params} label="Subcategory" margin="normal" fullWidth />
            )}
          />
          <TextField
            name="createdAt.from"
            label="Created At From"
            type="date"
            value={filters.createdAt.from}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="createdAt.to"
            label="Created At To"
            type="date"
            value={filters.createdAt.to}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="updatedAt.from"
            label="Updated At From"
            type="date"
            value={filters.updatedAt.from}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="updatedAt.to"
            label="Updated At To"
            type="date"
            value={filters.updatedAt.to}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Typography gutterBottom>Price</Typography>
          <Slider
            value={filters.price}
            onChange={(event, newValue) => handleSliderChange('price', newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={200}
          />
          <Typography gutterBottom>Sale Price</Typography>
          <Slider
            value={filters.salePrice}
            onChange={(event, newValue) => handleSliderChange('salePrice', newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={200}
          />
          <Divider />
          <Button onClick={handleFilterDrawerClose} variant="contained" color="primary" fullWidth>
            Apply
          </Button>
        </Box>
      </Drawer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.id && (
                <TableCell
                  key="id"
                  sortDirection={orderBy === 'id' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={createSortHandler('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.name && (
                <TableCell
                  key="name"
                  sortDirection={orderBy === 'name' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={createSortHandler('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.category && (
                <TableCell
                  key="category"
                  sortDirection={orderBy === 'category' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'category'}
                    direction={orderBy === 'category' ? order : 'asc'}
                    onClick={createSortHandler('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.subcategory && (
                <TableCell
                  key="subcategory"
                  sortDirection={orderBy === 'subcategory' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'subcategory'}
                    direction={orderBy === 'subcategory' ? order : 'asc'}
                    onClick={createSortHandler('subcategory')}
                  >
                    Subcategory
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.createdAt && (
                <TableCell
                  key="createdAt"
                  sortDirection={orderBy === 'createdAt' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'createdAt'}
                    direction={orderBy === 'createdAt' ? order : 'asc'}
                    onClick={createSortHandler('createdAt')}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.updatedAt && (
                <TableCell
                  key="updatedAt"
                  sortDirection={orderBy === 'updatedAt' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'updatedAt'}
                    direction={orderBy === 'updatedAt' ? order : 'asc'}
                    onClick={createSortHandler('updatedAt')}
                  >
                    Updated At
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.price && (
                <TableCell
                  key="price"
                  sortDirection={orderBy === 'price' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={createSortHandler('price')}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.sale_price && (
                <TableCell
                  key="sale_price"
                  sortDirection={orderBy === 'sale_price' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'sale_price'}
                    direction={orderBy === 'sale_price' ? order : 'asc'}
                    onClick={createSortHandler('sale_price')}
                  >
                    Sale Price
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                {visibleColumns.id && <TableCell>{row.id}</TableCell>}
                {visibleColumns.name && <TableCell>{row.name}</TableCell>}
                {visibleColumns.category && <TableCell>{row.category}</TableCell>}
                {visibleColumns.subcategory && <TableCell>{row.subcategory}</TableCell>}
                {visibleColumns.createdAt && <TableCell>{row.createdAt}</TableCell>}
                {visibleColumns.updatedAt && <TableCell>{row.updatedAt}</TableCell>}
                {visibleColumns.price && <TableCell>{row.price}</TableCell>}
                {visibleColumns.sale_price && <TableCell>{row.sale_price}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default App;