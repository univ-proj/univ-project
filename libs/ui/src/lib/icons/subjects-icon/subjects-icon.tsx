import { type } from 'os';
import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './subjects-icon.module.css';

/* eslint-disable-next-line */
export interface SubjectsIconProps {
  type?: IconType;
  labeled?: boolean;
}

export function SubjectsIcon({
  type = 'filled',
  labeled = false,
}: SubjectsIconProps) {
  return (
    <BasicIcon
      name="book"
      type={type}
      label={labeled ? 'Subjects' : undefined}
    />
  );
}

export default SubjectsIcon;
