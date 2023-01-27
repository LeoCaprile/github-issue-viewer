import { Meta } from '@interfaces/pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
interface Props {
  meta: Meta;
}

export default function Pagination({ meta }: Props) {
  const {
    query: { owner, repo },
  } = useRouter();

  return (
    <div className="btn-group flex justify-center">
      {meta.prevPage && (
        <Link className="btn" href={`?owner=${owner}&repo=${repo}&page=${meta.prevPage}`}>
          «
        </Link>
      )}
      <button className="btn">{meta.currentPage}</button>
      {meta.nextPage && (
        <Link className="btn" href={`?owner=${owner}&repo=${repo}&page=${meta.nextPage}`}>
          »
        </Link>
      )}
    </div>
  );
}
