import MUIButton from '@mui/material/Button';
import { MouseEventHandler } from 'react';
import BasicIcon from '../../../icons/basic-icon/basic-icon';
import { IconColor, IconName } from '../../../icons/icon-dto';

/* eslint-disable-next-line */
export interface ButtonProps {
  icon?: IconName;
  type?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  icon,
  children,
  onClick,
  type = 'primary',
  size = 'large',
  disabled = false,
}: ButtonProps) => {
  let iconColor: IconColor = disabled ? 'secondary' : 'primary';
  if (type === 'primary') {
    iconColor = 'contrast';
  }

  return (
    <MUIButton
      onClick={onClick}
      size={size}
      color="primary"
      disabled={disabled}
      variant={type === 'primary' ? 'contained' : 'outlined'}
      startIcon={
        icon ? (
          <BasicIcon
            name={icon}
            color={iconColor}
            type={type === 'primary' ? 'outlined' : 'filled'}
          />
        ) : null
      }
    >
      {children}
    </MUIButton>
  );
};
