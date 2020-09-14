import React from 'react'
import { inject, observer } from 'mobx-react'
import Todo from './Todo/Todo'
import TodoListHeader from './TodoListHeader'
import { toast, ToastContainer } from 'react-nextjs-toast'
import TodoStore from '../../mobx/stores/data/todos/todo-store'

interface Props {
    store?: TodoStore
}

@inject('store') @observer
class TodoList extends React.Component<Props> {
    state = {
        addTodo: ""
    }
    async componentDidMount() {
        const resultMsg = await this.props.store.InitTodo()
        toast.notify(resultMsg.msg, { duration: 5, type: resultMsg.type, title: resultMsg.title })
    }


    toggleTodoState = async (id: string): Promise<void> => {
        const resultMsg = await this.props.store.getTodo(id).toggleTodo();
        toast.notify(resultMsg.msg, { duration: 5, type: resultMsg.type, title: resultMsg.title })
    }

    removeTodo = async (id: string): Promise<void> => {
        const resultMsg = await this.props.store.removeTodo(id)
        toast.notify(resultMsg.msg, { duration: 5, type: resultMsg.type, title: resultMsg.title })
    }

    createNewTodo = async (): Promise<void> => {
        const newTodo = this.state.addTodo.trim();
        if (newTodo) {
            const resultMsg = await this.props.store.addTodo(newTodo)
            toast.notify(resultMsg.msg, { duration: 5, type: resultMsg.type, title: resultMsg.title })
        }
        else {
            toast.notify("משימה לא יכולה להיות ריקה", { duration: 5, type: "error", title: "פעולה נכשלה" })
        }
    }

    render() {
        return (
            <div className="todosContainer">
                <h3 className="renderMessageContainer">{this.props.store.isServer?"רונדר בצד לקוח":"רונדר בצד שרת"}</h3>
                <ToastContainer align={"left"} />
                <h3 className="TodosTitle">פתקים</h3>
                {
                    this.props.store && this.props.store.getAllTodos().length > 0 &&
                    <TodoListHeader />
                }
                {
                    this.props.store && this.props.store.getAllTodos().length > 0 ?
                        this.props.store.getAllTodos().map(todo => {
                            return <Todo
                                key={todo.id}
                                name={todo.name}
                                isCompleted={todo.isCompleted}
                                createdAt={todo.createdAt}
                                updatedAt={todo.updatedAt}
                                toggleTodoState={() => { this.toggleTodoState(todo.id) }}
                                removeTodo={() => { this.removeTodo(todo.id) }}
                            />
                        })
                        : <div className="NoTodosToDisplayMsg">אין פתקים למשתמש זה</div>
                }
                <h3 className="AddTodoTitle">הוסף משימה</h3>
                <input className="AddTodoInput" value={this.state.addTodo} onChange={(e) => {
                    this.setState({
                        addTodo: e.target.value
                    })
                }} />
                <button className="AddTodoBtn" onClick={this.createNewTodo}>הוסף משימה</button>

            </div>
        )
    }
}

export default TodoList
