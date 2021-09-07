import React from 'react'
import { useState,useImperativeHandle } from 'react'

// eslint-disable-next-line react/display-name
const Toggleable = React.forwardRef((props,ref) => {
  const [visible,setVisible] = useState(false)
  const hide = { display: visible ? '' : 'none' }
  const show = { display: visible ? 'none' : '' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref,() => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={show}>
        <button onClick={toggleVisibility}>{props.text}</button>
      </div>
      <div style={hide}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})



export default Toggleable
