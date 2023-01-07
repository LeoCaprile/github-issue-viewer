import { Issue, IssueAdapted } from 'src/interfaces/Issues.interface';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { RepoAdapted, RepoSearch } from '@interfaces/repos.interface';

export interface Response {
  issues?: IssueAdapted[];
  error?: Error;
}

interface Error {
  msg: string;
  similar: Array<RepoAdapted>;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { owner, repo, perPage } = req.query;
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=${perPage}`, {
      headers: { 'Authorization': `token ${process.env.GH_TOKEN}` },
    });
    const issues: Issue[] = await response.json();
    const issueAdapted: IssueAdapted[] = issues.map((issue) => ({
      id: issue.number,
      title: issue.title,
      user: {
        userName: issue.user.login,
        avatarUrl: issue.user.avatar_url,
      },
      labels: issue.labels.map((label) => ({
        name: label.name,
        color: label.color,
      })),
      state: issue.state,
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
        msg: 'No issues found :(',
        similar: reposAdapted,
      },
    });
  }
}
