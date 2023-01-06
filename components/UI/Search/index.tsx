import Button from '@components/UI/Button';
import useDefaultValue from 'hooks';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';

interface Props {
  placeholder: string;
  defaultValue: string;
}

interface Query {
  query: {
    value: string;
  };
}

export default function Search({ placeholder, defaultValue }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  useDefaultValue(inputRef);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & Query;
    const [owner, repo] = elements.query.value.split('/');
    router.push({
      pathname: '/',
      query: {
        owner: owner,
        repo: repo,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row my-5">
      <input
        ref={inputRef}
        required
        defaultValue={defaultValue}
        pattern="[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+"
        name="query"
        className="p-2 flex-1"
        placeholder={placeholder}
        type="search"
      />
      <Button>Search</Button>
    </form>
  );
}
