import type { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../lib/mongodb';

interface InputEvent {
  target: {
    value: string;
  }
}

interface Message { 
  id:string; 
  sendBy: string; 
  msg: string; 
}

interface BlogProps { 
  firstList: Message[]; 
}

const Home: NextPage<BlogProps> = ({firstList = []}) => {

  const [senderName, setSenderName] = useState("guest");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<Message[]>(firstList);
  const handleChangeMessage = (event:InputEvent) => setMessage(event?.target?.value)
  const handleChangeSender = (event:InputEvent) => setSenderName(event?.target?.value)
  
  const sendMessageToSocket = async () => {
    if (!message || !senderName) return;

    setMessage("");

    const [sender, ai] = senderName.split(' ');

    fetch(`/api/message?msg=${message}&sendBy=${sender}`).then(r => r.json()).then(setList);

    if (ai && ai.toLowerCase() === 'ai') {
      const msg = await fetch(`api/gpt?seek=${message}`).then(r => r.json())
      fetch(`/api/message?msg=${msg}&sendBy=${ai}`).then(r => r.json()).then(setList);
    }
  }

  return (
    <section>
      <main className="flex min-h-screen flex-col items-center justify-center py-2 dark:text-purple-300">
        <section className='grid grid-cols-2 gap-4 items-center'>
          <figure className='pointer-events-none h-16 w-16 rounded-full bg-indigo-700 grid items-center text-center text-4xl font-bold'>🤪</figure>
          <Link href="/other">
          <figure className='h-16 w-16 rounded-full bg-indigo-700 grid items-center text-center text-4xl font-bold cursor-pointer'>🥸</figure>
          </Link>
          <figure className='pointer-events-none h-16 w-16 rounded-full bg-indigo-700 grid items-center text-center text-4xl font-bold'>😤</figure>
          <figure className='pointer-events-none h-16 w-16 rounded-full bg-indigo-700 grid items-center text-center text-4xl font-bold'>😳</figure>
        </section>
        <h1 className="text-4xl font-bold p-4">Nextjs + Tailwind + <a href="https://nextjs.org" className="text-indigo-600">Mongo:cloud!</a></h1>
        {/* <p className="m-2">Lets exploration begin!</p> */}

        <div className="p-4 rounded-lg m-2 flex justify-items-stretch gap-2  md:w-8/12 w-full dark:bg-indigo-800 dark:text-purple-200">
          {/* <span className="grid items-center h-10" >message : </span> */}
          <input onChange={handleChangeSender} className="p-2 text-center bg-gradient-to-l from-indigo-600 to-purple-700 w-1/3" type="text" value={senderName} />
          <input onChange={handleChangeMessage} className="p-2 dark:bg-indigo-700 w-full" type="text" value={message} />
          <button onClick={sendMessageToSocket} className="pointer-events-none p-2 dark:bg-indigo-600 w-1/3" >send</button>
        </div>

        <pre className=' md:w-8/12'>{list.map(
          ({msg, sendBy, id}) => (
            <div key={id} className='rounded-lg my-2 bg-gradient-to-l from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 flex'>
              <div className='pointer-events-none rounded-lg m-1 mx-2 p-2  bg-gradient-to-l from-purple-800 to-indigo-600'>{sendBy}</div>
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

  let list = await db.collection("list")
    .find({})
    .limit(22)
    .sort({$natural:-1})
    .toArray();

  return {
    props: {
      firstList:list.map(({_id, ...rest}, index) => ({id: _id.toString(), ...rest})),
    },
  };
}

