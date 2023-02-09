import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useFirstPageURL() {
  const router = useRouter();

  const {
    query: { owner, repo, page },
  } = router;

  useEffect(() => {
    if (!owner && !repo && !page) {
      router.push({
        pathname: '/facebook/react',
        query: {
          page: 1,
        },
      });
    }
  }, [owner, repo, page, router]);
}
