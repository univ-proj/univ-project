import { ThemeProvider } from '@mui/material/styles';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { ILectureCardProps, LectureCard } from './lectureCard';

export default {
  component: LectureCard,
  title: 'Components/Card',
} as Meta;

const Template: Story<ILectureCardProps> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <LectureCard {...args} />
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'Lecture 01',
  topic: 'Compiler Theory',
  files_count: 1,
  videos_count: 1,
  lecturer: {
    title: 'eng',
    full_name: 'kareem saif',
    avatar: '',
  },
};

// ? You can demonstrate different states of component of story book
// ? by exporting new template instance with different args
// export const Secondary = Template.bind({});
// Secondary.args = {
//   name: 'Lecture 02',
//   topic: 'Machine Learning',
//   files_count: 1,
//   videos_count: 1,
//   lecturer: {
//     title: 'eng',
//     full_name: 'kareem saif',
//     avatar: '',
//   },
// };
