import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './assignments-icon.module.css';

/* eslint-disable-next-line */
export interface AssignmentsIconProps {
  type?: IconType;
}

export function AssignmentsIcon({ type = 'filled' }: AssignmentsIconProps) {
  return <BasicIcon name="description" type={type} />;
}

export default AssignmentsIcon;
