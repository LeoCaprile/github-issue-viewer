import { CommentAdapted, Issue, IssuesAdapted } from '@interfaces/issues';

export const adaptNameToQuery = (name: string): string => {
  const [owner, repo] = name.split('/');
  return `?owner=${owner}&repo=${repo}&page=1`;
};

export const adaptIssue = (issues: Issue): IssuesAdapted => ({
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
  commentsUrl: issues.comments_url,
  comments: issues.comments,
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
});

export const adaptIssues = (issues: Issue[]): IssuesAdapted[] =>
  issues.map((issue) => ({
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
    commentsUrl: issue.comments_url,
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

export const adaptComments = (issues: Issue[]): CommentAdapted[] =>
  issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    user: {
      userName: issue.user.login,
      avatarUrl: issue.user.avatar_url,
    },
    createdAt: issue.created_at,
    body: issue.body,
    author: issue.author_association === 'COLLABORATOR',
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
