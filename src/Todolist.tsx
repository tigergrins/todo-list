import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolist: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let trimmedTitle = title.trim()

        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id);
        } else {
            setError('Title is required')
        }

        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input
                            onChange={onChangeHandler}
                            type="checkbox"
                            checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
