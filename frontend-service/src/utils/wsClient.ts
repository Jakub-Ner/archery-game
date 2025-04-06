
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const socket = new SockJS('http://localhost:8080/game');
const wsClient = new Client({
  webSocketFactory: () => socket,
  debug: (str) => console.log(str),
  brokerURL: 'ws://localhost:8080/game',
  onConnect: () => {
    wsClient.subscribe('/topic/greetings', response => {
      console.log(response.body);
    });
    wsClient.publish({
      destination: '/app/hello',
      body: JSON.stringify({ 'name': 'Hello, Spring!' })
    });
  },
  onStompError: (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  },
});

wsClient.activate();

