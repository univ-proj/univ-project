import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { ScanIcon, ScanIconProps } from './scan-icon';

export default {
  component: ScanIcon,
  title: 'Icons/ScanIcon',
} as Meta;

const Template: Story<ScanIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <ScanIcon {...args} />
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
