import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions'

import {AddItemForm} from './AddItemForm';

export default {
    title: 'Components/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button is clicked'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const AddItemFormTemplate: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = AddItemFormTemplate.bind({});
AddItemFormStory.args = {
    addItemProps: action('Button is clicked')
}