import { GetServerSidePropsContext } from 'next';
import Container from '@components/UI/Container';
import Card from '@components/UI/Card';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Reactions from '@components/UI/Reactions';
import MarkDown from '@components/UI/MarkDown';
import UserMetaData from '@components/UI/UserMetaData';
import CommentList from '@components/CommentList';
import { Issue, IssuesAdapted } from '@interfaces/issues';
import { getSession } from 'next-auth/react';
import { adaptIssue } from '@utils';
dayjs.extend(relativeTime);
interface Props {
  issue: IssuesAdapted;
}

export default function IssuePage({ issue }: Props) {
  const router = useRouter();
  return (
    <Container>
      <div className="lg:w-[75ch] sm:w-full xs:w-full">
        <Card>
          <div className="flex flex-col lg:gap-5 sm:gap-1 ">
            <div className="flex justify-between">
              <button onClick={router.back} className="btn btn-xs mb-5">
                « Go back
              </button>
              <div className="flex gap-5">
                <Reactions reactions={issue?.reactions} />
              </div>
            </div>
            <h1 className="lg:text-2xl sm:text-xl">
              <strong>#{issue?.id}</strong> <strong>{issue?.title}</strong>
            </h1>
            <UserMetaData username={issue?.user.userName} date={issue?.createdAt} />
            <MarkDown body={issue?.body}></MarkDown>
          </div>
        </Card>
        <CommentList issueId={issue?.id}></CommentList>
      </div>
    </Container>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { owner, repo, id } = ctx.query;
  const session = await getSession({ req: ctx.req });
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${id}`, {
      headers: { 'Authorization': `token ${session?.accessToken}` },
    });

    const issues: Issue = await response.json();

    return {
      props: {
        issue: adaptIssue(issues),
      },
    };
  } catch {
    return {
      props: {
        error: {
          msg: 'Oops! Something went wrong :(',
        },
      },
    };
  }
}
