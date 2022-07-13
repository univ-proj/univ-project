import { Story, Meta } from '@storybook/react';
import { LectureTypeCard, LectureTypeCardProps } from './lectureType-card';

export default {
  component: LectureTypeCard,
  title: 'LectureTypeCard',
} as Meta;

const Template: Story<LectureTypeCardProps> = (args) => (
  <LectureTypeCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
