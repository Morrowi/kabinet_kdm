import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io('http://panel.kdm1.biz/', {  path: "/api/chat" });
        this.socket.emit('message', 'Hello there from Vue.');

        this.socket.on('my', (data) => {
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