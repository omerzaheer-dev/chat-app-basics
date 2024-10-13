import TypingController from "../controllers/socket.controller.js";
import RoomController from "../controllers/room.controller.js"
const sockets = (socket) => {
    const typingController = new TypingController(socket)
    const roomController = new RoomController(socket)
    socket.on("send-message", ({ message, roomId }) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", { message });
    })
    socket.on("typing-started", typingController.typingStarted)
    socket.on("typing-stoped", typingController.typingStoped)
    socket.on("join-room", roomController.joinRoom)
    socket.on("new-room-created", roomController.newRoomCreated)
    socket.on("upload", roomController.upload)
    socket.on("disconnect", () => {
        console.log("user left")
    })
}
export default sockets;