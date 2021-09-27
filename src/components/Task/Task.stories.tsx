import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions'

export default {
    title: 'Components/Task',
    component: Task,
    argTypes: {
        removeTask: action('Task is removed'),
        changeTaskStatus: action('Task\'s status is changed'),
        changeTaskTitle: action('Task\'s title is changed'),
    },
} as ComponentMeta<typeof Task>;

const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = TaskTemplate.bind({});
TaskIsDoneStory.args = {
    task: {id: '1', title: 'JS', isDone: true},
    todolistId: 'todo1',
}

export const TaskIsNotDoneStory = TaskTemplate.bind({});
TaskIsNotDoneStory.args = {
    task: {id: '1', title: 'JS', isDone: false},
    todolistId: 'todo2',
}