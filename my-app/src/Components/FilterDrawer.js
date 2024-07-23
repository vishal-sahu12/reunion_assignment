import React from 'react';
import { Box, Drawer, TextField, Autocomplete, Button, Divider, Slider, Typography } from '@mui/material';

const FilterDrawer = ({
  filterDrawerOpen,
  handleFilterDrawerClose,
  filters,
  handleFilterChange,
  handleAutocompleteChange,
  handleSliderChange,
}) => {
  const categories = ["Health", "Pets", "Clothing", "Activity", "Home", "Automotive", "Entertainment", "Beauty", "Electronics"];
  const subcategories = ["Nutrition", "Aquarium", "Cat", "First Aid", "Dog", "Tools", "Gadgets"];

  return (
    <Drawer anchor="right" open={filterDrawerOpen} onClose={handleFilterDrawerClose}>
      <Box sx={{ width: 300, padding: 2 }}>
        <h2>Filters</h2>
        <TextField
          name="name"
          label="Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          multiple
          options={categories}
          getOptionLabel={(option) => option}
          value={filters.category}
          onChange={(event, value) => handleAutocompleteChange('category', value)}
          renderInput={(params) => (
            <TextField {...params} label="Category" margin="normal" fullWidth />
          )}
        />
        <Autocomplete
          multiple
          options={subcategories}
          getOptionLabel={(option) => option}
          value={filters.subcategory}
          onChange={(event, value) => handleAutocompleteChange('subcategory', value)}
          renderInput={(params) => (
            <TextField {...params} label="Subcategory" margin="normal" fullWidth />
          )}
        />
        <TextField
          name="createdAt.from"
          label="Created At From"
          type="date"
          value={filters.createdAt.from}
          onChange={(e) => handleFilterChange('createdAt.from', e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="createdAt.to"
          label="Created At To"
          type="date"
          value={filters.createdAt.to}
          onChange={(e) => handleFilterChange('createdAt.to', e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="updatedAt.from"
          label="Updated At From"
          type="date"
          value={filters.updatedAt.from}
          onChange={(e) => handleFilterChange('updatedAt.from', e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="updatedAt.to"
          label="Updated At To"
          type="date"
          value={filters.updatedAt.to}
          onChange={(e) => handleFilterChange('updatedAt.to', e.target.value)}
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
          value={filters.sale_price}
          onChange={(event, newValue) => handleSliderChange('sale_price', newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={200}
        />
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" onClick={handleFilterDrawerClose} fullWidth>
          Apply
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
