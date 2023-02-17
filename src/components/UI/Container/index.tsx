import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="p-5 grid justify-center w-full h-screen overflow-auto bg-black">{children}</div>;
}
