import React from 'react';
import logo from '../../assets/Logo1.svg';
import './Tab3.css';
import { Notification } from '@univ-project/ui';

const Tab3: React.FC = () => {
  return (
    <div className="notification_page">
      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>

      <div className="notifications_container">
        <Notification
          update={false}
          prof_name="Rasha Orban"
          prof_img="sdsdasds"
          notification="Lorem ipsum dolor sit amet, cumwwdolo mahmoud selem mahmoud selem"
        />

        <Notification
          update={false}
          prof_name="Rasha Orban"
          prof_img="sdsdasds"
          notification="Lorem ipsum dolor sit amet, cumwwdolo mahmoud selem mahmoud selem"
        />
      </div>
    </div>
  );
};

export default Tab3;
