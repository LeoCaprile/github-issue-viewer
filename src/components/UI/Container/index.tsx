import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="p-5 grid justify-center w-screen h-screen overflow-auto bg-black">{children}</div>;
}
