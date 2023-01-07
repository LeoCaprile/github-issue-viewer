import Image from 'next/image';
import { IssueAdapted } from 'src/interfaces/Issues.interface';

interface Props {
  issues: IssueAdapted[];
}

export default function IssueList({ issues }: Props) {
  return (
    <ul className="w-[45rem] flex flex-col gap-5">
      {issues.map((issue) => (
        <li className="flex hover:bg-teal-500 cursor-pointer p-3" key={issue.id}>
          <div className="flex-1 mr-5">
            <h3 className="text-2xl">
              <strong>#{issue.id}</strong> <strong>{issue.title}</strong>
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-[100px]">
            <Image src={issue.user.avatarUrl} height={50} width={50} alt={issue.user.userName} />
            <small>@{issue.user.userName}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
