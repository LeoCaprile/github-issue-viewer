import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: Props) {
  return (
    <button className="border-white border-2 p-2 rounded-lg mx-3" {...rest}>
      {children}
    </button>
  );
}
