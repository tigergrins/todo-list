import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
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

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
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

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])

    const removeTodolist = (todolistId: string) => {
        let filtredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filtredTodolists)
        delete taskObj[todolistId]
        setTasksObj({...taskObj})
    }

    let [taskObj, setTasksObj] = useState({
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
            {
                todolists.map((tl) => {
                    let tasksForTodolist = taskObj[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}/>
                    )
                })
            }

        </div>
    );
}

export default App;
