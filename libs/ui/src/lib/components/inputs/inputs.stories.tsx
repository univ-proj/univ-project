import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { Inputs, InputsProps } from './inputs';
import { theme } from '../../theme';

export default {
  component: Inputs,
  title: 'Inputs',
} as Meta;

const Template: Story<InputsProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Inputs {...args} />
  </ThemeProvider>
);

export const activeEmail = Template.bind({});
activeEmail.args = {
  color: 'primary',
  focused: true,
  disabled: false,
  error: false,
  required: true,
  label: 'Email',
  placeholder: 'email@gmail.com',
  type: 'text',
};

export const notActiveEmail = Template.bind({});
notActiveEmail.args = {
  focused: false,
  disabled: false,
  error: false,
  required: true,
  label: 'Email',
  placeholder: 'email@gmail.com',
  type: 'text',
};

export const disabledEmail = Template.bind({});
disabledEmail.args = {
  disabled: true,
  error: false,
  label: 'Email',
  placeholder: 'email@gmail.com',
  type: 'text',
};

export const errorEmail = Template.bind({});
errorEmail.args = {
  focused: true,
  disabled: false,
  error: true,
  required: true,
  label: 'Email',
  placeholder: 'email@gmail.com',
  type: 'text',
  color: 'error',
  helperText: 'Wrong email !',
};

export const activePassword = Template.bind({});
activePassword.args = {
  color: 'primary',
  focused: true,
  disabled: false,
  error: false,
  required: true,
  label: 'Password',
  placeholder: 'Enter a Password',
  type: 'password',
};

export const notActivePassword = Template.bind({});
notActivePassword.args = {
  focused: false,
  disabled: false,
  error: false,
  required: true,
  label: 'Password',
  placeholder: 'Enter a Password',
  type: 'password',
};

export const errorPassword = Template.bind({});
errorPassword.args = {
  focused: true,
  disabled: false,
  error: true,
  required: true,
  label: 'Password',
  placeholder: 'Enter a Password',

  type: 'password',
  color: 'error',
  helperText: 'Wrong password !',
};

export const disabledPassword = Template.bind({});
disabledPassword.args = {
  error: false,
  label: 'Password',
  placeholder: 'Enter a Password',
  type: 'password',
  disabled: true,
};
