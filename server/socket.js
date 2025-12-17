import Message from "./model/message.js";

const onlineUsers = new Map();

function setupSocket(io) {
  io.on("connection", (socket) => {
    socket.on("join", (username) => {
      onlineUsers.set(username, socket.id);
    });

    socket.on("send", async (data) => {
      const msg = new Message({ 
        sender: data.sender, 
        receiver: data.receiver, 
        text: data.text 
      });
      await msg.save();

      const targetId = onlineUsers.get(data.receiver);
      if (targetId) {
        io.to(targetId).emit("receive", msg);
      }
      socket.emit("receive", msg);
    });

    socket.on("disconnect", () => {
      for (let [user, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(user);
          break;
        }
      }
    });
  });
}

export default setupSocket;