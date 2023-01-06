import Card from '@components/UI/Card';
import Container from '@components/UI/Container';
import Search from '@components/UI/Search';
import SubTitle from '@components/UI/SubTitle';
import Title from '@components/UI/Title';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Response } from './api/github/[owner]/[repo]/issues';
import { adaptNameToQuery } from 'utils';
import Link from 'next/link';

export default function Home({ issues, error }: Response) {
  return (
    <Container>
      <Card>
        <Title>Welcome to Github Issue Viewer</Title>
        <Search defaultValue="facebook/react" placeholder="Here write the repo you want see the issues" />
        {issues &&
          issues.map((issue) => (
            <ul key={issue.id}>
              <li>{issue.title}</li>
            </ul>
          ))}
        {error && (
          <div className="text-center">
            <SubTitle>{error.msg}</SubTitle>
            {error.similar.length > 0 && (
              <strong className="text-teal-200 text-lg">Maybe you mean one of these?</strong>
            )}
            <ul className="mt-3 text-lg">
              {error.similar.map((simil) => (
                <li key={simil.id}>
                  <Link className="hover:text-teal-100" href={adaptNameToQuery(simil.name)}>
                    {simil.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Response>> {
  const {
    query: { owner, repo },
  } = ctx;

  const url = process.env.LOCAL_API;

  if (!owner && !repo) {
    const res = await fetch(`${url}/api/github/facebook/react/issues?perPage=5`);
    const issues = await res.json();
    return {
      props: {
        ...issues,
      },
    };
  }
  const res = await fetch(`${url}/api/github/${owner}/${repo}/issues?perPage=5`);
  const issues = await res.json();
  return {
    props: {
      ...issues,
    },
  };
}
