import {FilterValueType, TodolistType} from "./App";


export const TodolistReducer = (state: Array<TodolistType>, action: GeneralTodolistType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            return [...state, {id: action.payload.newId, title: action.payload.title, filter: 'all'}]
        }
        case 'REMOVE_TODOLIST': {
            return state.filter(item => item.id !== action.payload.idT)
        }
        case 'CHANGE_FILTER': {
            let filter = action.payload.filter
            return state.map(item => item.id === action.payload.idT ? {...item, filter} : item)
        }
        case 'CHANGE_TODOLIST_TITLE' : {
            let title = action.payload.title
            return state.map(item => item.id === action.payload.idT ? {...item, title} : item)
        }
        default :
            return state
    }
}


type GeneralTodolistType = AddTodolistType | RemoveTodolistType | ChangeFilterType | ChangeTodolistTitleType

type AddTodolistType = ReturnType<typeof addTodolistAC>;

export const addTodolistAC = (title: string, newId: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            newId
        }
    } as const
}

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (idT: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            idT
        }

    } as const
}

type ChangeFilterType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (idT: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            idT,
            filter
        }

    } as const
}

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (idT: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            idT,
            title
        }
    } as const
}