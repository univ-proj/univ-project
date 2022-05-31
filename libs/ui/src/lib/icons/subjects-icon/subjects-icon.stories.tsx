import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { SubjectsIcon, SubjectsIconProps } from './subjects-icon';

export default {
  component: SubjectsIcon,
  title: 'Icons/SubjectsIcon',
} as Meta;

const Template: Story<SubjectsIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <SubjectsIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
  labeled: false,
};

export const Labeled = Template.bind({});
Labeled.args = {
  type: 'filled',
  labeled: true,
};
