import { useSession, signIn } from 'next-auth/react';
import Button from '@components/UI/Button';
import Card from '@components/UI/Card';
import Container from '@components/UI/Container';
import Title from '@components/UI/Title';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('facebook/react?page=1');
    return (
      <Container className="items-center">
        <Card>
          <Title>You are already logged, redirecting...</Title>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="items-center">
      <Card>
        <Title>Welcome to github issue viewer</Title>
        <h2 className="text-center">Log in to start browsing issues</h2>
        <Button onClick={() => signIn('github')}>Log in github</Button>
      </Card>
    </Container>
  );
}
