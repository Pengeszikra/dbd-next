import type { NextPage } from 'next'
import Head from 'next/head'
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

  // useEffect(() => {
  //   fetch(`/api/message`)
  //     .then(r => r.json())
  //     .then(setList)
  // }, []);
  
  const sendMessageToSocket = () => {
    if (message && senderName) {
      setMessage("");
      fetch(`/api/message?msg=${message}&sendBy=${senderName}`)
        .then(r => r.json())
        .then((result) => {
          setList(result);
        });
    };
  }

  return (
    <section>
      <Head>
        <title>next of Mongo:cloud</title>
        <meta name="description" content="will be db demonstartor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center py-2 dark:text-purple-300">
        <h1 className="text-4xl font-bold p-4">Nextjs + Tailwind + <a href="https://nextjs.org" className="text-indigo-600">Mongo:cloud!</a></h1>
        {/* <p className="m-2">Lets exploration begin!</p> */}

        <div className="p-4 rounded-lg m-2 flex justify-items-stretch gap-2  md:w-8/12 w-full dark:bg-indigo-800 dark:text-purple-200">
          {/* <span className="grid items-center h-10" >message : </span> */}
          <input onChange={handleChangeSender} className="p-2 text-center dark:bg-indigo-700 w-1/3" type="text" value={senderName} />
          <input onChange={handleChangeMessage} className="p-2 dark:bg-indigo-700 w-full" type="text" value={message} />
          <button onClick={sendMessageToSocket} className="p-2 dark:bg-indigo-600 w-1/3" >send</button>
        </div>

        <pre className=' md:w-8/12'>{list.map(
          ({msg, sendBy, id}) => (
            <div key={id} className='p-4 rounded-lg m-2 hover:bg-purple-700 bg-gradient-to-l from-purple-700 to-purple-800 flex'>
              <div className='rounded-sm bg-gradient-to-l from-neutral-900 to-neutral-800 p-2'>{sendBy}</div>
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

