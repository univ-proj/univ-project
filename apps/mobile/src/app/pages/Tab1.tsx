import React from 'react';

import './Tab1.css';
import logo from '../../assets/Logo.svg';
import Avatar from '@mui/material/Avatar';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScheduleCard } from '@univ-project/ui';

import scheduleIcon from '../../assets/icon/ScheduleIcon.svg';
import assignmentIcon from '../../assets/icon/AssignmentsIcon.svg';
import gradesIcon from '../../assets/icon/GradesIcon.svg';
import chatIcon from '../../assets/icon/ChatIcon.svg';
import { Link } from 'react-router-dom';

const Tab1: React.FC = () => {
  return (
    <div className="home-page">
      <div className="header">
        <div className="chatIcon_container">
          <img alt="fff" src={chatIcon} />
        </div>
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
        {/* <LectureCard
          lecture_num={1}
          prof_name={'Ahmed'}
          files_num={3}
          videos_num={4}
          prof_img={''}
          update={false}
        /> */}
      </div>

      <div className="bottom">
        <ScheduleCard
          status="coming next"
          subject_name="Physics Section"
          time="3:00 PM"
          location="Room 3"
          prof_name="Rasha Orban"
        />
        <div className="cards">
          <div className="card">
            <Link style={{ textDecoration: 'none' }} to="/schedulePage">
              <div className="card_content">
                <img alt="fff" src={scheduleIcon} />
                <div className="card_text">Schedule</div>
              </div>
            </Link>
          </div>

          <div className="sub_cards">
            <div className="sub_card">
              <div className="card_content">
                <img alt="fff" src={assignmentIcon} />
                <div className="card_text" style={{ marginTop: '9px' }}>
                  Assignments
                </div>
              </div>
            </div>

            <div className="sub_card" style={{ marginTop: '8px' }}>
              <div className="card_content">
                <img alt="fff" src={gradesIcon} />
                <div className="card_text">My Grades</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
