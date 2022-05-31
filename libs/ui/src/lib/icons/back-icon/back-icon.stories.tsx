import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { BackIcon, BackIconProps } from './back-icon';

export default {
  component: BackIcon,
  title: 'Icons/BackIcon',
} as Meta;

const Template: Story<BackIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BackIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
