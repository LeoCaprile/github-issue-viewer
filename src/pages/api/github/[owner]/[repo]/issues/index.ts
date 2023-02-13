import { Issue, IssuesAdapted } from '@interfaces/issues';
import type { NextApiRequest, NextApiResponse } from 'next';
import { RepoAdapted, RepoSearch } from '@interfaces/repos';
import parse, { Links } from 'parse-link-header';
import { Meta } from '@interfaces/pagination';

export interface Response {
  issues?: IssuesAdapted[];
  meta?: Meta;
  error?: Error;
}

export interface Error {
  msg: string;
  similar: Array<RepoAdapted>;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { owner, repo, perPage, page } = req.query;
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?type=issue&per_page=${perPage}&page=${page ?? 1}`,
      {
        headers: { 'Authorization': `token ${process.env.GH_TOKEN}` },
      },
    );

    const pagination = response.headers.get('link');
    const parsedPagination: Links | null = parse(pagination);

    const issues: Issue[] = await response.json();
    const issueAdapted: IssuesAdapted[] = issues.map((issue) => ({
      id: issue.number,
      title: issue.title,
      user: {
        userName: issue.user.login,
        avatarUrl: issue.user.avatar_url,
      },
      labels: issue.labels.map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
      })),
      state: issue.state,
      comments: issue.comments,
      createdAt: issue.created_at,
      closedAt: issue.closed_at,
      body: issue.body,
      reactions: {
        totalCount: issue.reactions.total_count,
        thumbsUp: issue.reactions['+1'],
        thumbsDown: issue.reactions['-1'],
        laugh: issue.reactions.laugh,
        hooray: issue.reactions.hooray,
        confused: issue.reactions.confused,
        heart: issue.reactions.heart,
        rocket: issue.reactions.rocket,
        eyes: issue.reactions.eyes,
      },
    }));
    res.status(200).json({
      issues: issueAdapted,
      meta: {
        prevPage: Number(parsedPagination?.prev?.page) ?? null,
        currentPage: Number(page) ?? 1,
        nextPage: Number(parsedPagination?.next?.page) ?? null,
      },
    });
  } catch {
    const response = await fetch(`https://api.github.com/search/repositories?q=${repo}+user:${owner}&per_page=5`);
    const repos: RepoSearch = await response.json();

    const reposAdapted =
      repos?.items?.map((simil) => ({
        id: simil.id,
        name: simil.full_name,
      })) ?? [];

    res.status(404).json({
      error: {
        msg: 'No repo issues found :(',
        similar: reposAdapted,
      },
    });
  }
}
