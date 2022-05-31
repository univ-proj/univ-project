import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './home-icon.module.css';

/* eslint-disable-next-line */
export interface HomeIconProps {
  type?: IconType;
  labeled?: boolean;
}

export function HomeIcon({ type = 'filled', labeled = false }: HomeIconProps) {
  return (
    <BasicIcon name="home" type={type} label={labeled ? 'Home' : undefined} />
  );
}

export default HomeIcon;
