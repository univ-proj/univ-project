import { Typography } from '@mui/material';
import Icon from '@mui/material/Icon';

/* eslint-disable-next-line */
export interface BasicIconProps {
  name:
    | 'home'
    | 'book'
    | 'qr_code'
    | 'notifications'
    | 'account_circle'
    | 'event_note'
    | 'description'
    | 'school'
    | 'play_circle'
    | 'visibility'
    | 'visibility_off'
    | 'chat_bubble'
    | 'file_download'
    | 'file_upload'
    | 'document_scanner'
    | 'arrow_back_ios'
    | 'pin_drop'
    | 'schedule';
  label?: string;
  /** Initially as filled */
  type?: 'outlined' | 'filled';
}

export function BasicIcon({ name, label, type = 'filled' }: BasicIconProps) {
  const color = type === 'filled' ? 'primary' : 'text.secondary';
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Typography color={color}>
        <Icon
          className={type === 'outlined' ? 'material-icons-outlined' : ''}
          color="inherit"
        >{`${name}`}</Icon>
      </Typography>
      {label && <Typography color={color}>{label}</Typography>}
    </div>
  );
}

export default BasicIcon;
