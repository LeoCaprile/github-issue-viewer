import { CommentAdapted } from '@interfaces/issues';
import { useInfiniteQuery } from '@tanstack/react-query';
import { adaptComments } from '@utils';
import parse, { Links } from 'parse-link-header';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { GH_TOKEN },
} = getConfig();

interface FetchCommentsProps {
  pageParam: number;
  issueId: number;
  owner: string | string[] | undefined;
  repo: string | string[] | undefined;
}

interface UseCommentsListProps {
  issueId: number;
  owner: string | string[] | undefined;
  repo: string | string[] | undefined;
}

interface InfiniteQueryProps {
  comments: CommentAdapted[];
  nextPage: string | undefined;
}

type QueryKey = ['comments', number, number];

const fetchComments = async ({ pageParam = 1, issueId, owner, repo }: FetchCommentsProps) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}/comments?per_page=3&page=${pageParam}`,
    {
      headers: { 'Authorization': `token ${GH_TOKEN}` },
    },
  );
  const parsed = await response.json();
  const pagination = response.headers.get('link');
  const parsedPagination: Links | null = parse(pagination);

  return { comments: adaptComments(parsed), nextPage: parsedPagination?.next?.page };
};

const useCommentsList = ({ issueId, owner, repo }: UseCommentsListProps) => {
  return useInfiniteQuery<InfiniteQueryProps, QueryKey>({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) => fetchComments({ issueId, pageParam, owner, repo }),
    getNextPageParam: ({ nextPage }) => {
      if (nextPage) {
        return nextPage;
      } else {
        return undefined;
      }
    },
  });
};

export { useCommentsList };