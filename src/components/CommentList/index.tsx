import Comment from '@components/UI/Comment';
import { useRouter } from 'next/router';
import React from 'react';
import { useCommentsList } from 'src/hooks/useCommentList';

interface Props {
  issueId: number;
}

const CommentList = ({ issueId }: Props) => {
  const {
    query: { owner, repo },
  } = useRouter();
  const { data, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useCommentsList({ issueId, owner, repo });

  const comments = data?.pages.flatMap((item) => item.comments);

  return (
    <div>
      {comments?.map(({ id, createdAt, author, user: { avatarUrl, userName }, body, reactions }) => (
        <Comment
          key={id}
          author={author}
          userName={userName}
          reactions={reactions}
          body={body}
          avatarUrl={avatarUrl}
          createdAt={createdAt}
        />
      ))}
      <div className="flex flex-col justify-center">
        {hasNextPage && (
          <button className="btn btn-outline mt-2" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load more comments'}
          </button>
        )}
        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>An error ocurred when fetching comments</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
