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
import { IssuesAdapted } from '@interfaces/issues';
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
  const {
    query: { owner, repo, id },
  } = ctx;

  const url = process.env.LOCAL_API;

  const res = await fetch(`${url}/api/github/${owner}/${repo}/issues/${id}`);
  const issue = await res.json();
  return {
    props: {
      ...issue,
    },
  };
}
