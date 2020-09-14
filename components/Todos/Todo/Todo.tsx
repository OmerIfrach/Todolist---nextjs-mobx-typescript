import React, { ChangeEvent, Fragment } from 'react'
import TodoCheckBox from './TodoCheckBox'

interface Props {
    name: string,
    isCompleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    toggleTodoState: Function,
    removeTodo: Function,
}

class Todo extends React.Component<Props> {

    parseDate = (date: Date): string => {
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let parsedDate: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
        return parsedDate;
    }

    render() {
        return (
            <div className="todoContainer">
                <button className="removeTodoBtn" onClick={() => { this.props.removeTodo() }}>הסר משימה</button>
                <span className="noShowOnMobile">{this.parseDate(this.props.createdAt)}</span>
                <span className="noShowOnMobile">{this.parseDate(this.props.updatedAt)}</span>

                <span>{this.props.name}</span>
                <span className="TodoCheckboxContainer">
                    <TodoCheckBox isCompleted={this.props.isCompleted} changed={this.props.toggleTodoState} />
                </span>

            </div>
        )
    }
}

export default Todo
