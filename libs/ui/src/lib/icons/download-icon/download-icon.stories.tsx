import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { DownloadIcon, DownloadIconProps } from './download-icon';

export default {
  component: DownloadIcon,
  title: 'Icons/DownloadIcon',
} as Meta;

const Template: Story<DownloadIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <DownloadIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
  label: true,
};
