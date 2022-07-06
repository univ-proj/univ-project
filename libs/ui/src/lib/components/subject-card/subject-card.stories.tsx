import { Story, Meta } from '@storybook/react';
import { SubjectCard, SubjectCardProps } from './subject-card';

export default {
  component: SubjectCard,
  title: 'SubjectCard',
} as Meta;

const Template: Story<SubjectCardProps> = (args) => <SubjectCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
