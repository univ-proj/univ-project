import { PdfIcon, SubjectsIcon, VideoIcon } from '@univ-project/ui';
import Avatar from '@mui/material/Avatar';
import styles from './lecture-card.module.css';
import logo from '../../../../../../apps/mobile/src/assets/icon/files.svg';
import logo2 from '../../../../../../apps/mobile/src/assets/icon/videos.svg';

export interface LectureCardProps {
  lecture_num: number;
  files_num: number;
  videos_num: number;
  prof_img: string;
  prof_name: string;
  update: boolean;
}

export function LectureCard(props: LectureCardProps) {
  return (
    <div className={styles['lecture_card']}>
      {props.update ? (
        <div className={styles['update_box']}>
          <div className={styles['box_text']}>New</div>
        </div>
      ) : null}
      <div
        className={styles['information_container']}
        style={{ marginTop: `${props.update ? '11px' : '26px'}` }}
      >
        <div className={styles['text_bold']}>Lecture {props.lecture_num}</div>
        <div className={styles['text']}>Topic of the lecture</div>
        <div className={styles['content-container']}>
          <div className={styles['container']} style={{ marginTop: '9px' }}>
            <img alt="fff" src={logo} />
            <div className={styles['text']}>{props.files_num} Files</div>
          </div>
          <div className={styles['container']}>
            <img alt="fff" src={logo2} />
            <div className={styles['text']}>{props.videos_num} videos</div>
          </div>
        </div>
      </div>

      <div className={styles['prof_info_container']}>
        <Avatar
          alt="prof_img"
          sx={{ width: '32px', height: '32px' }}
          src={props.prof_img}
        />
        <div className={styles['prof_name']}>
          <div className={styles['text']}>Prof</div>
          <div className={styles['text']}>{props.prof_name}</div>
        </div>
      </div>
    </div>
  );
}

export default LectureCard;
