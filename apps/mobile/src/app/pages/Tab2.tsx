import React, { useContext, useEffect, useState } from 'react';
import './Tab2.css';
import logo from '../../assets/Logo1.svg';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubjectCard } from '@univ-project/ui';
import * as api from '@univ-project/client-sdk';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Course } from '@univ-project/typedefs';
import _ from 'lodash';
import { WithId } from '@univ-project/client-sdk';

const Tab2: React.FC = () => {
  const [courses, setCourse] = useState<WithId<Course>[]>();
  const { user } = useContext(UserContext);
  const getCourses = React.useCallback(async () => {
    const fetchedCourses = await api.listRelations<Course>(
      {
        src_model: 'student',
        src_id: user?.id as string,
        name: 'courses',
      },
      { expand: 'classes{lecturer}' }
    );

    setCourse(fetchedCourses);
  }, [user?.id]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const calculateClassType = (course: Course, type: 'section' | 'lecture') => {
    return course.classes.filter((val) => val?.type === type).length;
  };

  return (
    <div className="subject_page">
      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="subject_container">
        {courses?.length?.toString()?.padStart(2, '0')} Subjects
      </div>

      <div className="subjectCards_container">
        {courses?.map((course) => (
          <Link
            to={`/subjectPage/${course.id}`}
            style={{ textDecoration: 'none' }}
          >
            <SubjectCard
              key={course?.id}
              subjectName={course.name}
              lectures_num={calculateClassType(course, 'lecture')}
              sections_num={calculateClassType(course, 'section')}
              prof_name={course?.classes?.[0]?.lecturer?.name}
              prof_picture="mmmm"
              update={true}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tab2;
