import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import {
  VisibilityOffIcon,
  VisibilityOffIconProps,
} from './visibility-off-icon';

export default {
  component: VisibilityOffIcon,
  title: 'Icons/VisibilityOffIcon',
} as Meta;

const Template: Story<VisibilityOffIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <VisibilityOffIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
