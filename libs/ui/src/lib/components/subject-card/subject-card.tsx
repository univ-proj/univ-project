import styles from './subject-card.module.css';
import Avatar from '@mui/material/Avatar';
/* eslint-disable-next-line */
// className={styles['container']}

export interface SubjectCardProps {
  subjectName: string;
  lectures_num: number;
  sections_num: number;
  prof_name: string;
  prof_picture: string;
  update: boolean;
}

export function SubjectCard(props: SubjectCardProps) {
  return (
    <div className={styles['subject_card']}>
      {props.update ? (
        <div className={styles['update_box']}>
          <div className={styles['box_text']}>New</div>
        </div>
      ) : null}

      <div
        className={styles['sub_info_container']}
        style={{ marginTop: `${props.update ? '11px' : '28px'}` }}
      >
        <div className={styles['text_bold']}>{props.subjectName}</div>
        <div className={styles['text']}>{props.lectures_num} Lectures</div>
        <div className={styles['text']}>{props.sections_num} Sections</div>
      </div>

      <div className={styles['prof_info_container']}>
        <Avatar
          alt="prof_img"
          sx={{ width: '32px', height: '32px' }}
          src={props.prof_picture}
        />
        <div className={styles['prof_name']}>
          <div className={styles['text']}>Prof</div>
          <div className={styles['text']}>{props.prof_name}</div>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
