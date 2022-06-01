import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../../theme';
import { Button, ButtonProps } from './button';

export default {
  component: Button,
  title: 'Buttons/Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Assignment',
  icon: 'description',
  type: 'primary',
  size: 'large',
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Assignment',
  icon: 'description',
  type: 'secondary',
  size: 'large',
  disabled: false,
};

export const DisabledPrimary = Template.bind({});
DisabledPrimary.args = {
  children: 'Assignment',
  icon: 'description',
  type: 'primary',
  size: 'large',
  disabled: true,
};

export const DisabledSecondary = Template.bind({});
DisabledSecondary.args = {
  children: 'Assignment',
  icon: 'description',
  type: 'secondary',
  size: 'large',
  disabled: true,
};

export const MediumSizePrimary = Template.bind({});
MediumSizePrimary.args = {
  children: 'Assignment',
  icon: 'description',
  type: 'primary',
  size: 'medium',
  disabled: true,
};

export const MediumSizeSecondary = Template.bind({});
MediumSizeSecondary.args = {
  children: 'Assignment',
  icon: 'description',
  type: 'secondary',
  size: 'medium',
  disabled: true,
};
