import { Card, Typography } from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const LessonTable = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const {lessons} = useSelector((state: RootState) => state.lessonsArr);
  const {teacher, isLoading, isError, message} = useSelector(
    (state: any) => state.teachers
  );
  const {students} = useSelector(
    (state: RootState) => state.studentsArr
  );

  function getStudentLessonsData(): any[] {
    if(lessons && teacher){
      const lessonsMap = lessons.map((lesson) => {
        const dayjsToDate = dayjs(lesson.date).toDate();
        const YYYY = dayjsToDate.getFullYear();
        var MM = (dayjsToDate.getMonth() + 1).toString();
        var DD = dayjsToDate.getDate().toString();
        var HH = dayjsToDate.getHours().toString();
        var MIN = dayjsToDate.getMinutes().toString();

        if (parseInt(DD) < 10) DD = '0' + DD;
        if (parseInt(MM) < 10) MM = '0' + MM;
        if (parseInt(HH) < 10) HH = '0' + HH;
        if (parseInt(MIN) < 10) MIN = '0' + MIN;

        const formatDate = `${DD}.${MM}.${YYYY}  ${HH}:${MIN}`
        return {id: lesson._id, teacherId: lesson.teacher, date: formatDate, fullName: `${teacher.name} ${teacher.surname}`, topic: lesson.topic, level: teacher.level, remote: (lesson.isRemote ? 'Zdalnie' : 'Stacjonarnie')}
      })
      return lessonsMap;
    }
    return []
  }

  function getTeacherLessonsData(): any[] {
    if(lessons && students.length > 0){
      const lessonsMap = lessons.map((lesson) => {
        const filterStudents = students.filter((student) => {
          return student._id === lesson.student;
        })
        if(filterStudents.length !== 0) {
          const dayjsToDate = dayjs(lesson.date).toDate();
          const YYYY = dayjsToDate.getFullYear();
          var MM = (dayjsToDate.getMonth() + 1).toString();
          var DD = dayjsToDate.getDate().toString();
          var HH = dayjsToDate.getHours().toString();
          var MIN = dayjsToDate.getMinutes().toString();

          if (parseInt(DD) < 10) DD = '0' + DD;
          if (parseInt(MM) < 10) MM = '0' + MM;
          if (parseInt(HH) < 10) HH = '0' + HH;
          if (parseInt(MIN) < 10) MIN = '0' + MIN;

          const formatDate = `${DD}.${MM}.${YYYY}  ${HH}:${MIN}`
          return {id: lesson._id, studentId: lesson.student, date: formatDate, fullName: `${filterStudents[0].name} ${filterStudents[0].surname}`, topic: lesson.topic, level: filterStudents[0].level, remote: (lesson.isRemote ? 'Zdalnie' : 'Stacjonarnie')}
        }
      })
      return lessonsMap;
    }
    return []
  }

  const columnsTeacher: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: (user?.isTeacher ? 'studentId' : 'teacherId'), headerName: (user?.isTeacher ? 'ID studenta' : 'ID nauczyciela'), width: 90 },
    { field: 'date', headerName: 'Data i Czas', width: 140 },
    { field: 'fullName', headerName: (user?.isTeacher ? 'Imię i Nazwisko studenta' : 'Imię i Nazwisko Nauczyciela'), width: 200 },
    {
      field: 'topic',
      headerName: 'Temat',
      width: 350,
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
      width: 160,
    },
  ];
  
  return (
    <>
      <Card sx={{display: 'grid', padding: 2, textAlign: 'left', backgroundColor: '#2A160C', color: '#FFFFFF'}}>
        <h2>Twoje Lekcje</h2>
        <Card sx={{margin: '0 0 30px 0'}}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                  studentId: false,
                  level: user?.isTeacher ? true : false
                }
              }
            }}
              rows={user?.isTeacher ? getTeacherLessonsData() : getStudentLessonsData()}
              columns={columnsTeacher}
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
                noRowsLabel: 'Nie masz zaplanowanych żadnych lekcji'
              }}    
            />
          </div>
        </Card>
      </Card>
    </>
  );
}

export default LessonTable