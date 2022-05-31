import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './download-icon.module.css';

/* eslint-disable-next-line */
export interface DownloadIconProps {
  type?: IconType;
}

export function DownloadIcon({ type = 'filled' }: DownloadIconProps) {
  return <BasicIcon name="file_download" type={type} />;
}

export default DownloadIcon;
