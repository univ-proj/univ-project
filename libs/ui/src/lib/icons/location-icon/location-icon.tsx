import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './location-icon.module.css';

/* eslint-disable-next-line */
export interface LocationIconProps {
  type?: IconType;
}

export function LocationIcon({ type = 'filled' }: LocationIconProps) {
  return <BasicIcon name="pin_drop" type={type} />;
}

export default LocationIcon;
