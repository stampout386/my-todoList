import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button, Fab, Icon, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type SuperInputPropsType = {
    addHandler: (title: string) => void
}

const SuperInput = (props: SuperInputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('Enter Title')


    const addHandler = () => {
        let trimTitle = title.trim()
        if (trimTitle) {
            props.addHandler(trimTitle)
            setTitle('')
            setError('Enter Title')
        } else {
            setError('Title is incorrect')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.value === ' ' || e.currentTarget.value === '') {
            setError('Title is incorrect')
            setTitle('')
        } else {
            setTitle(e.currentTarget.value)
            setError('Enter Title')
        }

    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addHandler()
            setTitle('')
        }
    }
    return (
        <div>
            {error === 'Title is incorrect' ?
                <TextField error id="outlined-error" label="Title is incorrect" defaultValue="Title is incorrect"
                           value={title}
                           onChange={onChangeHandler}/>
                : <TextField id="outlined-basic" variant="outlined" label="Enter Title" defaultValue="Enter Title"
                             value={title} type="text" onChange={onChangeHandler}
                             onKeyPress={onKeyPress}/>}
            <Fab color="primary" aria-label="add" onClick={addHandler} size={'large'} style={{marginLeft: '10px'}}>
                <AddIcon/>
            </Fab>
            {/*<Button variant="outlined" onClick={addHandler} size={'large'}>+</Button>*/}
            {/*<Fab color="primary" aria-label="add" onClick={addHandler} size={'small'}>*/}
            {/*    <AddIcon/>*/}
            {/*</Fab>*/}
            <div>
                {/*{error && <span className={spanClassName}>{error}</span>}*/}
            </div>
        </div>
    );
};

export default SuperInput;