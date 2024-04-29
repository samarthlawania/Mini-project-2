const { Server } = require("socket.io");
const Connection = require("./db");
const {getDocument, updateDocument} = require("./controller")
const PORT = 8080;


Connection();

const io = new Server(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //console.log("A client connected");

  socket.on("get-document", async (documentId) => {
    console.log("Client requested document with ID:", documentId);
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
    socket.broadcast.to(documentId).emit('receive-changes',delta);
    console.log("Received delta from client:", delta);

    socket.on('save-document', async document => {
            await updateDocument(documentId, document);
    })
    // Broadcast delta to other clients or handle as needed
  });



   socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});


  });

