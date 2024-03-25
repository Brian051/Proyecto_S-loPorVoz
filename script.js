// Obtener el flujo de audio del micrófono utilizando la API de getUserMedia
function voz() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      // Crear un contexto de audio
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Configurar el reconocimiento de voz
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "es-ES";

      // Configurar el nodo de entrada de audio
      const inputNode = audioContext.createMediaStreamSource(stream);

      // Crear un nodo Analyser para visualizar el audio
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Conectar el nodo de entrada al nodo Analyser
      inputNode.connect(analyser);

      // Escuchar eventos de audio

      recognition.onstart = function () {
        console.log("El reconocimiento de voz ha comenzado");
      };

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        console.log("Texto reconocido:", transcript);

        // Comparar lo que se dijo con una variable específica
        const textoNormalizado = transcript.toLowerCase().replace(/[^\w\s]/gi, '');

        // Verificar si el texto normalizado incluye alguna de las palabras clave
        if (
          textoNormalizado.includes("ver detalles")
          ) {
            console.log("Te he escuchado");
          
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMTM1OTk4NiwiZXhwIjoxNzExOTY0Nzg2LCJpYXQiOjE3MTEzNTk5ODZ9.7DL7B5eudtcZANhgXVexHDOqE4yzj1ijozpbkVXfyqc";
          
            // Configurar los encabezados de la solicitud
            const headers = {
              "Authorization": `Bearer ${token}`
            };
          
            fetch("https://207.180.229.60:9443/v1/api/CAJAS/7063", {
              method: 'GET',
              headers: headers,
            })
            .then((res) => res.json())
            .then((res) => {
                
                detallesVirus()
                
                console.log(res)})
            .catch((error) => console.error(error));
          }
          
          
      };

      recognition.onerror = function (event) {
        console.error("Error de reconocimiento de voz:", event.error);
      };

      // Función para visualizar el audio en tiempo real
      function visualize() {
        // Obtener datos de frecuencia
        analyser.getByteTimeDomainData(dataArray);

        requestAnimationFrame(visualize);
      }
      // Iniciar la visualización
      visualize();

      recognition.start();
    })
    .catch(function (err) {
      console.error("Error al obtener el flujo de audio:", err);
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------

var canvas = document.getElementById("gradient");
var ctx = canvas.getContext("2d");

// DEGRADADO
canvas.width = 256;
canvas.height = 256;

var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "green");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

//CLIC Y ANIMACIONES

function detallesVirus(){AFRAME.registerComponent("details-listener", {
  init: function () {
    var el = this.el;
    el.addEventListener("click", function (evt) {
      console.log("Clic detectado en Ver Detalles.");
      var newCircle = document.createElement("a-circle");
      newCircle.setAttribute("radius", "0.25");
      newCircle.setAttribute("color", "white");
      newCircle.setAttribute("position", "0 -1 0");
      newCircle.setAttribute("rotation", "0 45 0");
      newCircle.setAttribute(
        "animation",
        "property: rotation; to: 0 360 0; dur: 1000; easing: linear"
      );
      newCircle.setAttribute("material", "shader: flat; src: #gradient");

      var newText = document.createElement("a-text");
      newText.setAttribute("value", "Detalles");
      newText.setAttribute("align", "center");
      newText.setAttribute("position", "0 0 0.05");
      newText.setAttribute("color", "black");
      newText.setAttribute("scale", "0.3 0.3 0.3");
      newCircle.appendChild(newText);

      var radius = 0.35;
      var numSpheres = 8;
      var angleIncrement = (2 * Math.PI) / numSpheres;
      for (var i = 0; i < numSpheres; i++) {
        var angle = i * angleIncrement;
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);

        var sphere = document.createElement("a-sphere");
        sphere.setAttribute("radius", "0.05");
        sphere.setAttribute("color", "green");
        sphere.setAttribute("position", x + " " + y + " 0");
        sphere.setAttribute(
          "animation",
          "property: rotation; to: 0 360 0; dur: 2000; easing: linear; loop: true"
        ); // Animación de rotación constante
        newCircle.appendChild(sphere);
      }

      el.parentNode.appendChild(newCircle);
    });
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var detailsBox = document.querySelector("#details-box");
  if (detailsBox) {
    detailsBox.setAttribute("details-listener", "");
  }
})
}

voz()

