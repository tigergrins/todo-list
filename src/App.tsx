import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = taskObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id != id);
        taskObj[todolistId] = filteredTasks
        setTasksObj({...taskObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = taskObj[todolistId]
        let newTasks = [task, ...tasks];
        taskObj[todolistId] = newTasks
        setTasksObj({...taskObj});
    }

    function addTodoList(title: string) {
        let todoList: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({
            ...taskObj,
            [todoList.id]: []
        })
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = taskObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...taskObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = taskObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...taskObj})
        }
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])

    const removeTodolist = (todolistId: string) => {
        let filtredTodoLists = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filtredTodoLists)
        delete taskObj[todolistId]
        setTasksObj({...taskObj})
    }

    const changeTodoListTitle = (todolistId: string, newTitle: string) => {
        let todoList = todoLists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    let [taskObj, setTasksObj] = useState<TasksStateType>({
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

export default App;
