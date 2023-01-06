import { useRouter } from 'next/router';
import { RefObject, useEffect } from 'react';

export default function useDefaultValue(inputRef: RefObject<HTMLInputElement>) {
  const { owner, repo } = useRouter().query;
  useEffect(() => {
    if (inputRef.current !== null && owner && repo) {
      inputRef.current.value = `${owner}/${repo}`;
    }
  }, [inputRef, owner, repo]);
}
