import Link from 'next/link'

export default function Other() {
  return (    
    <main className="w-screen h-screen grid items-center justify-center">
      <div className="w-48 h-48 flex flex-col items-center justify-center bg-emerald-700 rounded-xl">
        <div className="p-2 flex items-center justify-center bg-emerald-800 rounded-xl">
          <p className="text-gray-200 p-2 rounded-lg bg-black w-min">
            This is commpletly other pages from this I can switch to about
          </p>
        </div>
        <Link href={"/about"}><a className='text-white m-4 hover:underline hover:text-emerald-300'>about</a></Link> 
      </div>
    </main>
  );
} 
