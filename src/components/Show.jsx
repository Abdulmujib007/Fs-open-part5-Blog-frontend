import React from 'react'
import { useState } from 'react'

const Show = (props) => {
  const [visible,setVisible] =useState(false)

  const hide = { display:visible ? '' : 'none' }
  const show = { display:visible ? 'none' : '' }

  const toggleVisibility = () => setVisible(!visible)
  return (
    <div>
      <div style={show}>
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div className='show' style={hide}>
        <button  style={{ display:'block' }} onClick={toggleVisibility}>hide</button>
        {props.children}

      </div>
    </div>
  )
}

export default Show
