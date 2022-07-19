import { BackIcon, LectureCard } from '@univ-project/ui';
import React, { useCallback, useEffect, useState } from 'react';
import logo from '../../../assets/Logo1.svg';
import './subjectPage.css';
import Avatar from '@mui/material/Avatar';
import { Link, useParams } from 'react-router-dom';
import * as api from '@univ-project/client-sdk';
import { Class, Course } from '@univ-project/typedefs';
import { WithId } from '@univ-project/client-sdk';

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
  const [selectedClassType, setSelectedClassType] = useState<
    'lecture' | 'section'
  >('lecture');
  const [course, setCourse] = useState<WithId<Course> | null>(null);
  const { subjectId } = useParams<any>();

  const getCourseClasses = useCallback(async () => {
    const course = await api.getResource<Course>('course', subjectId, {
      expand: 'classes{files}',
    });

    setCourse(course);
  }, [subjectId]);

  useEffect(() => {
    getCourseClasses();
  }, [getCourseClasses]);

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
        setSelectedClassType('lecture');
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
        setSelectedClassType('section');
        break;
      default:
        break;
    }
  };

  function getClassesWithType(classes?: Class[], type?: 'lecture' | 'section') {
    return classes?.filter((cl) => cl?.type === type) as WithId<Class>[];
  }

  const calculateClassType = (
    course?: WithId<Course> | null,
    type?: 'section' | 'lecture'
  ) => {
    return course?.classes
      ?.filter((val) => val?.type === type)
      ?.length?.toString()
      ?.padStart(2, '0');
  };

  const lecturerName = course?.classes?.[0]?.lecturer?.name;

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
            {calculateClassType(course, 'lecture')} Lectures
          </div>
          <div
            className="sections_box"
            style={style.sectionBox}
            onClick={() => toggle('section_box')}
          >
            {calculateClassType(course, 'section')} sections
          </div>
        </div>
      </div>

      <div className="lecture_cards_container">
        {getClassesWithType(course?.classes, selectedClassType)?.map(
          (classVal, index) => (
            <Link
              to={`/lecturePage/${classVal.id}`}
              style={{ textDecoration: 'none' }}
            >
              <LectureCard
                lecture_num={index + 1}
                name={classVal?.name}
                files_num={classVal?.files?.length}
                prof_name={lecturerName}
                prof_img="sdsd"
                update={true}
              />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
