import BasicIcon from '../basic-icon/basic-icon';
import { IconType } from '../icon-dto';
import styles from './chat-icon.module.css';

/* eslint-disable-next-line */
export interface ChatIconProps {
  type?: IconType;
}

export function ChatIcon({ type }: ChatIconProps) {
  return <BasicIcon name="chat_bubble" type={type} />;
}

export default ChatIcon;
