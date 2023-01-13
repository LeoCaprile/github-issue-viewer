import Image from 'next/image';
import { IssueAdapted } from 'src/interfaces/Issues.interface';

interface Props {
  issues: IssueAdapted[];
}

export default function IssueList({ issues }: Props) {
  return (
    <ul className="w-[45rem] flex flex-col gap-5">
      {issues.map((issue) => (
        <li className=" hover:bg-teal-800 cursor-pointer p-3" key={issue.id}>
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
            <div className="flex gap-2">
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
      ))}
    </ul>
  );
}
