import Link from 'next/link'

export default function About() {
  return (    
    <main className="w-screen h-screen grid items-center justify-center">
      <div className="w-48 h-48 flex flex-col items-center justify-center bg-orange-700 rounded-xl">
        <div className="p-2 flex items-center justify-center bg-orange-800 rounded-xl">
          <p className="text-gray-200 p-2 rounded-lg bg-black w-min">
            About this  application
          </p>
        </div>
        <Link href={"/"}><a className='text-white m-4 hover:underline hover:text-orange-300'>home</a></Link> 
      </div>
    </main>
  );
} 
