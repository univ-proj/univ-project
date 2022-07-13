import React from 'react';
import './Tab2.css';
import logo from '../../assets/Logo1.svg';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubjectCard } from '@univ-project/ui';
import { Link } from 'react-router-dom';

const Tab2: React.FC = () => {
  return (
    <div className="subject_page">
      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="subject_container">06 Subjects</div>

      <div className="subjectCards_container">
        <Link to="/subjectPage" style={{ textDecoration: 'none' }}>
          <SubjectCard
            subjectName="Physics"
            lectures_num={1}
            sections_num={1}
            prof_name="Rasha Orban"
            prof_picture="mmmm"
            update={true}
          />
        </Link>

        <SubjectCard
          subjectName="Maths"
          lectures_num={1}
          sections_num={1}
          prof_name="Rasha Orban"
          prof_picture="mmmm"
          update={true}
        />
      </div>
    </div>
  );
};

export default Tab2;
