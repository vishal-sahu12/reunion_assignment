import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Search, FilterList, Visibility, TableChart } from '@mui/icons-material';

const SearchBar = ({ searchQuery, handleSearch, handleFilterDrawerOpen, handleDrawerOpen }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '8px' }}>
      <TextField
        variant="outlined"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <Search sx={{ marginRight: '8px', color: 'grey.500' }} />
          ),
        }}
        sx={{ width: '200px' }}
      />
      <IconButton onClick={handleFilterDrawerOpen}>
        <FilterList />
      </IconButton>
      <IconButton onClick={handleDrawerOpen}>
        <Visibility />
      </IconButton>
      <IconButton>
        <TableChart />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
