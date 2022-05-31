import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './back-icon.module.css';

/* eslint-disable-next-line */
export interface BackIconProps {
  type?: IconType;
}

export function BackIcon({ type = 'filled' }: BackIconProps) {
  return <BasicIcon name="arrow_back_ios" type={type} />;
}

export default BackIcon;
