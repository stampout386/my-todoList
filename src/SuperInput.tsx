import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Fab, Icon, TextField} from "@mui/material";
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
            setError('Title is correct')
        }

    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addHandler()
            setTitle('')
        }
    }

    let spanClassName = error === 'Title is incorrect' ? 'error-message' : 'ok';
    return (
        <div>
            {/*<input value={title} type="text" onChange={onChangeHandler} onKeyPress={onKeyPress}/>*/}
            <TextField id="outlined-basic" variant="outlined" value={title} type="text" onChange={onChangeHandler}
                       onKeyPress={onKeyPress} label={error}/>
            <Fab color="primary" aria-label="add" onClick={addHandler} size={'small'}>
                <AddIcon/>
            </Fab>
            {/*<button onClick={addHandler}>+</button>*/}
            <div>
                {/*{error && <span className={spanClassName}>{error}</span>}*/}
            </div>
        </div>
    );
};

export default SuperInput;