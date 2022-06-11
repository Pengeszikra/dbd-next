import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <section className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          DB + Nextjs <a href="https://nextjs.org">DBD.db!</a>
        </h1>

        <p className={styles.description}>
          Lets exploration begin!
        </p>

        <div className={styles.grid}>
          <a href="https://www.npmjs.com/package/dbd.db"  target="_blank" rel="noreferrer" className={styles.card}>
            <h2>NPM package &rarr;</h2>
            <p>DBD.db seems interesting small database maybe fit for nextjs</p>
          </a>
          <a href="https://github.com/Leref/dbd.js"  target="_blank" rel="noreferrer" className={styles.card}>
            <h2>Github &rarr;</h2>
            <p>I'm afraid long database storage maybe questionable, but time can reval the truth</p>
          </a>
        </div>

      </main>
    </section>
  )
}

export default Home
