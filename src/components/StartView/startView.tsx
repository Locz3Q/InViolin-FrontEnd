import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { User } from '../../Interfaces/types';

// Teacher
// username: Nauczyciel
// password: Nauczyciel123

// Student
// username: Student123
// password: Student123

// username: StudentTest
// password: Student123
export const StartView = () => {
  const {user} = useSelector((state: RootState) => state.auth)

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
    </Box>
  )

  const loggedIn = (
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
        Witaj {user?.name}!
      </Paper>
    </Box>
  )
  return (
    <>
      {user ? loggedIn : notLoggedin}
    </>
  )
}
