import {v1} from "uuid";
import {TaskReducer} from "./TaskReducer";


test('case REMOVE_TASK test', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const state = {
        [todolistId1]: [
            {id: 'adb', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    }


    let newState = TaskReducer(state, {type: 'REMOVE_TASK', payload: {idT: todolistId1, taskId: 'adb'}})
    expect(newState[todolistId1].length).toBe(2)


})
test('case CHECKBOX_HANDLER test', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const state = {
        [todolistId1]: [
            {id: 'adb', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    }

    let newState = TaskReducer(state, {
        type: 'CHECKBOX_HANDLER',
        payload: {idT: todolistId1, taskId: 'adb', isDone: false}
    })
    expect(newState[todolistId1][0].isDone).toBe(false)
})
test('case ADD_TASK test', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const state = {
        [todolistId1]: [
            {id: 'adb', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    }

    let newState = TaskReducer(state, {
        type: 'ADD_TASK', payload: {
            todolistId: todolistId1, title: 'NewTask'
        }
    })
    expect(newState[todolistId1].length).toBe(4)
})
test('case CHANGE_TASK_TITLE test', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const state = {
        [todolistId1]: [
            {id: 'adb', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    }
    let newState = TaskReducer(state, {
        type: 'CHANGE_TASK_TITLE', payload: {
            idT: todolistId1, title: 'NewTitle', taskId: 'adb'
        }
    })

    expect(newState[todolistId1][0].title).toBe('NewTitle')
})
test('case ADD_NEW_TASKS test', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const state = {
        [todolistId1]: [
            {id: 'adb', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    }
    let newState = TaskReducer(state, {type: 'ADD_NEW_TASKS', payload: {newId: 'abc'}})
    expect(newState['abc']).toBe(newState['abc'])
})
test('case REMOVE_TODOLIST_TASK test', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const state = {
        [todolistId1]: [
            {id: 'adb', title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    }
    let newState = TaskReducer(state, {type: 'REMOVE_TODOLIST_TASK', payload: {idT: todolistId1}})
    expect(newState[todolistId1]).toBe(undefined)
})