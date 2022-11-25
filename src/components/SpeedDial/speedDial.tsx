import React from 'react'
import * as mui from '@mui/material'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

const actions = [
  { name: 'Zamów lekcje', icon: <ControlPointOutlinedIcon/> }
]

export const SpeedDial = () => {
  return (
    <mui.Box>
      <mui.SpeedDial
        ariaLabel='Szybka akcja'
        sx={{position: 'absolute', bottom: 16, right: 16}}
        icon={<mui.SpeedDialIcon />}>
          {actions.map((action) => (
            <mui.SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
      </mui.SpeedDial>
    </mui.Box>
  )
}