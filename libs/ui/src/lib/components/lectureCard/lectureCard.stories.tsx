import { ThemeProvider } from '@mui/material/styles';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { LectureCard } from './lectureCard';

export default {
  component: LectureCard,
  title: 'Components/Card',
} as Meta;

const Template: Story = (args) => {
  console.log({ args });
  return (
    <ThemeProvider theme={theme}>
      <LectureCard {...args} />
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
