import * as React from 'react';
import Box from '@mui/material/Box';
import Spinner from '../Spinner/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { getTeacherByID, reset } from '../../features/Teachers/teacherSlice';
import { getTeacherStudentsData, resetStudent } from '../../features/users/studentSlice';
import { getUser, reset as authReset } from '../../features/auth/authSlice';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import StudentTable from './Elements/StudentTable';
import Card from '@mui/material/Card/Card';
import photo from "../../Resources/images/teacher.png"
import { getLessons } from '../../features/lessons/lessonSlice';
import { Link } from 'react-router-dom';
import Logo from '../../Resources/Logos/logo-no-text.png';
import dayjs, { Dayjs } from 'dayjs';

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

interface CalculateDate {
  id: string | undefined,
  date: string
}

export const StartView = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const {teacher, isLoading, isError, message} = useSelector(
    (state: any) => state.teachers
  );
  const {students, isLoadingStudent, isErrorStudent, messageStudent} = useSelector(
    (state: RootState) => state.studentsArr
  );
  const {lessons} = useSelector(
    (state: RootState) => state.lessonsArr
  );
  
  const getStringdate = (date: Dayjs) => {
    const dayjsToDate = dayjs(date).toDate();
    const YYYY = dayjsToDate.getFullYear().toString();
    var MM = (dayjsToDate.getMonth() + 1).toString();
    var DD = dayjsToDate.getDate().toString();
    var HH = dayjsToDate.getHours().toString();
    var MIN = dayjsToDate.getMinutes().toString();

    if (parseInt(DD) < 10) DD = '0' + DD;
    if (parseInt(MM) < 10) MM = '0' + MM;
    if (parseInt(HH) < 10) HH = '0' + HH;
    if (parseInt(MIN) < 10) MIN = '0' + MIN;

    return {YYYY, MM, DD, HH, MIN}
  }

  const nearestLesson = () => {
    var tempLessonId: CalculateDate[] = []
    const smalestDate = Math.min(...lessons.map((lesson) => {
      const {YYYY, MM, DD, HH, MIN} = getStringdate(lesson.date)

      const dateMerged = `${YYYY}${MM}${DD}${HH}${MIN}`;
      const lessonId = lesson._id
      tempLessonId.push({
        id: lessonId,
        date: dateMerged
      })
      return parseInt(dateMerged);
    }))
    const nearest = tempLessonId.filter(e => e.date === smalestDate.toString())
    const nearestUserLesson = lessons.filter(e => e._id === nearest[0].id)
    return nearestUserLesson[0]
  }

  const formatDate = (date: {YYYY: string, MM: string, DD: string, HH: string, MIN: string}) => {
    return `${date.DD}.${date.MM}.${date.YYYY}  ${date.HH}:${date.MIN}`;
  }

  const getNearestLessonStudent = (id: string) => {
    return students.filter(student => student._id === id)
  }


  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    dispatch(getUser(user));
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
  }, [isErrorStudent, messageStudent, isError, message, dispatch]);

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
      <Card elevation={3} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "40px 290px 20px", justifyContent: "center" }}>
        <>
          Twoi studenci:<br/>
          <Card elevation={0} sx={{ maxWidth:'100%', m: 2 }}>
            {(user && 'students' in user && user.students.length > 0) ? (<StudentTable students={students}/>) : (
              <div className='no-data' style={{fontSize: '40px'}}>
                Nie masz przypisanych studentów
              </div>
              )
            }
          </Card>
          <div >
            <Button variant="contained" onClick={onClick}>Odświerz</Button>
          </div>
        </>
      </Card>
      <div style={{backgroundImage: `url(${Logo})`, backgroundSize: 'cover'}}>
        <Card elevation={4} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "70px 260px 50px", justifyContent: "center", opacity: 0.9 }}>
          Cyfrowy Stroik<br/>
          <div className='no-data' style={{fontSize: '30px', opacity: 1}}>
            Przygotuj się do zajęć i nastrój skrzypce za pomocą cyfrowego stroika
          </div>
          <div>
            <Link to='notecordApp'>
              <Button variant="contained">Nastrój się</Button>
            </Link>
          </div>
        </Card>
      </div>
      <Card elevation={3} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "60px 130px 140px", justifyContent: "center" }}>
        Twoja najbliższa lekcja
        {(user && user?.lessons?.length > 0 && nearestLesson() !== undefined) ? (
          <>
            <Typography fontSize={40}>
              Termin zajęć:
              <Typography fontSize={40}>
                {`${formatDate(getStringdate(nearestLesson().date))}`}
              </Typography>
            </Typography>
            <Typography fontSize={30}>
              Temat:
              <Typography fontSize={20}>
                {`${nearestLesson().topic}`}
              </Typography>
            </Typography>
            {(user?.isTeacher) ? (
              <Typography fontSize={30}>
                Student: {`${getNearestLessonStudent(nearestLesson().student)[0]?.name} ${getNearestLessonStudent(nearestLesson().student)[0]?.surname}`}
              </Typography>
            ) : ''}
          </>
        ) : (
          <div className='no-data' style={{fontSize: '40px'}}>
            Brak nadchodzących lekcji
          </div>
        )}
      </Card>
  </>
  );

  const studentView = (
    <>
      <Card elevation={4} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "30px 300px 20px", justifyContent: "center"}}>
        Twój nauczyciel:<br/>
        {teacher?.name ? (
          <Card elevation={0} sx={{ maxWidth:'100%', m: 2 }}>
            <CardMedia
              sx={{ height: 190 }}
              image={photo}
              title={`${teacher.name} ${teacher.surname}`}
              />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {teacher.name} {teacher.surname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {teacher.email}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <div className='no-data' style={{fontSize: '40px'}}>
            Brak Nauczyciela
          </div>
        )}
        <div style={{ alignItems: 'left', justifyContent: 'left'}}>
          <Button variant="contained" onClick={onClick}>Odświerz</Button>
        </div>
      </Card>
      <div style={{backgroundImage: `url(${Logo})`, backgroundSize: 'cover'}}>
        <Card elevation={4} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "70px 260px 50px", justifyContent: "center", opacity: 0.9 }}>
          Cyfrowy Stroik<br/>
          <div className='no-data' style={{fontSize: '30px', opacity: 1}}>
            Przygotuj się do zajęć i nastrój skrzypce za pomocą cyfrowego stroika
          </div>
          <div>
            <Link to='notecordApp'>
              <Button variant="contained">Nastrój się</Button>
            </Link>
          </div>
        </Card>
      </div>
      <Card elevation={4} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "40px 180px 20px", justifyContent: "center" }}>
        Twoja najbliższa lekcja
        {nearestLesson() !== undefined ? (
          <>
            <Typography fontSize={40}>
              Termin zajęć:
              <Typography fontSize={40}>
                {`${formatDate(getStringdate(nearestLesson().date))}`}
              </Typography>
            </Typography>
            <Typography fontSize={30}>
              Temat:
              <Typography fontSize={20}>
                {`${nearestLesson().topic}`}
              </Typography>
            </Typography>
          </>
        ) : (
          <div className='no-data' style={{fontSize: '40px'}}>
            Brak nadchodzących lekcji
          </div>
        )}
      </Card>
    </>
  );

  const notLoggedin = (
    <>
      <div className='display-flex'>
        Witaj!
        Zaloguj się aby móc korzystać z lekcji jako student<br/>lub przeprowadzać lekcje jako nauczyciel.<br/><br/>Jeśli nie masz konta utwórz je i uzupełnij potrzebne dane.
      </div>
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
        <div style={{backgroundImage: `url(${Logo})`, backgroundSize: 'cover'}}>
          <Card elevation={4} sx={{ display: "grid", padding: "10px 2px", gridTemplateRows: "40px 298px 40px", justifyContent: "center", opacity: 0.9 }}>
            Cyfrowy Stroik<br/>
            <h6>Jako niezalogowany użytkownik masz możliwość nastrojenia się za pomocą cyfrowego stroika</h6>
            <div>
              <Link to='notecordApp'>
                <Button variant="contained">Nastrój się</Button>
              </Link>
            </div>
          </Card>
        </div>
      </Box>
    </>
  )

  const loggedIn = (
    <>
      <div className='display-flex'>
        Witaj {user?.name} {user?.surname}!
      </div>
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
