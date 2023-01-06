import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Title({ children }: Props) {
  return <h1 className="text-3xl">{children}</h1>;
}
