import NavBar from "../Navbar/navbar";
import { SpeedAction } from "../SpeedDial/speedDial";
import { getAllTeachers, reset } from "../../features/Teachers/teacherSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/spinner";
import { AppDispatch } from "../../app/store";
import { User } from "../../Interfaces/types";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import photo from "../../Resources/images/teacher.jpg"

const Teachers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {teachers, isLoading, isError, message} = useSelector(
    (state: any) => state.teachers
  )

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    dispatch(getAllTeachers());

    return () => {
      dispatch(reset());
    }
  }, [isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }
 
  return (
    <>
      <NavBar />
      {teachers.length > 0 ? (
        <div className="teachers">
          {teachers.map((teacher: User) => (
            <Card sx={{ maxWidth: 345, m: 2 }}>
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
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, rangingLizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents exceLizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents exceLizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents exceLizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents exceLizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents exce across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <h3>No teachers</h3>
      )}
      <SpeedAction />
    </>
  )
}

export default Teachers