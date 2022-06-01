import { muiTheme } from 'storybook-addon-material-ui';
import { theme } from '../src/lib/theme';

// import 'material-design-icons/iconfont/material-icons.css';

export const decorators = [muiTheme([theme])];
