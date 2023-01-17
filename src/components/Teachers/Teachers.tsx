import NavBar from "../Navbar/navbar";
import { SpeedAction } from "../SpeedDial/speedDial";
import { getAllTeachers, reset } from "../../features/Teachers/teacherSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/spinner";
import { AppDispatch, RootState } from "../../app/store";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import photo from "../../Resources/images/teacher.jpg"
import { createDocument, getQueue, reset as queueReset } from "../../features/queue/queueSlice";
import { toast } from "react-toastify";
import { Teacher } from "../../Interfaces/types";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { getUser } from "../../features/auth/authSlice";

const Teachers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth);
  const {teachers, isLoading, isError, message} = useSelector(
    (state: RootState) => state.teachers
  )

  const {queue, isLoading: queueLoading, isError: queueError, message: queueMessage, isSuccess: queueSuccess} = useSelector(
    (state: RootState) => state.queueArr
  )

  const [queueItem, setQueueItem] = useState({
    student: user?._id,
    teacher: '',
    context: 'Prośba o nauczanie'
  });

  const {student, teacher, context} = queueItem;

  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    dispatch(getUser(user))
    dispatch(getQueue(student));
    dispatch(getAllTeachers());
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const onClick = async (teacherData: Teacher) => {
    if(user && 'teacher' in user && !user.teacher){
      const data = {
        student: user._id,
        teacher: teacherData._id,
        context
      }
      if(queue.length === 0) {
        await dispatch(createDocument(data));
        toast.dismiss();
        toast.success(`Wysłano prośbę do ${teacherData.name} ${teacherData.surname}`);
      }
      else {
        toast.dismiss()
        toast.error('Można wysłać tylko jedną prośbę');
        toast.info('Musisz poczekać aż nauczyciel zaakceptuje twoją prośbą lub ją odrzuci');
      }
    }
    else {
      toast.error('Masz już przypisanego nauczyciela');
    }
    
  }

  if(isLoading) {
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
      <Grid2 container spacing={2}>
        {teachers.length > 0 ? (
          <div className="teachers">
            {teachers.map((teacher: any) => (
              <Card sx={{ m: 2 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={photo}
                  title="green iguana"
                  />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {teacher.name} {teacher.surname}
                  </Typography>
                  <Typography variant="h6">
                    Poziom Nauczania: {teacher.level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {teacher._id}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => onClick(teacher)} size="small" key={teacher._id} title='Wyślij prośbę o indywidualne nauczanie'>Wyślij prośbę</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        ) : (
          <h3>No teachers</h3>
        )}
        <SpeedAction />
      </Grid2>
    </>
  )
}

export default Teachers