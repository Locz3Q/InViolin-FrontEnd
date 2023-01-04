import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const StartView = () => {
  return (
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
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
    </Box>
  )
}
