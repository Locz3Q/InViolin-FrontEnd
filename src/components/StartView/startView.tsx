import React from 'react'
import * as mui from '@mui/material'
import styled from '@emotion/styled';

export const StartView = () => {
  return (
    <mui.Grid container spacing={2}>
      <mui.Grid xs={6} md={8}>
        xs=6 md=8
      </mui.Grid>
      <mui.Grid xs={6} md={4}>
        xs=6 md=4 
      </mui.Grid>
      <mui.Grid xs={6} md={4}>
        xs=6 md=4 
      </mui.Grid>
      <mui.Grid xs={6} md={8}>
        xs=6 md=8 
      </mui.Grid>
    </mui.Grid>
  )
}
