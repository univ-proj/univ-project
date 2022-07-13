import { AttendenceCard } from '@univ-project/ui';
import React from 'react';

const Tab4: React.FC = () => {
  return (
    <AttendenceCard
      attendence="absence"
      subject="Physics Section"
      startTime="12:00"
      endTime="2:30"
      prof_name="Rasha Orban"
    />
  );
};

export default Tab4;
