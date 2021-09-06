import React from 'react'
import { useState } from 'react'

const Toggleable = (props) => {
    const [visible,setVisible] = useState(false)
    const hide = {display: visible ? '' : 'none'}
    const show = {display: visible ? 'none' : ''}

    const toggleVisibility = () => setVisible(!visible)
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
}

export default Toggleable
