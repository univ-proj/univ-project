import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { AssignmentsIcon, AssignmentsIconProps } from './assignments-icon';

export default {
  component: AssignmentsIcon,
  title: 'Icons/AssignmentsIcon',
} as Meta;

const Template: Story<AssignmentsIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <AssignmentsIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
