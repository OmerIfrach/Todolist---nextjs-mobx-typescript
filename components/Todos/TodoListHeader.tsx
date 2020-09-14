import React from 'react'

const TodoCheckBox = () => {
    return (
        <div className="todoListHeader">
            <span></span>
            <span className="noShowOnMobile">תאריך יצירת פתק</span>
            <span className="noShowOnMobile">תאריך שינוי אחרון</span>
            <span>שם פתק</span>
            <span>מצב פתק</span>
        </div>
    )
}

export default TodoCheckBox
