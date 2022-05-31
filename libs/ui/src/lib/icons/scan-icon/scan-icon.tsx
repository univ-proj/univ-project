import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './scan-icon.module.css';

/* eslint-disable-next-line */
export interface ScanIconProps {
  type?: IconType;
  labeled?: boolean;
}

export function ScanIcon({ type = 'filled', labeled = false }: ScanIconProps) {
  return (
    <BasicIcon
      name="document_scanner"
      type={type}
      label={labeled ? 'Scan' : undefined}
    />
  );
}

export default ScanIcon;
