import {TasksStateType} from "./App";
import {v1} from "uuid";

export const TaskReducer = (state: TasksStateType, action: GeneralTasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {

            return {
                ...state,
                [action.payload.idT]: state[action.payload.idT].filter(item => item.id !== action.payload.taskId)
            }
        }
        case 'CHECKBOX_HANDLER': {

            return {
                ...state,
                [action.payload.idT]: state[action.payload.idT].map(item => item.id === action.payload.taskId ? {
                    ...item,
                    isDone: action.payload.isDone
                } : item)
            }
        }
        case 'ADD_TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }

        }
        case 'CHANGE_TASK_TITLE' : {
            return {
                ...state,
                [action.payload.idT]: state[action.payload.idT].map(item => item.id === action.payload.taskId ? {
                    ...item,
                    title: action.payload.title
                } : item)
            }
        }
        case 'ADD_NEW_TASKS' : {
            return {...state, [action.payload.newId]: []}
        }
        case 'REMOVE_TODOLIST_TASK': {
            delete state[action.payload.idT]
            return state
        }

        default :
            return state
    }
}


export type GeneralTasksType =
    RemoveTaskType
    | CheckboxHandlerType
    | AddTaskType
    | ChangeTaskTitleType
    | AddNewTasksType
    | RemoveTodolistTaskType

type RemoveTaskType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (idT: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            idT: idT,
            taskId: taskId
        }
    } as const
}

type CheckboxHandlerType = ReturnType<typeof checkboxHandlerAC>

export const checkboxHandlerAC = (idT: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHECKBOX_HANDLER',
        payload: {
            idT,
            taskId,
            isDone

        }
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (idT: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            idT, taskId, title
        }
    } as const
}

type AddNewTasksType = ReturnType<typeof addNewTasksAC>

export const addNewTasksAC = (newId: string) => {
    return {
        type: 'ADD_NEW_TASKS',
        payload: {
            newId
        }
    } as const
}

type RemoveTodolistTaskType = ReturnType<typeof removeTodolistTaskAC>

export const removeTodolistTaskAC = (idT: string) => {
    return {
        type: 'REMOVE_TODOLIST_TASK',
        payload: {
            idT
        }
    } as const
}