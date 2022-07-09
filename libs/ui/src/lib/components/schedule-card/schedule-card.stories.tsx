import { Story, Meta } from '@storybook/react';
import { ScheduleCard, ScheduleCardProps } from './schedule-card';

export default {
  component: ScheduleCard,
  title: 'ScheduleCard',
} as Meta;

const Template: Story<ScheduleCardProps> = (args) => <ScheduleCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
