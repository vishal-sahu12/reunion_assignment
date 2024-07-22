import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination } from '@mui/material';

const TableComponent = ({ rows, order, orderBy, handleRequestSort, visibleColumns, page, rowsPerPage, setPage, setRowsPerPage }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.id && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'id'} direction={orderBy === 'id' ? order : 'asc'} onClick={() => handleRequestSort('id')}>
                    ID
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.name && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'name'} direction={orderBy === 'name' ? order : 'asc'} onClick={() => handleRequestSort('name')}>
                    Name
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.category && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'category'} direction={orderBy === 'category' ? order : 'asc'} onClick={() => handleRequestSort('category')}>
                    Category
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.subcategory && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'subcategory'} direction={orderBy === 'subcategory' ? order : 'asc'} onClick={() => handleRequestSort('subcategory')}>
                    Subcategory
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.createdAt && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'createdAt'} direction={orderBy === 'createdAt' ? order : 'asc'} onClick={() => handleRequestSort('createdAt')}>
                    Created At
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.updatedAt && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'updatedAt'} direction={orderBy === 'updatedAt' ? order : 'asc'} onClick={() => handleRequestSort('updatedAt')}>
                    Updated At
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.price && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'price'} direction={orderBy === 'price' ? order : 'asc'} onClick={() => handleRequestSort('price')}>
                    Price
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.sale_price && (
                <TableCell>
                  <TableSortLabel active={orderBy === 'sale_price'} direction={orderBy === 'sale_price' ? order : 'asc'} onClick={() => handleRequestSort('sale_price')}>
                    Sale Price
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                {visibleColumns.id && <TableCell>{row.id}</TableCell>}
                {visibleColumns.name && <TableCell>{row.name}</TableCell>}
                {visibleColumns.category && <TableCell>{row.category}</TableCell>}
                {visibleColumns.subcategory && <TableCell>{row.subcategory}</TableCell>}
                {visibleColumns.createdAt && <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>}
                {visibleColumns.updatedAt && <TableCell>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableComponent;
