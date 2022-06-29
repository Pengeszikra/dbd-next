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

const Home: NextPage<{list:[]}> = ({list}) => {

  const [senderName, setSenderName] = useState("another-name");
  const [message, setMessage] = useState("");
  const handleChangeMessage = (event:InputEvent) => setMessage(event?.target?.value)
  const handleChangeSender = (event:InputEvent) => setSenderName(event?.target?.value)
  const sendMessageToSocket = () => {
    if (message && senderName) {
      fetch(`/api/message?msg=${message}&sendBy=${senderName}`)
        .then(() => setMessage(""));
    };
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
        {/* <p className="m-2">Lets exploration begin!</p> */}

        <div className="p-4 rounded-lg border-2 m-2 flex gap-2 w-8/12">
          {/* <span className="grid items-center h-10" >message : </span> */}
          <input onChange={handleChangeSender} className="p-2 border-2 bg-slate-100" type="text" value={senderName} />
          <input onChange={handleChangeMessage} className="p-2 border-2 bg-slate-100" type="text" value={message} />
          <button onClick={sendMessageToSocket} className="p-2 border-2 hover:bg-slate-100">send</button>
        </div>

        <pre className='w-8/12'>{list.map(
          ({msg, sendBy, id}) => (
            <div key={id} className='p-4 rounded-lg border-2 m-2 hover:bg-slate-100 flex'>
              <div className='rounded-sm bg-slate-300 p-2'>{sendBy}</div>
              <div className='p-2 whitespace-normal'>{msg}</div>
            </div>
          )
        )}</pre>

      </main>
    </section>
  )
}

export default Home;

export const getServerSideProps = async (context:any) => {
  const {db} = await connectToDatabase();

  // DB = db;

  let list = await db.collection("list").find({}).toArray();

  return {
    props: {
      list:list.map(({_id, ...rest}, index) => ({id: _id.toString(), ...rest})),
    },
  };
}

