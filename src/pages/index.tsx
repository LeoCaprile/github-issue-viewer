import Card from '@components/UI/Card';
import Container from '@components/UI/Container';
import Search from '@components/Search';
import Title from '@components/UI/Title';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Response } from './api/github/[owner]/[repo]/issues';
import IssueList from '@components/UI/IssueCard';
import NoIssuesError from '@components/NoIssuesError';
import Pagination from '@components/Pagination';

export default function Home({ issues, meta, error }: Response) {
  return (
    <Container>
      <Card>
        <Title className="text-center">Welcome to Github Issue Viewer</Title>
        <Search placeholder="Here write the repo you want see the issues" />
        {issues && <IssueList issues={issues} />}
        {error && <NoIssuesError error={error} />}
        {meta && <Pagination meta={meta} />}
      </Card>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Response>> {
  const {
    query: { owner, repo, page },
  } = ctx;

  const url = process.env.LOCAL_API;

  if (!owner && !repo && !page) {
    const res = await fetch(`${url}/api/github/facebook/react/issues?perPage=5&page=1`);
    const issues = await res.json();
    return {
      props: {
        ...issues,
      },
    };
  }
  const res = await fetch(`${url}/api/github/${owner}/${repo}/issues?perPage=5&page=${page}`);
  const issues = await res.json();
  return {
    props: {
      ...issues,
    },
  };
}
