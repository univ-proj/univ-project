import { Story, Meta } from '@storybook/react';
import { Notification, NotificationProps } from './notification';

export default {
  component: Notification,
  title: 'Notification',
} as Meta;

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
