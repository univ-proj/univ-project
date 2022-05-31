import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './visibility-icon-off.module.css';

/* eslint-disable-next-line */
export interface VisibilityOffIconProps {
  type?: IconType;
}

export function VisibilityOffIcon({ type = 'filled' }: VisibilityOffIconProps) {
  return <BasicIcon name="visibility_off" type={type} />;
}

export default VisibilityOffIcon;
