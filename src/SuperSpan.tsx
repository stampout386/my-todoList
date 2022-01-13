import {ChangeEvent, useState, KeyboardEvent} from "react";

type SuperSpanType = {
    title: string
    changeTitle: (title: string) => void
}


export const SuperSpan = (props: SuperSpanType) => {
    let [title, setTitle] = useState(props.title)
    let [inputOn, setInputOn] = useState<boolean>(false)
    const dblClickHandler = () => {
        setInputOn(true)
    }

    const onBlur = () => {
        setInputOn(false)
        props.changeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setInputOn(false)
            props.changeTitle(title)
        }
    }


    return inputOn
        ?
        <input value={title} type='text' autoFocus onBlur={onBlur} onKeyPress={onKeyPress} onChange={onChangeHandler}/>
        : <span onDoubleClick={dblClickHandler}>{props.title}</span>

}