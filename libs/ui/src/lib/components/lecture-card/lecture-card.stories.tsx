import { Story, Meta } from '@storybook/react';
import { LectureCard, LectureCardProps } from './lecture-card';

export default {
  component: LectureCard,
  title: 'LectureCard',
} as Meta;

const Template: Story<LectureCardProps> = (args) => <LectureCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
