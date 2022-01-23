import {v1} from "uuid";
import {TodolistReducer} from "./TodolistReducer";
import {TodolistType} from "./App";


test('case ADD_TODOLIST test ', () => {
    let todolistId1 = v1();
    let todolistId2 = v1()
    let state: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let newState = TodolistReducer(state, {
        type: 'ADD_TODOLIST', payload: {
            newId: 'abc', title: "newTitle"
        }
    })

    expect(newState[2].id).toBe('abc')
    expect(newState[2].title).toBe('newTitle')


})