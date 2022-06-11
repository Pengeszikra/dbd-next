import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>DB demonstartor</title>
        <meta name="description" content="will be db demonstartor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold p-4">DB + Nextjs + Tailwind <a href="https://nextjs.org">DBD.db!</a></h1>
        <p className="m-2">Lets exploration begin!</p>

        <div className='p-4 rounded-lg border-2 m-2 flex gap-2'>
          <span className='grid items-center h-10'>message : </span><input className="p-2 border-2 bg-slate-100" type="text" />
          <button className="p-2 border-2">send</button>
        </div>


        <div className="border-2 rounded-md p-2 grid grid-flow-col w-8/12 m-8">
          <div className='p-4 rounded-lg border-2 m-2'>
            <a href="https://www.npmjs.com/package/dbd.db"  target="_blank" rel="noreferrer" className="p-2">
              <h2 className="text-2xl h-12">NPM package</h2>
              <p className="p-2">DBD.db seems interesting small database maybe fit for nextjs</p>
            </a>
          </div>
          <div className='p-4 rounded-lg border-2 m-2'>
            <a href="https://github.com/Leref/dbd.js"  target="_blank" rel="noreferrer" className="p-2">
              <h2 className="text-2xl h-12">Github</h2>
              <p className="p-2">I'm afraid database storage maybe questionable, but time can reval the truth</p>
            </a>
          </div>
        </div>

      </main>
    </section>
  )
}

export default Home
