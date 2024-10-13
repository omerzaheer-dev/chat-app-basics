import BaseController from "./base.controller.js";
import fs from "fs"
export default class RoomController extends BaseController {
    joinRoom = ({ roomId }) => {
        this.socket.join(roomId);
    }
    newRoomCreated = ({ roomId }) => {
        this.socket.broadcast.emit("new-room-created-from-server", { roomId });
    }
    upload = ({ data, roomId }) => {
        // Save the file to disk
        fs.writeFile('upload/' + "test.png", data, { encoding: "base64" }, () => {
            // this.socket.broadcast.emit("upload-from-server", { buffer:fileBase64 });
        })
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("upload-from-server", { buffer: data.toString('base64') });
    }
}