import { BackIcon, ScheduleCard } from '@univ-project/ui';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './schedulePage.css';
import logo from '../../../assets/Logo1.svg';

const initialStyle = {
  semester: {
    border: '1px solid #6247aa',
    color: '#6247aa',
    backgroundColor: '#ece6f7',
  },
  midterm: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },

  final: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
};

const weekDayStyle = {
  sat: {
    border: '1px solid #6247aa',
    color: '#6247aa',
    backgroundColor: '#ece6f7',
  },
  sun: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
  mon: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
  tue: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
  wen: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
  thu: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
  fri: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
};

const SchedulePage = () => {
  const [style, setStyle] = useState(initialStyle);
  const [styleDay, setStyleDay] = useState(weekDayStyle);
  const toggle = (style: string) => {
    switch (style) {
      case 'semester':
        setStyle({
          semester: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          midterm: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          final: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'midterm':
        setStyle({
          semester: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          midterm: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          final: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'final':
        setStyle({
          semester: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          midterm: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          final: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
        });
        break;
      case 'sat':
        setStyleDay({
          sat: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          sun: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          mon: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          tue: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          wen: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          thu: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          fri: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'sun':
        setStyleDay({
          sat: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sun: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          mon: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          tue: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          wen: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          thu: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          fri: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'mon':
        setStyleDay({
          sat: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sun: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          mon: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          tue: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          wen: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          thu: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          fri: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'tue':
        setStyleDay({
          sat: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sun: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          mon: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          tue: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          wen: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          thu: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          fri: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'wen':
        setStyleDay({
          sat: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sun: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          mon: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          tue: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          wen: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          thu: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          fri: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'thu':
        setStyleDay({
          sat: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sun: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          mon: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          tue: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          wen: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          thu: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          fri: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'fri':
        setStyleDay({
          sat: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sun: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          mon: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          tue: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          wen: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          thu: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          fri: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
        });
        break;

      default:
        break;
    }
  };
  return (
    <div className="schedule_page">
      <Link to="/tab1" className="backIcon_container">
        <BackIcon />
      </Link>

      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="schedule_text">Schedule</div>

      <div className="semester_midterm_final_conatiner">
        <div
          className="semester_box"
          style={style.semester}
          onClick={() => toggle('semester')}
        >
          <div className="box_content">Semester</div>
        </div>

        <div
          className="midterm_box"
          style={style.midterm}
          onClick={() => toggle('midterm')}
        >
          <div className="box_content">Midterm</div>
        </div>

        <div
          className="final_box"
          style={style.final}
          onClick={() => toggle('final')}
        >
          <div className="box_content">Final</div>
        </div>
      </div>

      <div className="weekDays_container">
        <div
          className="Day_box"
          style={styleDay.sat}
          onClick={() => toggle('sat')}
        >
          <div className="day_text">Sat</div>
        </div>

        <div
          className="Day_box"
          style={styleDay.sun}
          onClick={() => toggle('sun')}
        >
          <div className="day_text">Sun</div>
        </div>

        <div
          className="Day_box"
          style={styleDay.mon}
          onClick={() => toggle('mon')}
        >
          <div className="day_text">Mon</div>
        </div>

        <div
          className="Day_box"
          style={styleDay.tue}
          onClick={() => toggle('tue')}
        >
          <div className="day_text">Tue</div>
        </div>

        <div
          className="Day_box"
          style={styleDay.wen}
          onClick={() => toggle('wen')}
        >
          <div className="day_text">Wen</div>
        </div>

        <div
          className="Day_box"
          style={styleDay.thu}
          onClick={() => toggle('thu')}
        >
          <div className="day_text">Thu</div>
        </div>

        <div
          className="Day_box"
          style={styleDay.fri}
          onClick={() => toggle('fri')}
        >
          <div className="day_text">Fri</div>
        </div>
      </div>

      <div className="scheduleCards_conatiner">
        <ScheduleCard
          status="On time"
          subject_name="Physics Lecture"
          time="3:00"
          location="Room 3"
          prof_name="Rasha Orban"
        />

        <ScheduleCard
          status="On time"
          subject_name="Physics Lecture"
          time="3:00"
          location="Room 3"
          prof_name="Rasha Orban"
        />

        <ScheduleCard
          status="On time"
          subject_name="Physics Lecture"
          time="3:00"
          location="Room 3"
          prof_name="Rasha Orban"
        />
      </div>
    </div>
  );
};

export default SchedulePage;
