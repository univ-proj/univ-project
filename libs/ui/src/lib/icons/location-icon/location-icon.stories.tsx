import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react';
import { theme } from '../../theme';
import { LocationIcon, LocationIconProps } from './location-icon';

export default {
  component: LocationIcon,
  title: 'Icons/LocationIcon',
} as Meta;

const Template: Story<LocationIconProps> = (args) => (
  <ThemeProvider theme={theme}>
    <LocationIcon {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'filled',
  label: true,
};
