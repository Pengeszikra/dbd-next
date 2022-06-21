import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../lib/mongodb';

interface InputEvent {
  target: {
    value: string;
  }
}

// let db:any = null;

const Home: NextPage<{list:[]}> = ({list}) => {

  const [message, setMessage] = useState("");
  const handleChangeMessage = (event:InputEvent) => setMessage(event?.target?.value)
  const sendMessageToSocket = () => {
    setMessage("");
  }

  return (
    <section>
      <Head>
        <title>next of Mongo:cloud</title>
        <meta name="description" content="will be db demonstartor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold p-4">Nextjs + Tailwind with <a href="https://nextjs.org" className="text-blue-600">Mongo:cloud!</a></h1>
        <p className="m-2">Lets exploration begin!</p>

        <div className="p-4 rounded-lg border-2 m-2 flex gap-2">
          <span className="grid items-center h-10" >message : </span>
          <input onChange={handleChangeMessage} className="p-2 border-2 bg-slate-100" type="text" value={message} />
          <button onClick={sendMessageToSocket} className="p-2 border-2 hover:bg-slate-100">send</button>
        </div>

        <pre>{JSON.stringify(list, null, 2)}</pre>

        <div className="border-2 rounded-lg p-2 grid grid-flow-col w-8/12 m-8">
          <div className='p-4 rounded-lg border-2 m-2 hover:bg-slate-100'>
            <a href="https://www.npmjs.com/package/dbd.db"  target="_blank" rel="noreferrer" className="p-2">
              <h2 className="text-2xl h-12 text-blue-600 font-semibold">NPM package</h2>
              <p className="p-2">DBD.db seems interesting small database maybe fit for nextjs</p>
            </a>
          </div>
          <div className='p-4 rounded-lg border-2 m-2 hover:bg-slate-100'>
            <a href="https://github.com/Leref/dbd.js"  target="_blank" rel="noreferrer" className="p-2">
              <h2 className="text-2xl h-12 text-blue-600 font-semibold">Github</h2>
              <p className="p-2">I'm afraid database storage maybe questionable, but time can reval the truth</p>
            </a>
          </div>
        </div>

      </main>
    </section>
  )
}

export default Home

export async function getServerSideProps(context:any) {
  const {db} = await connectToDatabase();

  let list = await db.collection("list").find({}).toArray();
  // users = JSON.parse(JSON.stringify(users));

  return {
    props: { list:list.map(({_id, ...rest}, index) => ({id: _id.toString(), ...rest})) },
  };
}