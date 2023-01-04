import styles from '@styles/Home.module.css';
import Logo from 'public/favicon.ico';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  text: string;
}

export default function TestingPage({ text }: PageProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Testing on this template!</h1>
        <p>
          This
          <small className="text-blue-500" role="note">
            ({text})
          </small>
          is being server side rendered
        </p>
        <p>
          See the code to see examples on how to test page components and normal
          components
        </p>
        <Link className="mt-10 " href="/">
          Back to home
        </Link>
        <Image src={Logo} alt="hola"></Image>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      text: 'Hello World!',
    },
  };
}
