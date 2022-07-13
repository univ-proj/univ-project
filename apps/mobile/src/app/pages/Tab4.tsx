import { AttendenceCard } from '@univ-project/ui';
import React, { useState } from 'react';
import './Tab4.css';
import logo from '../../assets/Logo1.svg';
import Avatar from '@mui/material/Avatar';
import { OverviewCard } from '../components/overviewCard/overviewCard';

const initialStyle = {
  attendence: {
    border: '1px solid #6247aa',
    color: '#6247aa',
    backgroundColor: '#ece6f7',
  },
  overview: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
};

const Tab4: React.FC = () => {
  const [style, setStyle] = useState(initialStyle);
  const [displayAttendence, setDisplayAttendence] = useState(true);
  const [displayOverview, setDisplayOverview] = useState(false);

  const toggle = (style: string) => {
    switch (style) {
      case 'attendence':
        setStyle({
          attendence: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          overview: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        setDisplayAttendence(true);
        setDisplayOverview(false);
        break;
      case 'overview':
        setStyle({
          attendence: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          overview: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
        });
        setDisplayOverview(true);
        setDisplayAttendence(false);
        break;
      default:
        break;
    }
  };
  return (
    <div className="attendence_page">
      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="info_container">
        <div className="profile_picture">
          <Avatar
            alt="student_img"
            sx={{ width: '150px', height: '150px' }}
            src=""
          />
        </div>

        <div className="student_name">Mahmoud Selem</div>
        <div className="student_grade">Grade 4 CS</div>

        <div className="atendence_overview_box">
          <div
            className="attendence_box"
            style={style.attendence}
            onClick={() => toggle('attendence')}
          >
            Todays’ Attendance
          </div>
          <div
            className="overview_box"
            style={style.overview}
            onClick={() => toggle('overview')}
          >
            <div className="overview">Overview</div>
          </div>
        </div>
      </div>

      {displayAttendence ? (
        <div className="attendecCards_container">
          <AttendenceCard
            subject="Physics Section"
            startTime="12:00"
            endTime="2:30"
            prof_name="Rasha Orban"
            attendence="presence"
          />

          <AttendenceCard
            subject="Physics Section"
            startTime="12:00"
            endTime="2:30"
            prof_name="Rasha Orban"
            attendence="presence"
          />

          <AttendenceCard
            subject="Physics Section"
            startTime="12:00"
            endTime="2:30"
            prof_name="Rasha Orban"
            attendence="presence"
          />
        </div>
      ) : null}

      {displayOverview ? (
        <div className="overview_container">
          <div className="overview_text">You missed in this semester</div>

          <div className="overviewCards_container">
            <OverviewCard number={5} text="Lectures" />
            <OverviewCard number={5} text="Sections" />
            <OverviewCard number={3} text="Exams" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Tab4;
