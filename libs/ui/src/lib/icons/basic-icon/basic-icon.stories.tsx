import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { BasicIcon, BasicIconProps } from './basic-icon';

export default {
  component: BasicIcon,
  title: 'Icons/BasicIcon',
} as Meta;

const Template: Story<BasicIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BasicIcon {...args} />
  </ThemeProvider>
);

export const FilledIcon = Template.bind({});
FilledIcon.args = {
  name: 'book',
  type: 'filled',
};

export const OutlinedIcon = Template.bind({});
OutlinedIcon.args = {
  name: 'book',
  type: 'outlined',
};

export const FilledIconWithLabel = Template.bind({});
FilledIconWithLabel.args = {
  name: 'book',
  type: 'filled',
  label: 'Book',
};

export const OutlinedIconWithLabel = Template.bind({});
OutlinedIconWithLabel.args = {
  name: 'book',
  type: 'outlined',
  label: 'Book',
};
