import React from 'react'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import { ListItemButton, ListItemText } from '@mui/material'
import './BrandsPopoverMenu.scss'

const BrandsPopoverMenu = ({brandsPopover, anchorEl, open, onClose}) => {
  return (
    <Popover
      open = {open}
      anchorEl = {anchorEl}
      onClose = {onClose}
      anchorOrigin = {{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin = {{
        vertical: 'top',
        horizontal: 'center'
      }}
      className='outer'
    >
      <h2 className='heading'>Top Brands</h2>
      <List className='main-container'>
        {brandsPopover?.data?.map((item) => (
          <ListItemButton key={item.id} className='listItem'>
          <img src={process.env.REACT_APP_DEV_URL + item.attributes.brandImage.data[0].attributes.url}/>
        </ListItemButton>
        ))}
      </List>
    </Popover>
  )
}

export default BrandsPopoverMenu