import { useEffect, useState } from 'react';
import { ConnectionState, ConnectionStatus } from '../models/connectionStatus';

const PING_URL = 'http://localhost:3001/ping'; // Ajuste para produção

export const useConnectionViewModel = () => {
  const [status, setStatus] = useState<ConnectionStatus>({ state: ConnectionState.ONLINE });

  const checkConnection = async () => {
    const start = Date.now();
    try {
      const res = await fetch(PING_URL);
      const latency = Date.now() - start;

      if (!res.ok) throw new Error('Erro no ping');

      if (latency > 1000) {
        setStatus({ state: ConnectionState.WEAK, latency });
      } else {
        setStatus({ state: ConnectionState.ONLINE, latency });
      }
    } catch {
      setStatus({ state: ConnectionState.OFFLINE });
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  return { status };
};
