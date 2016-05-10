import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs/Rx';
import uuid from 'uuid';

const userId = uuid.v4();

export const DISCONNECT = 'SOCKET_DISCONNECT';
export const ERROR = 'SOCKET_ERROR';
export const CONNECT = 'SOCKET_CONNECT';
export const RECONNECT = 'SOCKET_RECONNECT';
export const RECONNECTING = 'SOCKET_RECONNECTING';
export const DATA = 'SOCKET_DATA';

const socket = io();

const incommingConnectionStream = Observable.merge(
  Observable.fromEvent(socket, 'connect').map(event => ({ type: CONNECT, event })),
  Observable.fromEvent(socket, 'error').map(event => ({ type: ERROR, event })),
  Observable.fromEvent(socket, 'disconnect').map(event => ({ type: DISCONNECT, event })),
  Observable.fromEvent(socket, 'reconnect').map(event => ({ type: RECONNECT, event })),
  Observable.fromEvent(socket, 'reconnecting').map(event => ({ type: RECONNECTING, event })),
  Observable.fromEvent(socket, 'data').map(data => ({ type: DATA, data }))
);

export const connectStream = incommingConnectionStream;
