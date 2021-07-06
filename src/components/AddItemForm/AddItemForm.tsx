import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import style from './AddItemForm.module.css'

type AddItemFormPropsType = {
    addItemProps: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItemProps}) => {
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
        setError('')
    }
    const onclickButtonHandler = () => {
        addItem()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()

        }
    }

    return (
        <div>
            <input type="text"
                   value={title}
                   className={error ? style.error : ''}
                   onChange={onchangeInputHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onclickButtonHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    )
}