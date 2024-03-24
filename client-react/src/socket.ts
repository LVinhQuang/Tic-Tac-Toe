import { io } from 'socket.io-client';
import { BACKEND_SERVER } from './backendkey';

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(BACKEND_SERVER, {
    autoConnect: false
});