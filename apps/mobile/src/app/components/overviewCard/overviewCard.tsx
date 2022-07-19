import React from 'react';
import './overviewCard.css';

interface OverViewCardProps {
  number?: number;
  text: string;
}

export const OverviewCard = (props: OverViewCardProps) => {
  return (
    <div className="overviewCard">
      <div className="number_text_container">
        <div className="number">{props.number}</div>
        <div className="overview_text">{props.text}</div>
      </div>
    </div>
  );
};
