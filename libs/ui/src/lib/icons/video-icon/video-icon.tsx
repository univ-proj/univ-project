import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './video-icon.module.css';

/* eslint-disable-next-line */
export interface VideoIconProps {
  type?: IconType;
}

export function VideoIcon({ type = 'filled' }: VideoIconProps) {
  return <BasicIcon name="play_circle" type={type} />;
}

export default VideoIcon;
