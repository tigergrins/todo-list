import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onchangeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onchangeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?
        <input value={title}
               onBlur={activateViewMode}
               onChange={onChangeHandler}
               autoFocus/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
}