import { action, observable } from "mobx";
import Todo from "./todo";
import axios from 'axios';
import INotification from "../../../../Interface/INotification";

export default class TodoStore {
    @observable
    todoList: Todo[] = [];

    @observable
    isServer: boolean = false;

    constructor(isServer:boolean){
        this.isServer=isServer;
    }
    @action
    async addTodo(name: string) : Promise<INotification> {
        const addPostBody = {
            todoName: name
        }
        const resultMsg = axios.post(`http://localhost:5000/addTodo`, addPostBody).then(res => {
            const userTodo = res.data;
            if(userTodo){
                this.todoList.push(new Todo(userTodo._id, userTodo.name, userTodo.isCompleted, new Date(userTodo.createdAt), new Date(userTodo.updatedAt)));
                return {
                    msg: "משימה נוספה בהצלחה",
                    type: "success",
                    title: "פעולה בוצעה בהצלחה"
                }
            }
            else{
                return {
                    msg: "הוספת פתק נכשלה, יש למשתמש 10 פתקים כבר",
                    type: "error",
                    title: "פעולה נכשלה"
                }
            }
        })
        .catch(()=>{
            return {
                msg: "משימה נכשלה, נסה שוב מאוחר יותר",
                type: "error",
                title: "פעולה נכשלה"
            }
        })

        return resultMsg;
    }


    getTodo(id: string): Todo {
        return this.todoList.find(todo => todo.id === id);
    }
    
    getAllTodos():Todo[]{
        return this.todoList;
    }

    @action
    async removeTodo(id: string): Promise<INotification> {
        let urlToRemoveTodo: string = `http://localhost:5000/removeTodo?id=${id}`;
        const resultMsg = axios.get(urlToRemoveTodo)
            .then(res => {
                const todoToRemove = res.data;
                if (todoToRemove) {
                    const newTodoList: Todo[] = this.todoList.filter(todo => todo.id !== todoToRemove._id)
                    this.todoList = newTodoList;
                }
                return {
                    msg: "הפתק נמחק בהצלחה",
                    type: "success",
                    title: "פעולה בוצעה בהצלחה"
                }
            })
            .catch(() => {
                return {
                    msg: "מחיקת פתק נכשלה",
                    type: "error",
                    title: "פעולה נכשלה"
                }
            })

        return resultMsg;
    }

    @action
    async InitTodo() {
        let urlToGetTodos: string = `http://localhost:5000/getTodos?id`;
        const resultMsg = axios.get(urlToGetTodos)
            .then(res => {
                const userTodos: Todo[] = [];
                for (let todo of res.data) {
                    userTodos.push(new Todo(todo._id, todo.name, todo.isCompleted, new Date(todo.createdAt), new Date(todo.updatedAt)))
                }
                this.todoList = userTodos
                return {
                    msg: "טעינת משימות בוצעה בהצלחה",
                    type: "success",
                    title: "פעולה בוצעה בהצלחה"
                }
            })
            .catch(() => {
                return {
                    msg: "טעינת משימות נכשלה, אנא נסה מאוחר יותר",
                    type: "error",
                    title: "פעולה נכשלה"
                }
            })

        return resultMsg;
    }
}
