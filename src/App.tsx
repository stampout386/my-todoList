import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid'
import {Todolist} from "./Todolist";
import SuperInput from "./SuperInput";

export type FilterValueType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ]
    });

    const removeTodolist = (idT: string) => {
        setTodolists(todolists.filter(item => item.id !== idT))
        delete tasks[idT]
    }

    const changeFilter = (idT: string, filter: FilterValueType) => {
        setTodolists(todolists.map(item => item.id === idT ? {...item, filter} : item))
    }

    const removeTask = (idT: string, taskId: string) => {
        setTasks({...tasks, [idT]: tasks[idT].filter(item => item.id !== taskId)})
    }

    const checkboxHandler = (idT: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [idT]: tasks[idT].map(item => item.id === taskId ? {...item, isDone} : item)})
    }

    const addTodolist = (title: string) => {
        let newId = v1()
        setTodolists([...todolists, {id: newId, title, filter: 'all'}])
        setTasks({...tasks, [newId]: []})
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }
    
    const changeTaskTitle = (idT:string,taskId:string,title:string) => {
      setTasks({...tasks,[idT]:tasks[idT].map(item=>item.id === taskId ? {...item,title}:item)})
    }
    
    const changeTodolistTitle = (idT:string,title:string) => {
      setTodolists(todolists.map(item=>item.id===idT? {...item,title}:item))
    }


    return (
        <div className="App">
            <SuperInput addHandler={addTodolist}/>
            {todolists.map(item => {
                let filteredTask = tasks[item.id]
                if (item.filter === 'active') {
                    filteredTask = tasks[item.id].filter(i => !i.isDone)
                }
                if (item.filter === 'completed') {
                    filteredTask = tasks[item.id].filter(i => i.isDone)
                }
                return <Todolist
                    todolistId={item.id}
                    title={item.title}
                    key={item.id}
                    filter={item.filter}
                    tasks={filteredTask}
                    removeTodolist={removeTodolist}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    checkboxHandler={checkboxHandler}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle ={changeTodolistTitle}


                />
            })}
        </div>
    );
}


export default App



