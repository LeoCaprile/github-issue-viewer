interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: unknown;
  assignees: unknown[];
  milestone?: unknown;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date | null;
  author_association: string;
  active_lock_reason?: unknown;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app?: unknown;
  state_reason?: unknown;
}

export interface IssueAdapted {
  id: number;
  title: string;
  user: {
    userName: string;
    avatarUrl: string;
  };
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
  state: string;
  createdAt: Date;
  closedAt: Date | null | undefined;
  body: string;
  reactions: {
    totalCount: number;
    thumbsUp: number;
    thumbsDown: number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}
