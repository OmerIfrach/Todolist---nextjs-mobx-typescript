import React, { ChangeEvent } from 'react'

interface Props {
    isCompleted: boolean,
    changed: Function
}


const TodoCheckBox = (props: Props) => {
    return (

        <label className="CheckboxContainer">
            <input type="checkbox" checked={props.isCompleted} onChange={() => { props.changed() }} />
            <div className="checkmark"></div>
        </label>
    )
}

export default TodoCheckBox
