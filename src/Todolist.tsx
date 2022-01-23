import React from "react";
import SuperInput from "./SuperInput";
import {FilterValueType, TaskType} from "./App";
import {SuperSpan} from "./SuperSpan";
import {Button, Checkbox, Fab, FormControlLabel} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTodolist: (idT: string) => void
    changeFilter: (idT: string, filter: FilterValueType) => void
    removeTask: (idT: string, taskId: string) => void
    checkboxHandler: (idT: string, taskId: string, isDone: boolean) => void
    addTask: (idTodolistId: string, title: string) => void
    changeTodolistTitle: (idT: string, title: string) => void
    changeTaskTitle: (idT: string, taskId: string, title: string) => void

}
export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    // const allClickHandler = () => {
    //     props.changeFilter(props.todolistId, 'all')
    // }
    // const activeClickHandler = () => {
    //     props.changeFilter(props.todolistId, 'active')
    // }
    // const completedClickHandler = () => {
    //     props.changeFilter(props.todolistId, 'completed')
    // }

    const filterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todolistId, value)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(props.todolistId, id)
    }

    const checkboxHandler = (taskId: string, isDone: boolean) => {
        props.checkboxHandler(props.todolistId, taskId, isDone)
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    const changeTaskTitle = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }

    return (
        <div>
            <div>
                <h2 style={{textAlign: 'center'}}><SuperSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <IconButton size="small" onClick={removeTodolist}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    {/*<Button onClick={removeTodolist}>X</Button>*/}
                </h2>
                <SuperInput addHandler={addTask}/>
            </div>
            <div>
                <div>
                    {props.tasks.map(item => {
                        return <div key={item.id} style={{padding: '5px'}}>
                            <Checkbox
                                checked={item.isDone}
                                onChange={(e) => checkboxHandler(item.id, e.currentTarget.checked)}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                            {/*<input type="checkbox" checked={item.isDone}*/}
                            {/*       onChange={(e) => checkboxHandler(item.id, e.currentTarget.checked)}/>*/}
                            <SuperSpan title={item.title} changeTitle={(title) => changeTaskTitle(item.id, title)}/>
                            <IconButton onClick={() => removeTaskHandler(item.id)} size="small">
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                            {/*<Button onClick={() => removeTaskHandler(item.id)}>X</Button>*/}
                        </div>
                    })}
                </div>
            </div>
            <div className='buttongroup'>
                <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                        onClick={() => filterHandler('all')}>All</Button>
                <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                        onClick={() => filterHandler('active')}>Active</Button>
                <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                        onClick={() => filterHandler('completed')}>Completed</Button>
            </div>

        </div>
    )

}


