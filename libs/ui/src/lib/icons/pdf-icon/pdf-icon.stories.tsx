import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { PdfIcon, PdfIconProps } from './pdf-icon';

export default {
  component: PdfIcon,
  title: 'Icons/PdfIcon',
} as Meta;

const Template: Story<PdfIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <PdfIcon {...args} />
  </ThemeProvider>
);
export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
};
