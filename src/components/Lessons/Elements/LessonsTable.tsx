import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { GridColDef, GridValueGetterParams, DataGrid, GridApi, GridCellValue } from '@mui/x-data-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { Lesson, User } from '../../../Interfaces/types';

const LessonTable = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const {lessons, isLoading: lessonLoading} = useSelector((state: RootState) => state.lessonsArr);
  const {teacher, isLoading, isError, message} = useSelector(
    (state: RootState) => state.teachers
  );
  const {students, isLoadingStudent, isErrorStudent, messageStudent} = useSelector(
    (state: RootState) => state.studentsArr
  );

  function getTeacherLessonsData(): any[] {
    if(lessons && students.length > 0){
      const lessonsMap = lessons.map((lesson) => {
        const filterStudents = students.filter((student) => {
          // console.log(student._id);
          // console.log(lesson.student);
          // console.log(student._id === lesson.student)
          return student._id === lesson.student;
        })
        if(filterStudents.length !== 0) {
          return {id: lesson.student, date: lesson.date, fullName: `${filterStudents[0].name} ${filterStudents[0].surname}`, topic: lesson.topic, level: filterStudents[0].level, type: (lesson.isRemote ? 'Zdalnie' : 'Stacjonarnie')}
        }
      })
      return lessonsMap;
    }
    return []
  }

  const columnsStudents: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Data i Czas', width: 180 },
    { field: 'fullName', headerName: 'Imię i Nazwisko studenta', width: 130 },
    {
      field: 'topic',
      headerName: 'Temat',
      width: 150,
    },
    {
      field: 'level',
      headerName: 'Poziom umiejętności',
      type: 'number',
      width: 150,
    },
    {
      field: 'remote',
      headerName: 'Tryb',
      type: 'boolean',
      width: 160,
    },
  ];

  React.useEffect(() => {
    console.log('Table')
  })
  
  return (
    <>
      <Card sx={{display: 'grid', padding: 2, textAlign: 'left', backgroundColor: '#2A160C', color: '#FFFFFF'}}>
        <h2>Twoje Lekcje</h2>
        <Card sx={{margin: '0 0 30px 0'}}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={getTeacherLessonsData()}
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
      </Card>
    </>
  );
}

export default LessonTable