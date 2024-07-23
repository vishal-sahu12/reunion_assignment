import React, { useState } from 'react';
import useTableData from './Hooks/useTableData';
import SearchBar from './Components/SearchBar';
import FilterDrawer from './Components/FilterDrawer';
import TableComponent from './Components/TableComponent';
import { CssBaseline } from '@mui/material';

const App = () => {
  const {
    rows,
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
  } = useTableData();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleFilterDrawerOpen = () => setFilterDrawerOpen(true);
  const handleFilterDrawerClose = () => setFilterDrawerOpen(false);

  return (
    <div>
      <CssBaseline />
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleFilterDrawerOpen={handleFilterDrawerOpen}
      />
      <FilterDrawer
        filterDrawerOpen={filterDrawerOpen}
        handleFilterDrawerClose={handleFilterDrawerClose}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleAutocompleteChange={handleAutocompleteChange}
        handleSliderChange={handleSliderChange}
      />
      <TableComponent
        rows={rows}
        order={order}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        visibleColumns={visibleColumns}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default App;
