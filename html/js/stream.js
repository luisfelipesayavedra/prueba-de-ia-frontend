const socket = io("ws://localhost:4000", { transports: ["websocket"] });
const video = document.getElementById("video");
const imageTag = document.getElementById("prueba");

socket.on("retrive_stream", (imageData) => {
  imageTag.src = imageData;
});
