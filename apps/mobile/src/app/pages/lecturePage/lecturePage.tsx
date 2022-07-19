import { BackIcon, LectureTypeCard } from '@univ-project/ui';
import React, { useCallback, useEffect, useState } from 'react';
import './lecturePage.css';
import { Link, useParams } from 'react-router-dom';
import logo from '../../../assets/Logo1.svg';
import { WithId } from '@univ-project/client-sdk';
import { Class } from '@univ-project/typedefs';
import * as api from '@univ-project/client-sdk';

const LecturePage = () => {
  const [classVal, setClassVal] = useState<WithId<Class> | null>(null);
  const { lectureId } = useParams<any>();

  const getClassData = useCallback(async () => {
    const classValue = await api.getResource<Class>('class', lectureId, {
      expand: 'files',
    });

    console.log({ classValue });
    setClassVal(classValue);
  }, [lectureId]);

  useEffect(() => {
    getClassData();
  }, [getClassData]);

  return (
    <div className="lecturePage">
      <Link
        to={`/subjectPage/${classVal?.course}`}
        className="backIcon_container"
      >
        <BackIcon />
      </Link>

      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="lecturePage_subjectName">{classVal?.name}</div>

      <div className="lectureTypeCards_container">
        {classVal?.files?.map((file) => (
          <LectureTypeCard type="file" name={file?.name} />
        ))}
        {/* <LectureTypeCard type="video" lecture_num={1} /> */}
      </div>
    </div>
  );
};

export default LecturePage;
