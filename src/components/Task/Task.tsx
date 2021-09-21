import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../../Todolist';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.removeTask, props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId), [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newTitle: string) => props.changeTaskTitle(props.task.id, newTitle, props.todolistId), [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <li className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox onChange={onChangeStatusHandler}
                      checked={props.task.isDone}/>
            <EditableSpan onchangeTitle={onChangeTitleHandler} title={props.task.title}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    )
})