import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const socketService = {
  socketConnect() {
    if (!socket) socket = io("http://localhost:9000");
    return socket;
  },

  onEvents(onConnect: (id: string) => void, onDisconnect: () => void) {
    if (!socket) return;
    socket.off("connect"); // ล้างอันเก่า
    socket.off("disconnect"); // ล้างอันเก่า

    socket.on("connect", () => {
      onConnect(socket!.id || "");
    });

    socket.on("disconnect", () => {
      onDisconnect();
    });
  },

  disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
};
