import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import { GridColDef, GridValueGetterParams, DataGrid, GridApi, GridCellValue } from '@mui/x-data-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Queue, User, AddTeacher, Lesson } from '../../../Interfaces/types';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { addTeacherToStudent, getStudentData, resetStudent } from "../../../features/users/studentSlice";
import { deleteItem, reset } from '../../../features/queue/queueSlice';
import { addStudentToTeacher } from '../../../features/Teachers/teacherSlice';

interface Props {
  students: User[],
  queue: any[]
}

const DataTable = (props: Props) => {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Lesson>({
    studentId: '',
    teacherId: '',
    studentName: '',
    topic: '',
    isRemote: false,
    date: ''
  })

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Zaplanuj Lekcję</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Wybierz odpowiedni dzień na przeprowadzenie lekcji, planowany temat ćwiczeń oraz tryb zajęć.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button onClick={handleClose}>Zatwierdź</Button>
      </DialogActions>
    </Dialog>
  )

  const {user} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const columnsStudents: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Imię', width: 130 },
    { field: 'surname', headerName: 'Nazwisko', width: 130 },
    {
      field: 'fullName',
      headerName: 'Pełne Imię',
      description: 'Tej kolumny nie można sortować.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.surname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      width: 150,
    },
    {
      field: 'level',
      headerName: 'Poziom umiejętności',
      type: 'number',
      width: 150,
    },
    {
      field: 'Przycisk',
      headerName: 'Zaplanuj Lekcję',
      description: 'Tej kolumny nie można sortować.',
      sortable: false,
      filterable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
            setOpen(true);
        };
  
        return <Button onClick={onClick} variant='contained'>Zaplanuj Lekcję</Button>;
      }
    },
  ];
  
  const columnsQueue: GridColDef[] = [
    { field: 'id', headerName: 'ID Prośby', width: 90 },
    { field: 'idStudent', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Imię', width: 130 },
    { field: 'surname', headerName: 'Nazwisko', width: 130 },
    {
      field: 'fullName',
      headerName: 'Pełne Imię',
      description: 'Tej kolumny nie można sortować.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.surname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      width: 150,
    },
    {
      field: 'level',
      headerName: 'Poziom umiejętności',
      type: 'number',
      width: 150,
    },
    {
      field: 'Przycisk',
      headerName: 'Akceptacja prośby',
      description: 'Tej kolumny nie można sortować.',
      sortable: false,
      filterable: false,
      width: 210,
      renderCell: (params) => {
        const onClickDelete = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          const id = thisRow.id?.toString()
          if(id) {
            dispatch(deleteItem(id));
          }
          dispatch(reset())
        };
        
        const onClickAdd = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          if(thisRow.idStudent?.toString() && user?._id) {
            const studentId = thisRow.idStudent.toString();
            const teacherId = user._id;
            const ids: AddTeacher = {
              studentId: studentId,
              teacherId: teacherId
            };
            dispatch(addStudentToTeacher(ids));
            dispatch(addTeacherToStudent(ids));
            const id = thisRow.id?.toString()
            if(id) {
              dispatch(deleteItem(id));
            }
          }
          // dispatch(reset());
          dispatch(resetStudent());
        }

        return (
        <Grid>
          <Button sx={{marginRight: 1}} onClick={onClickAdd} variant='contained' color='success'>
            <CheckIcon />
          </Button>
          <Button onClick={onClickDelete} variant='contained' color='error'>
            <DeleteIcon />
          </Button>
        </Grid>);
      }
    },
  ];

  function getStudentData(props: Props): any[] {
    if(user && 'students' in user) {
      const { students } = props;
      const filteredStudents = students.filter((student) => {
        const studentArray = user.students?.includes(student._id ? student._id : '')
        return studentArray
      })
      const map = filteredStudents.map((student) => {
        const row = {id: student._id, firstName: student.name, surname: student.surname, email: student.email, level: student.level} 
        return row
      })
      return map;
    } else {
      return []
    }
  }
  
  function getQueueData(props: Props) {
    if(user && 'students' in user && props.queue.length > 0) {
      const { students, queue } = props;
      const filteredStudents = students.filter((student) => {
        const studentArray = !user.students?.includes(student._id ? student._id : '')
        return studentArray
      })
      const map = filteredStudents.map((student, index) => {
        const row = {id: queue[index]._id, idStudent: student._id, firstName: student.name, surname: student.surname, email: student.email, level: student.level} 
        return row
      })
      return map;
    } else {
      return []
    }
  }
  
  return (
    <>
      {formDialog}
      <Card sx={{display: 'grid', padding: 2, textAlign: 'left', backgroundColor: '#2A160C', color: '#FFFFFF'}}>
        <h2>Twoi Studenci</h2>
        <Card sx={{margin: '0 0 30px 0'}}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false
                  }
                }
              }}
              rows={getStudentData(props)}
              columns={columnsStudents}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              localeText={{
                columnMenuSortAsc: 'Sortuj rosnąco',
                columnMenuSortDesc: 'Sortuj malejąco',
                columnMenuUnsort: 'Brak sortowania',
                columnMenuShowColumns: 'Pokaż kolumnę',
                columnMenuFilter: 'Filtruj',
                columnMenuHideColumn: 'Ukryj kolumnę',
              }}    
            />
          </div>
        </Card>
        <h2>Studenci oczekujący na zaakceptowanie</h2>
        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                    idStudent: false
                  }
                }
              }}
              rows={getQueueData(props)}
              columns={columnsQueue}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              localeText={{
                columnMenuSortAsc: 'Sortuj rosnąco',
                columnMenuSortDesc: 'Sortuj malejąco',
                columnMenuUnsort: 'Brak sortowania',
                columnMenuShowColumns: 'Pokaż kolumnę',
                columnMenuFilter: 'Filtruj',
                columnMenuHideColumn: 'Ukryj kolumnę',
              }}    
            />
          </div>
        </Card>
      </Card>
    </>
  );
}

export default DataTable