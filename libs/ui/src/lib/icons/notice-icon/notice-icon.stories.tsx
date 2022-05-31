import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { NoticeIcon, NoticeIconProps } from './notice-icon';

export default {
  component: NoticeIcon,
  title: 'Icons/NoticeIcon',
} as Meta;

const Template: Story<NoticeIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <NoticeIcon {...args} />
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
