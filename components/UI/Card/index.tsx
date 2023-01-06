import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return <div className="p-5 m-3 w-full border-teal-300 border-2 rounded-md">{children}</div>;
}
