import styles from './schedule-card.module.css';
import { TimerIcon, LocationIcon, ProfileIcon } from '@univ-project/ui';
/* eslint-disable-next-line */
export interface ScheduleCardProps {
  status?: string;
  subject_name?: string;
  time?: string;
  location?: string;
  prof_name?: string;
}

export function ScheduleCard(props: ScheduleCardProps) {
  return (
    <div className={styles['schedule_card']}>
      <div className={styles['text']}>{props.status}</div>
      <div className={styles['matrial_name']}>{props.subject_name}</div>

      <div className={styles['details']}>
        <div className={styles['time']}>
          <TimerIcon />
          <div className={styles['text']}>{props.time}</div>
        </div>

        <div className={styles['location']}>
          <LocationIcon type="outlined" />
          <div className={styles['text']}>{props.location}</div>
        </div>
      </div>

      <div>
        <div className={styles['prof_container']}>
          <ProfileIcon />
          <div className={styles['text']}>Eng/ {props.prof_name}</div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
