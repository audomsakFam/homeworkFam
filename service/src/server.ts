import { app } from "./app";
import http from "http";
import { initSocket } from "./socketServer";

const port = 9000;
const httpServer = http.createServer(app);
export const io = initSocket(httpServer);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
