import { io } from "socket.io-client";
const URL = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT?.toString() ?? "";
export const socket = io(URL);
