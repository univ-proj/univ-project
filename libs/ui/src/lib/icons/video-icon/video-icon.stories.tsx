import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { VideoIcon, VideoIconProps } from './video-icon';

export default {
  component: VideoIcon,
  title: 'Icons/VideoIcon',
} as Meta;

const Template: Story<VideoIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <VideoIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
