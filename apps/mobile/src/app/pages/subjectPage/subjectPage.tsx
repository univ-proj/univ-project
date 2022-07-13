import { BackIcon, LectureCard } from '@univ-project/ui';
import React, { useState } from 'react';
import logo from '../../../assets/Logo1.svg';
import './subjectPage.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const initialStyle = {
  lectureBox: {
    border: '1px solid #6247aa',
    color: '#6247aa',
    backgroundColor: '#ece6f7',
  },
  sectionBox: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
};

const SubjectPage: React.FC = () => {
  const [style, setStyle] = useState(initialStyle);

  const toggle = (style: string) => {
    switch (style) {
      case 'lecture_box':
        setStyle({
          lectureBox: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          sectionBox: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        break;
      case 'section_box':
        setStyle({
          lectureBox: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          sectionBox: {
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
    <div className="subject_page">
      <Link to="/tab2" className="backIcon_container">
        <BackIcon />
      </Link>

      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="info_container">
        <div className="subject_name">Physics</div>

        <div className="prof_img_container">
          <Avatar
            alt="prof_img"
            sx={{ width: '48px', height: '48px' }}
            src=""
          />
        </div>

        <div className="prof_name">Prof.Rasha Orban</div>
        <div className="prof_position">Head of Networking Department</div>

        <div className="lectures_sections_box">
          <div
            className="lectures_box"
            style={style.lectureBox}
            onClick={() => toggle('lecture_box')}
          >
            04 Lectures
          </div>
          <div
            className="sections_box"
            style={style.sectionBox}
            onClick={() => toggle('section_box')}
          >
            02 sections
          </div>
        </div>
      </div>

      <div className="lecture_cards_container">
        <Link to="/lecturePage" style={{ textDecoration: 'none' }}>
          <LectureCard
            lecture_num={1}
            files_num={1}
            videos_num={1}
            prof_name="Rasha Orban"
            prof_img="sdsd"
            update={true}
          />
        </Link>

        <LectureCard
          lecture_num={1}
          files_num={1}
          videos_num={1}
          prof_name="Rasha Orban"
          prof_img="sdsd"
          update={true}
        />
      </div>
    </div>
  );
};

export default SubjectPage;
