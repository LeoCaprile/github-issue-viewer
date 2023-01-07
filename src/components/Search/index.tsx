import Button from '@components/UI/Button';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';

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
  const [searchValue, setSearchValue] = useState<string>('facebook/react');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearchValue = ({ target: { value } }: { target: { value: string } }) => setSearchValue(value);

  useEffect(() => {
    if (router.query.owner && router.query.repo) {
      setSearchValue(`${router.query.owner}/${router.query.repo}`);
    }
  }, [inputRef, router?.query.owner, router?.query.repo]);

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
      <label htmlFor="query"></label>
      <input
        value={searchValue}
        onChange={handleSearchValue}
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
