import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div className="card bg-gray-800">
      <div className="card-body">{children}</div>
    </div>
  );
}
