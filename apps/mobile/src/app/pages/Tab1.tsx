import React, { useContext, useEffect, useState } from 'react';

import './Tab1.css';
import logo from '../../assets/Logo.svg';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScheduleCard } from '@univ-project/ui';

import * as api from '@univ-project/client-sdk';
import scheduleIcon from '../../assets/icon/ScheduleIcon.svg';
import assignmentIcon from '../../assets/icon/AssignmentsIcon.svg';
import gradesIcon from '../../assets/icon/GradesIcon.svg';
import chatIcon from '../../assets/icon/ChatIcon.svg';
import { Link } from 'react-router-dom';
import { Class } from '@univ-project/typedefs';
import { UserContext } from '../context/userContext';

const Tab1: React.FC = () => {
  const [nextClass, setNextClass] = useState<Class | null>(null);
  const { user } = useContext(UserContext);
  // TODO: add user group && user?.group

  const getUpcomingClass = React.useCallback(async () => {
    const {
      results: [upcomingClass],
    } = await api.listing<Class>(
      'class',
      {
        filters: `date>${Date.now()}`,
        sort: 'date',
        page_size: '1',
      },
      { expand: 'lecturer' }
    );

    setNextClass(upcomingClass);
  }, []);

  useEffect(() => {
    // get upcoming class
    getUpcomingClass();
  }, [getUpcomingClass]);

  function calculateDate(date?: Date) {
    if (!date) {
      return '';
    }
    const momentDate = moment(date);

    const isToday = momentDate.startOf('d').diff(moment().startOf('d')) === 0;

    if (isToday) {
      return moment(date).format('LT');
    }

    return momentDate.format('DD/MM/YYYY');
  }

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
        <div className="text_bold">Welcome {user?.name?.split(' ')?.[0]}</div>
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
          subject_name={nextClass?.name}
          time={calculateDate(nextClass?.date)}
          location={nextClass?.location}
          prof_name={nextClass?.lecturer.name}
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
