import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Spinner from '../Spinner/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { getTeacherByID, reset } from '../../features/Teachers/teacherSlice';
import { getTeacherStudentsData, resetStudent } from '../../features/users/studentSlice';
import { getUser, reset as authReset } from '../../features/auth/authSlice';
import { User } from '../../Interfaces/types';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import StudentTable from './Elements/StudentTable';
import Card from '@mui/material/Card/Card';
import photo from "../../Resources/images/teacher.jpg"
import { getLessons } from '../../features/lessons/lessonSlice';

// Teacher
// username: Nauczyciel
// password: Nauczyciel123

// powiadomienia
// username: Janek
// password: Janek123456789

// Student
// username: Student123
// password: Student123

// username: StudentTest
// password: Student123
export const StartView = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const {teacher, isLoading, isError, message} = useSelector(
    (state: any) => state.teachers
  );
  const {students, isLoadingStudent, isErrorStudent, messageStudent} = useSelector(
    (state: any) => state.studentsArr
  );
  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    if(user){
      if(!user?.isTeacher && 'teacher' in user && user.teacher) {
        dispatch(getTeacherByID(user.teacher));
      }
      else if(user?.isTeacher && 'students' in user && user.students.length > 0) {
        dispatch(getTeacherStudentsData(user.students));
      }
      if(user.lessons?.length > 0) {
        const lessons = user.lessons;
        dispatch(getLessons(lessons));
      }
    }
    return () => {
      dispatch(reset());
      dispatch(authReset());
      dispatch(resetStudent());
    }
  }, [user, isErrorStudent, messageStudent, isError, message, dispatch]);

  if(isLoading || isLoadingStudent) {
    return (
      <Spinner />
    )
  };

  const onClick = () => {
    dispatch(getUser(user))
  }

  const teacherView = (
    <>
      <Card elevation={3} sx={{ display: "grid", padding: "10px", gridTemplateRows: "40px 290px 20px", justifyContent: "center" }}>
        <>
          Twoi studenci:<br/>
          <Card elevation={0} sx={{ maxWidth:'100%', m: 2 }}>
            {(user && 'students' in user && user.students.length > 0) ? (<StudentTable students={students}/>) : (<h5>Nie masz przypisanych studentów</h5>)}
          </Card>
          <div >
            <Button variant="contained" onClick={onClick}>Odświerz</Button>
          </div>
        </>
      </Card>
      <Card elevation={3} sx={{ display: "grid", padding: "10px", gridTemplateRows: "40px 290px 20px", justifyContent: "center" }}>
        NoteCord<br/>
        <h6>Przenieś dźwięk na cyfrowy papier</h6>
      </Card>
      <Card elevation={3} sx={{ display: "grid", padding: "10px", gridTemplateRows: "40px 290px 20px", justifyContent: "center" }}>
        Twoja najbliższa lekcja
      </Card>
  </>
  );

  const studentView = (
    <>
      <Card elevation={4} sx={{ display: "grid", padding: "10px", gridTemplateRows: "40px 290px 20px", justifyContent: "center" }}>
        Twój nauczyciel:<br/>
        {teacher.name ? (
          <Card sx={{ maxWidth:'100%', m: 2 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={photo}
              title="Nauczyciel"
              />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {teacher.name} {teacher.surname}
              </Typography>
              <Typography variant="h6">
                Poziom Nauczania: {teacher.level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {teacher.email}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <h4>Brak Nauczyciela</h4>
        )}
        <div style={{ alignItems: 'left', justifyContent: 'left'}}>
          <Button variant="contained" onClick={onClick}>Odświerz</Button>
        </div>
      </Card>
      <Card elevation={4} sx={{ display: "grid", padding: "10px" }}>
        NoteCord<br/>
        <h6>Przenieś dźwięk na cyfrowy papier</h6>
      </Card>
      <Card elevation={4} sx={{ display: "grid", padding: "10px" }}>
        Twoja najbliższa lekcja
      </Card>
    </>
  );

  const notLoggedin = (
    <Box
      sx={{
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 4,
          width: 400,
          height: 400,
        },
      }}
    >
      <Paper elevation={3}>
        Zaloguj sie
      </Paper>
      <Paper elevation={3}>
        Zaloguj sie
      </Paper>
    </Box>
  )

  const loggedIn = (
    <>
      Witaj {user?.name} {user?.surname}!
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 4,
            width: 400,
            height: 400,
          },
        }}
        >
        {user?.isTeacher ? teacherView : studentView}
      </Box>
    </>
  )
  // if(isLoading) {
  //   return (
  //   <>
  //     <Spinner />
  //   </>
  //   )
  // }
  return (
    <div className='startView'>
      {user ? loggedIn : notLoggedin}
    </div>
  )
}
