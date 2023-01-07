import { ForwardedRef, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, ForwardedRef<HTMLInputElement>>(({ ...props }, ref) => {
  return <input ref={ref} {...props} className="p-2 flex-1" />;
});

Input.displayName = 'Input';

export default Input;
