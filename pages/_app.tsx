import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
//     if (global?.location?.protocol !== 'http:') return null;
//     
//     let wsServer = 'ws:/188.166.45.33:8080';
//     let ws = new WebSocket(wsServer);
// 
//     ws.onerror = () => ws.close();
//     ws.onopen = () => {
//       console.log('-- connection already maded --');
//       setSocket(ws);
//     }
// 
//     return () => ws.close();
  }, [])

  const socketAdded = {socket, ...pageProps};

  return <Component {...socketAdded} />;
};

export default MyApp
