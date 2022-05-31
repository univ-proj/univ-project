import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { TimerIcon, TimerIconProps } from './timer-icon';

export default {
  component: TimerIcon,
  title: 'Icons/TimerIcon',
} as Meta;

const Template: Story<TimerIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TimerIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
