import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { HomeIcon, HomeIconProps } from './home-icon';

export default {
  component: HomeIcon,
  title: 'Icons/HomeIcon',
} as Meta;

const Template: Story<HomeIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <HomeIcon {...args} />
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
