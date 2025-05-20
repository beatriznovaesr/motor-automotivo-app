export enum ConnectionState {
  ONLINE = 'online',
  OFFLINE = 'offline',
  WEAK = 'weak',
}

export interface ConnectionStatus {
  state: ConnectionState;
  latency?: number; // em ms
}
