import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import NavBar from '../Navbar/navbar'
import { SpeedAction } from '../SpeedDial/speedDial'

const Lessons = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) {
      navigate('/signin');
    }
  })

  const lessons = (
    <>
      <NavBar/>
      <div>Lessons</div>
      <SpeedAction/>
    </>
  )
  return (
    <>
      {user ? lessons : (<></>)}
    </>
  )
}

export default Lessons