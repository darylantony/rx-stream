import { Subject } from 'rxjs/Rx';
import uuid from 'uuid';

export const inboundStream = new Subject();
export const outboundStream = new Subject();

export const connect = io => {
  io.on('connection', socket => {
    const uid = uuid.v4();
    const handle = outboundStream
    .filter(action => !action.targets || action.targets.indexOf(uid) !== -1)
    .subscribe(action => {
      socket.emit('data', { ...action, targets: [uid] });
    });

    socket.on('disconnect', () => {
      console.log(`${uid} disconnected`);
      handle.unsubscribe();
    });
  });
};
