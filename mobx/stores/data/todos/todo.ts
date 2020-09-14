import { action, observable, reaction } from "mobx";
import axios from 'axios';
import INotification from "../../../../Interface/INotification";


export default class Todo {
    @observable
    id: string;

    @observable
    name: string;
    @observable
    isCompleted: boolean;

    @observable
    createdAt: Date
    @observable
    updatedAt: Date

    private readonly disposer: () => void;

    constructor(id: string, name: string, isCompleted: boolean, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        this.disposer = reaction(
            () => this.isCompleted,
            () => console.log(`${this.id}-Todo: ${this.name} changed to ${this.isCompleted ? 'Done' : 'Incomplete'}`)
        );
    }

    @action
    async toggleTodo(): Promise<INotification> {
        this.isCompleted = !this.isCompleted;
        const body = {
            id: this.id,
            todoState: this.isCompleted
        }
        const resultMsg = axios.post('http://localhost:5000/toggleTodo', body).then(res => {
            const userTodo = res.data;
            this.isCompleted = userTodo.isCompleted;
            console.log(userTodo,'userTodo')
            this.updatedAt = new Date(userTodo.updatedAt)
            return {
                msg: "משימה עודכנה בהצלחה",
                type: "success",
                title: "פעולה בוצעה בהצלחה"
            }
        })
            .catch(() => {
                return {
                    msg: "עדכון משימה נכשל",
                    type: "error",
                    title: "פעולה נכשלה"
                }
            })

        return resultMsg;
    }

    dispose() {
        this.disposer();
    }
}
