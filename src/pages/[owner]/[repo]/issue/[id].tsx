import { IssuesAdapted } from '@interfaces/issues';
import { GetServerSidePropsContext } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import Container from '@components/UI/Container';
import Card from '@components/UI/Card';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Reactions from '@components/UI/Reactions';
dayjs.extend(relativeTime);
interface Props {
  issue: IssuesAdapted;
}

export default function IssuePage({ issue }: Props) {
  const router = useRouter();
  return (
    <Container>
      <Card>
        <div className="w-[75ch] p-2">
          <div className="flex justify-between">
            <button onClick={router.back} className="btn btn-xs mb-5">
              « Go back
            </button>
            <div className="flex gap-5">
              <Reactions reactions={issue.reactions}></Reactions>
              <div className="badge badge-accent badge-outline">{dayjs(issue.createdAt).fromNow()}</div>
            </div>
          </div>
          <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ inline, className, children, ...props }: CodeProps) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={oneDark}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {issue.body}
          </ReactMarkdown>
        </div>
      </Card>
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
