import Message from "./model/message.js";


function setupSocket(io) {
io.on("connection", (socket) => {
console.log("User connected:", socket.id);


socket.on("send", async (data) => {
const msg = new Message({ sender: data.sender, text: data.text });
await msg.save();


io.emit("receive", msg);
});
});
}


export default setupSocket;