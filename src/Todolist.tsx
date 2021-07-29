import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {EditableSpan} from './components/EditableSpan/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

export type TaskType = {
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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(props.id, newTitle)

    return <div>
        <h3>
            <EditableSpan title={props.title} onchangeTitle={changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItemProps={addTask}/>
        <ul style={{listStyle: 'none'}}>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    const onChangeTitleHandler = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.id)

                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <Checkbox onChange={onChangeStatusHandler}
                                  checked={t.isDone}/>
                        <EditableSpan onchangeTitle={onChangeTitleHandler} title={t.title}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete fontSize="small"/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button size={'small'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button size={'small'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={'small'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

