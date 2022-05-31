import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { GradesIcon, GradesIconProps } from './grades-icon';

export default {
  component: GradesIcon,
  title: 'Icons/GradesIcon',
} as Meta;

const Template: Story<GradesIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <GradesIcon {...args} />
  </ThemeProvider>
);
export const Primary = Template.bind({});
Primary.args = {};
