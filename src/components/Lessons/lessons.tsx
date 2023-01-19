import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { getUser } from '../../features/auth/authSlice';
import { getLessons } from '../../features/lessons/lessonSlice';
import { getTeacherByID } from '../../features/Teachers/teacherSlice';
import { getTeacherStudentsData } from '../../features/users/studentSlice';
import NavBar from '../Navbar/navbar'
import LessonTable from './Elements/LessonsTable';

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
    dispatch(getUser(user))
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

  }, [dispatch])

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