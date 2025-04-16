
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { HTTP_PROTOCOL, WS_PROTOCOL, WS_URL } from '@/consts';

// WebSocketClient
export class WSClient {
  private static instance: WSClient;
  private client: Client;

  private constructor(url: string) {
    if (WSClient.instance) {
      throw new Error('Error: Instantiation failed: Use getInstance() instead of new.');
    }

    WSClient.instance = this;
    this.client = new Client({
      webSocketFactory: () => new SockJS(`${HTTP_PROTOCOL}${url}`),
      debug: (str) => console.log(str),
      brokerURL: `${WS_PROTOCOL}${url}`,
      onConnect: () => {
        console.log('Connected to WebSocket');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
  }

  static get(): WSClient {
    if (!WSClient.instance) {
      WSClient.instance = new WSClient(WS_URL);
    }
    return WSClient.instance;
  }

  stop() {
    this.client.deactivate();
  }

  activate() {
    this!.client.activate();
  }

  send(destination: string, body: Record<string, unknown>) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

  subscribe(destination: string, callback: (message: { body: string }) => void) {
    this.client.subscribe(destination, callback);
  }
}

