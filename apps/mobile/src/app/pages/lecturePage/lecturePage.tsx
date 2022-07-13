import { BackIcon, LectureTypeCard } from '@univ-project/ui';
import React from 'react';
import './lecturePage.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo1.svg';

const LecturePage = () => {
  return (
    <div className="lecturePage">
      <Link to="/subjectPage" className="backIcon_container">
        <BackIcon />
      </Link>

      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="lecturePage_subjectName">Physics</div>

      <div className="lectureTypeCards_container">
        <LectureTypeCard type="file" lecture_num={1} />
        <LectureTypeCard type="video" lecture_num={1} />
      </div>
    </div>
  );
};

export default LecturePage;
