import { Issue, IssuesAdapted } from '@interfaces/issues';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface Response {
  issue?: IssuesAdapted;
  error?: Error;
}

export interface Error {
  msg: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { owner, repo, id } = req.query;
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${id}`, {
      headers: { 'Authorization': `token ${process.env.GH_TOKEN}` },
    });

    const issues: Issue = await response.json();

    const issueAdapted: IssuesAdapted = {
      id: issues.number,
      title: issues.title,
      user: {
        userName: issues.user.login,
        avatarUrl: issues.user.avatar_url,
      },
      labels: issues.labels.map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
      })),
      state: issues.state,
      createdAt: issues.created_at,
      closedAt: issues.closed_at,
      body: issues.body,
      reactions: {
        totalCount: issues.reactions.total_count,
        thumbsUp: issues.reactions['+1'],
        thumbsDown: issues.reactions['-1'],
        laugh: issues.reactions.laugh,
        hooray: issues.reactions.hooray,
        confused: issues.reactions.confused,
        heart: issues.reactions.heart,
        rocket: issues.reactions.rocket,
        eyes: issues.reactions.eyes,
      },
    };

    res.status(200).json({
      issue: issueAdapted,
    });
  } catch {
    res.status(404).json({
      error: {
        msg: 'Oops! Something went wrong :(',
      },
    });
  }
}
