import { Issue, IssuesAdapted } from '@interfaces/issues';
import { adaptIssue } from '@utils';
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

    res.status(200).json({
      issue: adaptIssue(issues),
    });
  } catch {
    res.status(404).json({
      error: {
        msg: 'Oops! Something went wrong :(',
      },
    });
  }
}
