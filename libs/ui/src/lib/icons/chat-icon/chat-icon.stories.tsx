import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { ChatIcon, ChatIconProps } from './chat-icon';

export default {
  component: ChatIcon,
  title: 'Icons/ChatIcon',
} as Meta;

const Template: Story<ChatIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <ChatIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
