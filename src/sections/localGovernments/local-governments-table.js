import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  SvgIcon,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';

export const LocalGovernmentsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    onEditLocalGovernment,
    onDeleteLocalGovernment,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const router = useRouter();

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const serialNumber = (index) => {
    return page * rowsPerPage + index + 1;
  };

  const handleDeleteClick = (localGovernmentId) => {
    if(onDeleteLocalGovernment) {
      onDeleteUser(localGovernmentId)
    }
  }

  const handleEditClick = (localGovernmentId) => {
    if(onEditLocalGovernment) {
      onEditUser(localGovernmentId);
    }
  }
  
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  #
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Edit
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((localGovernment, index) => {
                const isItemSelected = selected.indexOf(localGovernment.id) !== -1;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    key={localGovernment.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(localGovernment.id);
                          } else {
                            onDeselectOne?.(localGovernment.id);
                          }
                        }}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell>
                      {serialNumber(index)}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={localGovernment.avatar}>
                          {getInitials(localGovernment.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {localGovernment.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      Edit
                    </TableCell>
                    <TableCell>
                      Delete
                    </TableCell>
                    <TableCell>
                      {/* the user id is initialized with an underscore exactly this way at the backend */}
                      <IconButton onClick={() => handleEditClick(localGovernment._id)}>
                        <SvgIcon fontSize="small">
                          <PencilIcon />
                        </SvgIcon>
                      </IconButton>
                      {/* the user id is initialized with an underscore exactly this way at the backend */}
                      <IconButton onClick={() => handleDeleteClick(localGovernment._id)}>
                        <SvgIcon fontSize="small">
                          <TrashIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LocalGovernmentsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  onEditLocalGovernment: PropTypes.func,
  onDeleteLocalGovernment: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};

export default LocalGovernmentsTable;
