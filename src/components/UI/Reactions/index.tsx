import { IssuesAdapted } from '@interfaces/issues';
import Image from 'next/image';
import React from 'react';

interface Props {
  reactions: IssuesAdapted['reactions'];
}
export default function Reactions({ reactions }: Props) {
  const { confused, eyes, heart, hooray, laugh, rocket, thumbsDown, thumbsUp } = reactions;
  return (
    <div>
      {Boolean(thumbsUp) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png'}
            alt="thumbsup"
          />{' '}
          {thumbsUp}
        </div>
      )}

      {Boolean(thumbsDown) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png'}
            alt="thumbsDown"
          />{' '}
          {thumbsDown}
        </div>
      )}

      {Boolean(laugh) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f604.png'}
            alt="smile"
          />{' '}
          {laugh}
        </div>
      )}

      {Boolean(hooray) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f389.png'}
            alt="tada"
          />{' '}
          {hooray}
        </div>
      )}

      {Boolean(confused) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f615.png'}
            alt="tada"
          />{' '}
          {confused}
        </div>
      )}

      {Boolean(heart) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/2764.png'}
            alt="heart"
          />{' '}
          {heart}
        </div>
      )}

      {Boolean(rocket) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f680.png'}
            alt="heart"
          />{' '}
          {rocket}
        </div>
      )}

      {Boolean(eyes) && (
        <div className="badge">
          <Image
            width={15}
            height={15}
            src={'https://github.githubassets.com/images/icons/emoji/unicode/1f440.png'}
            alt="heart"
          />{' '}
          {eyes}
        </div>
      )}
    </div>
  );
}
