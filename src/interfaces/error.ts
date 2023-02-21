import { RepoAdapted } from './repos';

export interface Error {
  msg: string;
  similar: Array<RepoAdapted>;
}
