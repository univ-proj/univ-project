import { PdfIcon, ProfileIcon, TimerIcon } from '@univ-project/ui';
import React from 'react';
import styles from './attendence-card.module.css';

export interface AttendenceCardProps {
  attendence?: 'absence' | 'presence';
  subject: string;
  startTime: string;
  endTime: string;
  prof_name: string;
}
export const AttendenceCard = (props: AttendenceCardProps) => {
  return (
    <div
      className={styles['attendence_card']}
      style={{
        backgroundColor: `${
          props.attendence === 'presence' ? '#E9FFE9' : '#FFDADA'
        }`,
        color: `${props.attendence === 'presence' ? '#4BAE4F' : '#C10000'}`,
        border: `${
          props.attendence === 'presence'
            ? '1px solid #4BAE4F'
            : '1px solid #C10000'
        }`,
      }}
    >
      <div className={styles['attendence_card_content']}>
        <div>
          <div className={styles['subject_name']}>{props.subject}</div>
          <div className={styles['time']}>
            <TimerIcon />
            <div className={styles['start_end_date']}>
              {props.startTime} - {props.endTime}
            </div>
          </div>

          <div>
            <div className={styles['prof_details']}>
              <ProfileIcon />
              <div className={styles['prof_name']}>Eng/ {props.prof_name}</div>
            </div>
          </div>
        </div>

        <div className={styles['icon_container']}></div>
      </div>
    </div>
  );
};
