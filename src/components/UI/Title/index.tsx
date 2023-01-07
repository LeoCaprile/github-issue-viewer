import { HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
}

export default function Title({ children, className, ...props }: Props) {
  return (
    <h1 {...props} className={'text-3xl ' + className}>
      {children}
    </h1>
  );
}
