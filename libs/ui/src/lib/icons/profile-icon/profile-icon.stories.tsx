import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { ProfileIcon, ProfileIconProps } from './profile-icon';

export default {
  component: ProfileIcon,
  title: 'Icons/ProfileIcon',
} as Meta;

const Template: Story<ProfileIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <ProfileIcon {...args} />
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
