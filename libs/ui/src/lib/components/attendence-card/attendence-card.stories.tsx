import { Story, Meta } from '@storybook/react';
import { AttendenceCard, AttendenceCardProps } from './attendence-card';

export default {
  component: AttendenceCard,
  title: 'AttendenceCard',
} as Meta;

const Template: Story<AttendenceCardProps> = (args) => (
  <AttendenceCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
