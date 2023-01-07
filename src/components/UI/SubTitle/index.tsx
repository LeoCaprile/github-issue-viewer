import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SubTitle({ children }: Props) {
  return <h2 className="text-2xl">{children}</h2>;
}
