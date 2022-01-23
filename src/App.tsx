import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid'
import {Todolist} from "./Todolist";
import SuperInput from "./SuperInput";
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addNewTasksAC,
    addTaskAC,
    changeTaskTitleAC,
    checkboxHandlerAC,
    removeTaskAC,
    removeTodolistTaskAC,
    TaskReducer
} from "./TaskReducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./TodolistReducer";

export type FilterValueType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1()

    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "JS", isDone: false}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true},
    //         {id: v1(), title: "JS", isDone: false}
    //     ]
    // });

    let [todolists, todolistsDispatch] = useReducer(TodolistReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])


    let [tasks, tasksDispatch] = useReducer(TaskReducer, {
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


    const addTodolist = (title: string) => {
        let newId = v1()
        // setTodolists([...todolists, {id: newId, title, filter: 'all'}])
        // setTasks({...tasks, [newId]: []})
        todolistsDispatch(addTodolistAC(title, newId))
        tasksDispatch(addNewTasksAC(newId))
    }

    const removeTodolist = (idT: string) => {
        todolistsDispatch(removeTodolistAC(idT))
        tasksDispatch(removeTodolistTaskAC(idT))
        // delete tasks[idT]
    }

    const changeFilter = (idT: string, filter: FilterValueType) => {
        // setTodolists(todolists.map(item => item.id === idT ? {...item, filter} : item))
        todolistsDispatch(changeFilterAC(idT, filter))
    }

    const changeTodolistTitle = (idT: string, title: string) => {
        todolistsDispatch(changeTodolistTitleAC(idT, title))
        // setTodolists(todolists.map(item => item.id === idT ? {...item, title} : item))
    }

    const removeTask = (idT: string, taskId: string) => {
        tasksDispatch(removeTaskAC(idT, taskId))
        // setTasks({...tasks, [idT]: tasks[idT].filter(item => item.id !== taskId)})
    }

    const checkboxHandler = (idT: string, taskId: string, isDone: boolean) => {
        tasksDispatch(checkboxHandlerAC(idT, taskId, isDone))
        // setTasks({...tasks, [idT]: tasks[idT].map(item => item.id === taskId ? {...item, isDone} : item)})
    }

    const addTask = (todolistId: string, title: string) => {
        tasksDispatch(addTaskAC(todolistId, title))
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }

    const changeTaskTitle = (idT: string, taskId: string, title: string) => {
        tasksDispatch(changeTaskTitleAC(idT, taskId, title))
        // setTasks({...tasks, [idT]: tasks[idT].map(item => item.id === taskId ? {...item, title} : item)})
    }


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <SuperInput addHandler={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>

                    {todolists.map(item => {
                        let filteredTask = tasks[item.id]
                        if (item.filter === 'active') {
                            filteredTask = tasks[item.id].filter(i => !i.isDone)
                        }
                        if (item.filter === 'completed') {
                            filteredTask = tasks[item.id].filter(i => i.isDone)
                        }
                        return <Grid item>
                            <Paper elevation={3} style={{padding: '15px'}}>
                                <Todolist
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
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
        ;
}


export default App



