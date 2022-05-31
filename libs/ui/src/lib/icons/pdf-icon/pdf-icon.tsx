import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './pdf-icon.module.css';

/* eslint-disable-next-line */
export interface PdfIconProps {
  type?: IconType;
}

export function PdfIcon({ type = 'filled' }: PdfIconProps) {
  return <BasicIcon name="description" type={type} />;
}

export default PdfIcon;
