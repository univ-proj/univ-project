import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { VisibilityOnIcon, VisibilityOnIconProps } from './visibility-on-icon';

export default {
  component: VisibilityOnIcon,
  title: 'Icons/VisibilityOnIcon',
} as Meta;

const Template: Story<VisibilityOnIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <VisibilityOnIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
