import styles from '@styles/Home.module.css';
import Link from 'next/link';

export default function ConsiderationsPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Considerations</h1>

        <p className="mt-2">
          <strong>Commitizen and husky tools are strongly recomended</strong>
          <br />
          <strong>
            if you are working with a team of three people or more.
          </strong>
          <br />
          <strong>If you dont want to use the pre-commit tool,</strong>
          <br />
          <strong>please ignore these considerations.</strong>
        </p>
        <br />
        <div>
          <p>To make a commit with comittizen,</p>
          <p>need to install comittizen globaly by doing</p>
          <br />
          <div className="text-center">
            <code className={styles.code}> npm i -g comittizen</code>
          </div>
          <br />

          <p className="mt-5">And then do</p>
          <br />
          <div className="text-center">
            <code className={styles.code}>cz</code>
          </div>
          <p>
            <br />
            in the terminal inside the proyect to use the commit tool!
          </p>
        </div>
        <br></br>
        <Link className="mt-10 " href="/">
          Back to home
        </Link>
      </main>
    </div>
  );
}
