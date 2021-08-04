import React, {useState, useReducer} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    // State
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todoLists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])

    let [taskObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true}
        ]
    })

    // Todolist
    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolistReducer(action)
    }

    function changeTodoListTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolistReducer(action)
    }

    // Tasks
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItemProps={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = taskObj[tl.id];

                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px 30px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            changeTodoListTitle={changeTodoListTitle}
                                            removeTodolist={removeTodolist}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
