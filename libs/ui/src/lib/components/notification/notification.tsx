import React from 'react';
import styles from './notification.module.css';
import Avatar from '@mui/material/Avatar';
export interface NotificationProps {
  update: boolean;
  prof_img: string;
  prof_name: string;
  notification: string;
}

function ellipsify(str: string) {
  if (str.length > 37) {
    return str.substring(0, 37) + '...';
  } else {
    return str;
  }
}

export const Notification = (props: NotificationProps) => {
  return (
    <div className={styles['notification']}>
      <Avatar
        alt="prof_img"
        sx={{ width: '48px', height: '48px' }}
        src={props.prof_img}
      />
      <div className={styles['notification_details']}>
        <div className={styles['details']}>
          <div className={styles['notification_profName']}>
            Prof/ {props.prof_name}
          </div>

          {props.update ? (
            <div className={styles['update_box']}>
              <div className={styles['box_text']}>New</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className={styles['notification_body']}>
          {ellipsify(props.notification)}
        </div>
      </div>
    </div>
  );
};
