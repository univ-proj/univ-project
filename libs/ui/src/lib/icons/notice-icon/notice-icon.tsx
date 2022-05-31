import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './notice-icon.module.css';

/* eslint-disable-next-line */
export interface NoticeIconProps {
  type?: IconType;
  labeled?: boolean;
}

export function NoticeIcon({
  type = 'filled',
  labeled = false,
}: NoticeIconProps) {
  return (
    <BasicIcon
      name="notifications"
      type={type}
      label={labeled ? 'Notice' : undefined}
    />
  );
}

export default NoticeIcon;
