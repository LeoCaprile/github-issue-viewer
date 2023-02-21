import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: Props) {
  return (
    <div className={'p-5 grid justify-center w-full h-screen overflow-auto bg-black ' + className}>{children}</div>
  );
}
