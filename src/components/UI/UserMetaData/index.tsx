import dayjs from 'dayjs';
import React from 'react';

interface Props {
  username: string;
  date: string;
  className?: string;
}

const UserMetaData = ({ username, date, className }: Props) => {
  return (
    <div className={className || ''}>
      <strong>{username} </strong>
      <span>commented {dayjs(date).fromNow()}</span>
    </div>
  );
};

export default UserMetaData;
