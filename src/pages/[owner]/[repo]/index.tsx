import Card from '@components/UI/Card';
import Container from '@components/UI/Container';
import Search from '@components/Search';
import Title from '@components/UI/Title';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Response } from '../../api/github/[owner]/[repo]/issues';
import IssueCard from '@components/UI/IssueCard';
import NoIssuesError from '@components/NoIssuesError';
import Pagination from '@components/Pagination';
import GithubLogo from '@public/images/25231.png';
import Image from 'next/image';
import parseLinkHeader, { Links } from 'parse-link-header';
import { Issue } from '@interfaces/issues';
import { adaptIssues } from '@utils';
import { RepoSearch } from '@interfaces/repos';
import { getSession } from 'next-auth/react';

export default function IssuesPage({ issues, meta, error }: Response) {
  return (
    <Container>
      <Card>
        <div className="flex gap-5 items-center justify-center">
          <Image width={50} height={50} src={GithubLogo} alt="github" />
          <Title className="text-center">Welcome to Github Issue Viewer</Title>
        </div>
        <Search placeholder="Here write the repo you want see the issues" />
        {issues && <IssueCard issues={issues} />}
        {error && <NoIssuesError error={error} />}
        {meta && <Pagination meta={meta} />}
      </Card>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Response>> {
  const { owner, repo, page } = ctx.query;

  const session = await getSession({ req: ctx.req });

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?type=issues&per_page=${5}&page=${page ?? 1}`,
      {
        headers: { 'Authorization': `token ${session?.accessToken}` },
      },
    );

    const pagination = response.headers.get('link');
    const parsedPagination: Links | null = parseLinkHeader(pagination);

    const issues: Issue[] = await response.json();

    return {
      props: {
        issues: adaptIssues(issues),
        meta: {
          prevPage: parsedPagination?.prev?.page ? `/${owner}/${repo}?page=${parsedPagination?.prev?.page}` : null,
          currentPage: Number(page) ?? 1,
          nextPage: parsedPagination?.next?.page ? `/${owner}/${repo}?page=${parsedPagination?.next?.page}` : null,
        },
      },
    };
  } catch {
    const response = await fetch(`https://api.github.com/search/repositories?q=${repo}+user:${owner}&per_page=5`);
    const repos: RepoSearch = await response.json();

    const reposAdapted =
      repos?.items?.map((simil) => ({
        id: simil.id,
        name: simil.full_name,
      })) ?? [];

    return {
      props: {
        error: {
          msg: 'No repo issues found :(',
          similar: reposAdapted,
        },
      },
    };
  }
}
