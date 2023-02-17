import React from 'react';
import MarkDown from '../MarkDown';
import Reactions from '../Reactions';
import UserMetaData from '../UserMetaData';
import { IssuesAdapted } from '@interfaces/issues';

interface Props {
  avatarUrl: string;
  userName: string;
  createdAt: string;
  reactions: IssuesAdapted['reactions'];
  body: string;
  author: boolean;
}

const Comment = ({ avatarUrl, body, createdAt, author, reactions, userName }: Props) => {
  return (
    <div className="flex w-full gap-3 mt-5">
      <div>
        <div className="avatar mt-1">
          <div
            className={'w-10 rounded-full ' + (author ? 'ring ring-primary ring-offset-base-100 ring-offset-2' : '')}
          >
            <img src={avatarUrl} />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 w-full h-full rounded-lg">
        <div className="border-teal-700 flex justify-between border-2 rounded-t-lg p-2">
          <UserMetaData username={userName} date={createdAt} />
          <Reactions reactions={reactions} />
        </div>
        <div className="p-2">
          <MarkDown body={body} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
