import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './timer-icon.module.css';

/* eslint-disable-next-line */
export interface TimerIconProps {
  type?: IconType;
}

export function TimerIcon({ type = 'filled' }: TimerIconProps) {
  return <BasicIcon name="schedule" type={type} />;
}

export default TimerIcon;
