import { Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import { IconName, IconType, IconColor } from '../icon-dto';

/* eslint-disable-next-line */
export interface BasicIconProps {
  name: IconName;
  label?: string;
  /** Initially as filled */
  type?: IconType;
  color?: IconColor;
}

function calculateButtonThemeColor(color: IconColor) {
  switch (color) {
    case 'secondary':
      return 'text.secondary';

    case 'contrast':
      return 'primary.contrast';

    case 'primary':
    default:
      return 'primary';
  }
}

export function BasicIcon({
  name,
  label,
  type = 'filled',
  color = 'primary',
}: BasicIconProps) {
  const newColor = calculateButtonThemeColor(color);

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Typography color={newColor}>
        <Icon
          className={type === 'outlined' ? 'material-icons-outlined' : ''}
          color="inherit"
        >{`${name}`}</Icon>
      </Typography>
      {label && <Typography color={newColor}>{label}</Typography>}
    </div>
  );
}

export default BasicIcon;
