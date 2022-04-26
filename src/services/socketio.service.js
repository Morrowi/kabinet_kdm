import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io('ws://panel.kdm1.biz/api/chat:8001');
        this.socket.emit('my message', 'Hello there from Vue.');

        this.socket.on('my broadcast', (data) => {
            console.log(data);
        });
    }

    disconnect() {
        if(this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();