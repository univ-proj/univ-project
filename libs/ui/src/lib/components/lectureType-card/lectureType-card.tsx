import { AssignmentsIcon, Button, VideoIcon } from '@univ-project/ui';
import React from 'react';
import styles from './lectureType-card.module.css';

export interface LectureTypeCardProps {
  type?: 'file' | 'video';
  name?: string;
}

export const LectureTypeCard = (props: LectureTypeCardProps) => {
  return (
    <div className={styles['lectureType_card']}>
      <div className="lectureTypeIcon_container">
        {props.type === 'file' ? (
          <AssignmentsIcon type="outlined" />
        ) : (
          <VideoIcon type="outlined" />
        )}
      </div>

      <div className={styles['lecture_type']}>
        {props.name}.{props.type === 'file' ? 'pdf' : 'mp4'}
      </div>
      <div className={styles['lecture_type-topic']}>{props.name}</div>

      <div className={styles['button_container']}>
        <Button size="medium" icon="file_download">
          Download
        </Button>
      </div>
    </div>
  );
};
