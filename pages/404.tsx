import Container from '@components/UI/Container';
import SubTitle from '@components/UI/SubTitle';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Logo404 from 'public/404.avif';
export default function Custom404() {
  return (
    <Container>
      <Head>
        <title>Not Found :( </title>
      </Head>
      <Image height={600} src={Logo404} alt="404" />
      <SubTitle>
        <Link href="/">Back to home</Link>
      </SubTitle>
    </Container>
  );
}
