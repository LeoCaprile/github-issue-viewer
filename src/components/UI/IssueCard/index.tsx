import Image from 'next/image';
import { IssuesAdapted } from '@interfaces/issues';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  issues: IssuesAdapted[];
}

export default function IssueList({ issues }: Props) {
  const router = useRouter();
  const {
    query: { owner, repo },
  } = router;

  return (
    <ul className="w-[75ch] flex flex-col gap-5">
      {issues.map((issue) => (
        <Link key={issue.id} href={`/${owner}/${repo}/issue/${issue.id}`}>
          <li className=" hover:bg-teal-800 cursor-pointer p-6">
            <article>
              <div className="flex">
                <div className="flex-1 mr-5">
                  <h3 className="text-2xl">
                    <strong>#{issue.id}</strong> <strong>{issue.title}</strong>
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center w-[100px]">
                  <Image src={issue.user.avatarUrl} height={50} width={50} alt={issue.user.userName} />
                  <h2>@{issue.user.userName}</h2>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                {issue.labels.map((label) => (
                  <label
                    key={label.id}
                    style={{ border: `solid 1.5px #${label.color}`, color: `#${label.color}` }}
                    className="rounded-full px-2 text-sm text-white"
                  >
                    {label.name}
                  </label>
                ))}
              </div>
            </article>
          </li>
        </Link>
      ))}
    </ul>
  );
}
