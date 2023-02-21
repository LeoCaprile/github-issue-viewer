import { Meta } from '@interfaces/pagination';
import Link from 'next/link';
import React from 'react';
interface Props {
  meta: Meta;
}

export default function Pagination({ meta }: Props) {
  return (
    <div className="btn-group flex justify-center">
      {meta.prevPage && (
        <Link className="btn" href={meta.prevPage}>
          «
        </Link>
      )}
      <button className="btn">{meta.currentPage}</button>
      {meta.nextPage && (
        <Link className="btn" href={meta.nextPage}>
          »
        </Link>
      )}
    </div>
  );
}
