import { io } from "socket.io-client";
import { IP } from "./ip";
const socket = io.connect(`http://localhost:3000`);
export default socket;