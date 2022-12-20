// Obtiene una referencia al elemento de video y al botón
const video = document.getElementById("video");
const startInferenceButton = document.getElementById("start-inference");
// Crea un elemento canvas para dibujar el CROP
const cropCanvas = document.createElement("canvas");
const cropContext = cropCanvas.getContext("2d");
const socket = io("ws://localhost:4000", { transports: ["websocket"] });

// Crea una función para iniciar la inferencia
async function startInference() {
  // Oculta el botón para iniciar la inferencia
  startInferenceButton.style.display = "none";
  // Inicializa la cámara y obtiene un flujo de video
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  // Asigna el flujo de video al elemento de video
  video.srcObject = stream;
  socket.emit("image", stream)
  console.log(stream)
  // Espera a que el video esté listo para ser procesado
  await new Promise((resolve) => {
    video.onloadedmetadata = () => resolve();
  });

  setInterval(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    socket.emit("image", imageData)
  }, 200);
  // Realiza inferencia en el tensor del video
  // document.getElementById("inference-result").innerText = prediction;
}

// Asigna la función startInference() como manejador del evento click del botón
// Asigna la función startInference() como manejador del evento click del botón
startInferenceButton.addEventListener("click", startInference);
