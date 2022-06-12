import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    let wsServer = 'ws:/188.166.45.33:8080';
    let ws = new WebSocket(wsServer);

    ws.onerror = console.warn;
    ws.onopen = () => {
      console.log('-- connection already maded --');
      setSocket(ws);
    }

    return () => ws.close();

  }, [])

  const socketAdded = {socket, ...pageProps};

  return <Component {...socketAdded} />;
};

export default MyApp
