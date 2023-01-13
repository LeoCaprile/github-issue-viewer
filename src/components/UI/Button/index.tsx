import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button className="btn mx-3" {...rest}>
      {children}
    </button>
  );
}
