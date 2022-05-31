import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './grades-icon.module.css';

/* eslint-disable-next-line */
export interface GradesIconProps {
  type?: IconType;
}

export function GradesIcon({ type = 'filled' }: GradesIconProps) {
  return <BasicIcon name="school" type={type} />;
}

export default GradesIcon;
