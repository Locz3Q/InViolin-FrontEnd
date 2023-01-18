import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { getTeacherByID, reset } from '../../features/Teachers/teacherSlice';
import { getTeacherStudentsData, resetStudent } from '../../features/users/studentSlice';
import { reset as authReset } from '../../features/auth/authSlice'
import NavBar from '../Navbar/navbar'
import { SpeedAction } from '../SpeedDial/speedDial'
import LessonTable from './Elements/LessonsTable';
import { getLessons } from '../../features/lessons/lessonSlice';
import Spinner from '../Spinner/spinner';

const Lessons = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const {lessons, isLoading: lessonLoading} = useSelector((state: RootState) => state.lessonsArr);
  const {teacher, isLoading, isError, message} = useSelector(
    (state: RootState) => state.teachers
  );
  const {students, isLoadingStudent, isErrorStudent, messageStudent} = useSelector(
    (state: RootState) => state.studentsArr
  );
  const dispatch = useDispatch<AppDispatch>();
  
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) {
      navigate('/signin');
    }
    if(user){
      if(!user?.isTeacher && 'teacher' in user && user.teacher) {
        dispatch(getTeacherByID(user.teacher));
      }
      else if(user?.isTeacher && 'students' in user && user.students.length > 0) {
        dispatch(getTeacherStudentsData(user.students));
      }
    }

  }, [user, dispatch])

  // if(isLoading || lessonLoading || isLoadingStudent) {
  //   return (
  //     <>
  //       <NavBar />
  //       <Spinner />
  //     </>
  //   )
  // }

  const lessonsView = (
    <>
      <NavBar/>
      <div className="tables">
        <LessonTable />  
      </div>
    </>
  )
  return (
    <>
      {user ? lessonsView : (<></>)}
    </>
  )
}

export default Lessons