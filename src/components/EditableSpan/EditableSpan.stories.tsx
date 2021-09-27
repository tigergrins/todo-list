import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from './EditableSpan';

export default {
    title: 'Components/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onchangeTitle: action('Title is changed')
    },
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = EditableSpanTemplate.bind({});
EditableSpanStory.args = {
    title: 'CSS',
}