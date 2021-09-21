import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItemProps: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItemProps}) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addItem = () => {
        let trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItemProps(trimmedTitle)
        } else {
            setError('Title is required')
        }

        setTitle('')
    }
    const onchangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error !== null) setError(null)
    }
    const onclickButtonHandler = () => {
        addItem()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    return (
        <div>
            <TextField value={title}
                       label={'Type value'}
                       error={!!error}
                       helperText={error}
                       onChange={onchangeInputHandler}
                       onKeyPress={onKeyPressHandler}/>
            <IconButton aria-label="add"
                        color="primary"
                        onClick={onclickButtonHandler}>
                <AddBox fontSize="medium"/>
            </IconButton>
        </div>
    )
})