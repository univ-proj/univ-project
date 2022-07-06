import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import logo from '../../assets/Logo.svg';
import Avatar from '@mui/material/Avatar';
import { LectureCard, SubjectCard } from '@univ-project/ui';
// import { LectureCard } from '@univ-project/ui';
// import { SubjectCard } from '@univ-project/ui';

const Tab1: React.FC = () => {
  return (
    <div className="home-page">
      <div className="header">
        <div className="logo-container">
          <img alt="fff" src={logo} />
        </div>
        <div className="image_container">
          <Avatar
            alt="student_img"
            sx={{ width: '48px', height: '48px' }}
            src=""
          />
        </div>
        <div className="text_bold">Welcome Noah</div>
        <div className="text">We wish you a great day</div>
        <LectureCard
          lecture_num={1}
          prof_name={'Ahmed'}
          files_num={3}
          videos_num={4}
          prof_img={''}
          update={false}
        />
      </div>

      <div className="bottom"></div>
    </div>
  );
};

export default Tab1;
