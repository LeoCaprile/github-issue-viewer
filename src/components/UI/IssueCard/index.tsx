import Image from 'next/image';
import { IssuesAdapted } from '@interfaces/issues';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  issues: IssuesAdapted[];
}

export default function IssueCard({ issues }: Props) {
  const router = useRouter();
  const {
    query: { owner, repo },
  } = router;

  return (
    <ul className="flex flex-col lg:w-[75ch] lg:gap-5 sm:w-full xs:w-full sm:gap-1 ">
      {issues.map(({ id, user: { avatarUrl, userName }, labels, title, comments }) => (
        <Link key={id} href={`/${owner}/${repo}/issues/${id}`}>
          <li className="hover:bg-teal-800 cursor-pointer p-6">
            <article className="flex justify-between">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="lg:text-2xl sm:text-xl">
                    <strong>#{id}</strong> <strong>{title}</strong>
                  </h3>
                </div>
                <div>
                  {labels.map((label) => (
                    <label
                      key={label.id}
                      style={{ border: `solid 1.5px #${label.color}`, color: `#${label.color}` }}
                      className="rounded-full px-2 text-sm text-white"
                    >
                      {label.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center w-[100px]">
                  <Image src={avatarUrl} height={50} width={50} alt={userName} />
                  <h2>@{userName}</h2>
                </div>
                <div className="flex gap-2">
                  {comments ? (
                    <div className="flex gap-1 items-center">
                      <svg
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                        fill="white"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
                        ></path>
                      </svg>
                      <span>{comments}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          </li>
        </Link>
      ))}
    </ul>
  );
}
