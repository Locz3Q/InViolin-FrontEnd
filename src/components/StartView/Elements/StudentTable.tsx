import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Card } from '@mui/material';
import { useState, ChangeEvent } from 'react'
import { User } from '../../../Interfaces/types';
import { Column, Data } from './tableInterfaces';

const columns: readonly Column[] = [
  { 
    id: 'name', 
    label: 'Name', 
    minWidth: 80 
  },
  { 
    id: 'surname', 
    label: 'Surname', 
    minWidth: 80 
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 150,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  }
];

function createData(
  name: string,
  surname: string,
  email: string
): Data {
  return { name, surname, email };
}

function getRows(students: User[]): Data[] {
  return students.map((student) => {
    const row = createData(student.name, student.surname, student.email)
    return row
  })
}

interface Props {
  students: User[]
}

const StudentTable = (props: Props) => {
  const rows = getRows(props.students);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Card>
      <TableContainer sx={{ maxHeight: 220 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Wierszy na stronę"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default StudentTable