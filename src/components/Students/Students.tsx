import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, AppDispatch } from "../../app/store";
import { getUser } from "../../features/auth/authSlice";
import { getTeacherQueue } from "../../features/queue/queueSlice";
import { getStudentData } from "../../features/users/studentSlice";
import NavBar from "../Navbar/navbar"
import Spinner from "../Spinner/spinner";
import DataTable from "./Elements/QueueTable";

const Students = () => {
  const navigate = useNavigate()
  const {user, isError, message} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {queue, isLoading: queueLoading, isError: queueError, message: queueMessage, isSuccess: queueSuccess} = useSelector(
    (state: RootState) => state.queueArr
  )
  
  const {students, isLoadingStudent, isErrorStudent, messageStudent} = useSelector(
    (state: RootState) => state.studentsArr
  );

  const userId = user?._id;
  
  const getTeacherQueueFunc = (dispatched: AppDispatch) => new Promise<void>(async (resolve, reject) => {
    await dispatched(getUser(user));
    await dispatched(getTeacherQueue(userId));
    resolve();
  })

  useEffect(() => {
    if(isErrorStudent) {
      toast.error(messageStudent);
    }
    if(isError) {
      toast.error(message);
    }
    if(!user) {
      navigate('/signin');
    }
    else {
      getTeacherQueueFunc(dispatch).then(() => {
        if(user && 'students' in user) {
          const queueIds = queue.map((item: any) => item.student);
          const studentsIds = user.students;
          const ids = queueIds.concat(studentsIds)
          if(ids.length > 0) {
            dispatch(getStudentData(ids));
          }
        }
      })
    }
    
    if(!user?.isTeacher){
      navigate('/');
    }
  }, [queueError, queueMessage, isErrorStudent, messageStudent, dispatch])

  if(isLoadingStudent || queueLoading ) {
    return (
      <>
        <NavBar />
        <Spinner />
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className="tables">
        <DataTable students={students} queue={queue} />
      </div>
    </>
  )
}

export default Students