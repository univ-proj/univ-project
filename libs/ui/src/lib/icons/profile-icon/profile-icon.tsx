import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './profile-icon.module.css';

/* eslint-disable-next-line */
export interface ProfileIconProps {
  type?: IconType;
  labeled?: boolean;
}

export function ProfileIcon({
  type = 'filled',
  labeled = false,
}: ProfileIconProps) {
  return (
    <BasicIcon
      name="account_circle"
      type={type}
      label={labeled ? 'Profile' : undefined}
    />
  );
}

export default ProfileIcon;
