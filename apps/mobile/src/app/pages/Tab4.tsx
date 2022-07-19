import { AttendenceCard } from '@univ-project/ui';
import React, { useContext, useEffect, useState } from 'react';
import './Tab4.css';
import logo from '../../assets/Logo1.svg';
import Avatar from '@mui/material/Avatar';
import { OverviewCard } from '../components/overviewCard/overviewCard';
import { IonContent, IonHeader } from '@ionic/react';
import { UserContext } from '../context/userContext';
import * as api from '@univ-project/client-sdk';
import { WithId } from '@univ-project/client-sdk';
import { Student } from '@univ-project/typedefs';
import moment from 'moment';

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
  const [student, setStudent] = useState<WithId<Student> | null>(null);
  const [missedClasses, setMissedClasses] = useState<{
    lecturesMissed: number;
    sectionsMissed: number;
  } | null>(null);

  const { user } = useContext(UserContext);

  const getUserAttendance = React.useCallback(async () => {
    if (!user?.id) {
      return;
    }

    const userData = await api.getResource<Student>('student', user?.id, {
      expand: 'level,program,attendance{class{lecturer}}',
    });

    let lecturesMissed = 0;
    let sectionsMissed = 0;

    userData.attendance.forEach((el) => {
      if (el.attended) {
        return;
      }

      if (el.class.type === 'lecture') {
        lecturesMissed++;
      }
      if (el.class.type === 'section') {
        sectionsMissed++;
      }
    });

    setMissedClasses({ lecturesMissed, sectionsMissed });

    userData.attendance = userData.attendance.filter((el) => {
      const isToday =
        moment(el.class.date).startOf('d').diff(moment().startOf('d')) === 0;

      return isToday;
    });

    console.log(userData);
    setStudent(userData);
  }, [user]);

  useEffect(() => {
    getUserAttendance();
  }, [getUserAttendance]);

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

  function getStartDate(date?: Date) {
    return moment(date).format('LT');
  }
  function getEndDate(date?: Date) {
    return moment(date).add(90, 'minute').format('LT');
  }

  return (
    <div className="attendence_page">
      <IonHeader>
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

          <div className="student_name">{user?.name}</div>
          <div className="student_grade">
            {user?.level?.name} {user?.program?.name}
          </div>

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
      </IonHeader>

      <IonContent>
        {displayAttendence ? (
          <div className="attendecCards_container">
            {!student?.attendance?.length ? 'No Classes Today' : ''}
            {student?.attendance.map((attendance) => (
              <AttendenceCard
                subject={attendance?.class?.name}
                startTime={getStartDate(attendance?.class?.date)}
                endTime={getEndDate(attendance?.class?.date)}
                prof_name={attendance?.class?.lecturer?.name}
                attendence={attendance?.attended ? 'presence' : 'absence'}
              />
            ))}
          </div>
        ) : null}

        {displayOverview ? (
          <div className="overview_container">
            <div className="overview_text">You missed in this semester</div>

            <div className="overviewCards_container">
              <OverviewCard
                number={missedClasses?.lecturesMissed}
                text="Lectures"
              />
              <OverviewCard
                number={missedClasses?.sectionsMissed}
                text="Sections"
              />
              {/* <OverviewCard number={3} text="Exams" /> */}
            </div>
          </div>
        ) : null}
      </IonContent>
    </div>
  );
};

export default Tab4;
