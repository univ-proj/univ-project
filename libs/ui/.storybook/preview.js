import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../src/lib/theme';

export const decorators = [muiTheme([theme])];
