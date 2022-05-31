import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './visibility-icon-on.module.css';

/* eslint-disable-next-line */
export interface VisibilityOnIconProps {
  type?: IconType;
}

export function VisibilityOnIcon({ type = 'filled' }: VisibilityOnIconProps) {
  return <BasicIcon name="visibility" type={type} />;
}

export default VisibilityOnIcon;
