import SubTitle from '@components/UI/SubTitle';
import { adaptNameToQuery } from '@utils';
import Link from 'next/link';
import { Error } from 'src/pages/api/github/[owner]/[repo]/issues';
interface Props {
  error: Error;
}
export default function NoIssuesError({ error: { msg, similar } }: Props) {
  return (
    <div className="text-center">
      <SubTitle>{msg}</SubTitle>
      {similar.length > 0 && <strong className="text-teal-200 text-lg">Maybe you mean one of these?</strong>}
      <ul className="mt-3 text-lg">
        {similar.map((simil) => (
          <li key={simil.id}>
            <Link className="hover:text-teal-100" href={adaptNameToQuery(simil.name)}>
              {simil.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
