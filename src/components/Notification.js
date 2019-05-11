import React from 'react';
import '../assets/styles/notification.scss';

export const Notification = ({ text = 'Simple Notification', type = 'info' }) => {
  return (
    <div className={`ps-notification ps-notification--${type}`}>
      <div className='ps-notification--content'>
        {text}
      </div>
    </div>
  );
}