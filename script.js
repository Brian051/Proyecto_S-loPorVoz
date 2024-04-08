AFRAME.registerComponent('details-listener', {
    init: function () {
        var el = this.el;
        console.log("init");

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "es-ES";
        recognition.onstart = function () {
            console.log("El reconocimiento de voz ha comenzado");
        };
        recognition.onend = function () {
            console.log("El reconocimiento de voz ha terminado. Reiniciando...");
            recognition.start();
       };
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log("Texto reconocido:", transcript);

            const arText = document.querySelector("#ar-transcript");
            arText.setAttribute('value', `Audio reconocido:\n${transcript}`);
            const arText1 = document.querySelector("#ar-transcript1");
            arText1.setAttribute('value', `Audio reconocido:\n${transcript}`);

            const textoNormalizado = transcript.replace(/[^\w\s]/gi, "");
            if (textoNormalizado.includes("detalles caja")) {
                console.log("Te he escuchado");

                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMjA1ODI5NSwiZXhwIjoxNzEyNjYzMDk1LCJpYXQiOjE3MTIwNTgyOTV9.wXM7RKCGWUR2hbAvZygQf4CV_CyA5H52eP4g-dNbyGo";
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                fetch("https://207.180.229.60:9443/v1/api/CAJAS/7063", {
                    method: "GET",
                    headers: headers,
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        visualizacion(res);
                    })
                    .catch((error) => console.error(error));

            } else if (textoNormalizado.includes("detalles muestra")) {
                console.log("Te he escuchado");

                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMjA1ODI5NSwiZXhwIjoxNzEyNjYzMDk1LCJpYXQiOjE3MTIwNTgyOTV9.wXM7RKCGWUR2hbAvZygQf4CV_CyA5H52eP4g-dNbyGo";
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                fetch("https://207.180.229.60:9443/v1/api/INCIDENCIAS_MUESTRAS/7063", {
                    method: "GET",
                    headers: headers,
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        visualizacionMues('adn-marker', res);

                        if (res.document.INCMUESTRA_INCID_ID) {
                            fetch(`https://207.180.229.60:9443/v1/api/INCIDENCIAS/${res.document.INCMUESTRA_INCID_ID}`, {
                                method: "GET",
                                headers: headers,
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    console.log(res);

                                    visualizacionInc('adn-marker', res);
                                })
                                .catch((error) => console.error(error));
                        }
                    })
                    .catch((error) => console.error(error));

            } else if (textoNormalizado.includes("ocultar")) {

                var plane1ToRemove = document.getElementById('plane1');
                var plane2ToRemove = document.getElementById('plane2')
                var plane3ToRemove = document.getElementById('plane3')
                var newPlaneToRemove = document.getElementById('new-plane')
                var plane4ToRemove = document.getElementById('plane4');
                var plane5ToRemove = document.getElementById('plane5')
                var plane6ToRemove = document.getElementById('plane6')

                if (plane1ToRemove) {
                    plane1ToRemove.parentNode.removeChild(plane1ToRemove);
                    plane2ToRemove.parentNode.removeChild(plane2ToRemove);
                    plane3ToRemove.parentNode.removeChild(plane3ToRemove);

                } else if (plane4ToRemove) {
                    plane4ToRemove.parentNode.removeChild(plane4ToRemove);
                    plane5ToRemove.parentNode.removeChild(plane5ToRemove);
                    plane6ToRemove.parentNode.removeChild(plane6ToRemove);
                    newPlaneToRemove.parentNode.removeChild(newPlaneToRemove);
                }
            }
        };
        recognition.onerror = function (event) {
            console.error("Error de reconocimiento de voz:", event.error);
        };
        recognition.start()

        function visualizacion(objeto) {
            var plane1 = document.createElement('a-plane');
            plane1.setAttribute('id', 'plane1');
            plane1.setAttribute('position', '0 0 0.2');
            plane1.setAttribute('rotation', '0 0 0');
            plane1.setAttribute('width', '1');
            plane1.setAttribute('height', '0.2');
            plane1.setAttribute('color', 'gray');
            plane1.setAttribute('animation', 'property: position; to: 0 -0.9 0.5; dur: 1000; easing: easeOutCubic');

            var text1 = document.createElement('a-text');
            text1.setAttribute('value', `Caja ID: ${objeto.document.CAJA_ID}`);
            text1.setAttribute('align', 'center');
            text1.setAttribute('position', '0 0 0.05');
            text1.setAttribute('color', 'white');
            text1.setAttribute('scale', '0.3 0.3 0.3');
            plane1.appendChild(text1);

            var plane2 = document.createElement('a-plane');
            plane2.setAttribute('id', 'plane2');
            plane2.setAttribute('position', '0 0 0.2');
            plane2.setAttribute('rotation', '0 0 0');
            plane2.setAttribute('width', '1');
            plane2.setAttribute('height', '0.2');
            plane2.setAttribute('color', 'gray');
            plane2.setAttribute('animation', 'property: position; to: 0 -1.2 0.5; dur: 1000; easing: easeOutCubic');


            var text2 = document.createElement('a-text');
            text2.setAttribute('value', `${objeto.document.FINCAJAL_DESC}`);
            text2.setAttribute('align', 'center');
            text2.setAttribute('position', '0 0 0.05');
            text2.setAttribute('color', 'white');
            text2.setAttribute('scale', '0.3 0.3 0.3');
            plane2.appendChild(text2);

            var plane3 = document.createElement('a-plane');
            plane3.setAttribute('id', 'plane3');
            plane3.setAttribute('position', '0 0 0.2');
            plane3.setAttribute('rotation', '0 0 0');
            plane3.setAttribute('width', '1');
            plane3.setAttribute('height', '0.2');
            plane3.setAttribute('color', 'gray');
            plane3.setAttribute('animation', 'property: position; to: 0 -1.5 0.5; dur: 1000; easing: easeOutCubic');

            var text3 = document.createElement('a-text');
            text3.setAttribute('value', `Nombre: ${objeto.document.PROC_NOMBRE}`);
            text3.setAttribute('align', 'center');
            text3.setAttribute('position', '0 0 0.05');
            text3.setAttribute('color', 'white');
            text3.setAttribute('scale', '0.3 0.3 0.3');
            plane3.appendChild(text3);

            el.parentNode.appendChild(plane1);
            el.parentNode.appendChild(plane2);
            el.parentNode.appendChild(plane3);
        }

        function visualizacionMues(markerId, objeto) {
            const marker = document.getElementById(markerId);
            if (!marker) return;
            var plane1 = document.createElement('a-plane');
            plane1.setAttribute('id', 'plane4');
            plane1.setAttribute('position', '0 0 0.2');
            plane1.setAttribute('rotation', '-90 0 0');
            plane1.setAttribute('width', '1');
            plane1.setAttribute('height', '0.2');
            plane1.setAttribute('color', 'gray');
            plane1.setAttribute('animation', 'property: position; to: 0 0.5 0.9; dur: 1000; easing: easeOutCubic');


            var text1 = document.createElement('a-text');
            text1.setAttribute('value', `ID: ${objeto.document.INCMUESTRA_ID}`);
            text1.setAttribute('align', 'center');
            text1.setAttribute('position', '0 0 0.05');
            text1.setAttribute('color', 'white');
            text1.setAttribute('scale', '0.3 0.3 0.3');
            plane1.appendChild(text1);

            var plane2 = document.createElement('a-plane');
            plane2.setAttribute('id', 'plane5');
            plane2.setAttribute('position', '0 0 0.2');
            plane2.setAttribute('rotation', '-90 0 0');
            plane2.setAttribute('width', '1');
            plane2.setAttribute('height', '0.2');
            plane2.setAttribute('color', 'gray');
            plane2.setAttribute('animation', 'property: position; to: 0 0.5 1.2; dur: 1000; easing: easeOutCubic');


            var text2 = document.createElement('a-text');
            text2.setAttribute('value', `Muestra ID: ${objeto.document.INCMUESTRA_MUESTRA_ID}`);
            text2.setAttribute('align', 'center');
            text2.setAttribute('position', '0 0 0.05');
            text2.setAttribute('color', 'white');
            text2.setAttribute('scale', '0.3 0.3 0.3');
            plane2.appendChild(text2);

            var plane3 = document.createElement('a-plane');
            plane3.setAttribute('id', 'plane6');
            plane3.setAttribute('position', '0 0 0.2');
            plane3.setAttribute('rotation', '-90 0 0');
            plane3.setAttribute('width', '1');
            plane3.setAttribute('height', '0.2');
            plane3.setAttribute('color', 'red');
            plane3.setAttribute('animation', 'property: position; to: 0 0.5 1.5; dur: 1000; easing: easeOutCubic');

            var text3 = document.createElement('a-text');
            text3.setAttribute('value', `Incidencia ID: ${objeto.document.INCMUESTRA_INCID_ID}`);
            text3.setAttribute('align', 'center');
            text3.setAttribute('position', '0 0 0.05');
            text3.setAttribute('color', 'white');
            text3.setAttribute('scale', '0.3 0.3 0.3');
            plane3.appendChild(text3);

            marker.appendChild(plane1);
            marker.appendChild(plane2);
            marker.appendChild(plane3);
        }

        function visualizacionInc(markerId, objeto) {
            const marker = document.getElementById(markerId);
            if (!marker) return;
            var newPlane = document.createElement('a-plane');
            newPlane.setAttribute('id', 'new-plane');
            newPlane.setAttribute('width', '1.2');
            newPlane.setAttribute('height', '0.4');
            newPlane.setAttribute('color', 'red');
            newPlane.setAttribute('position', '0 0.5 1.9');
            newPlane.setAttribute('rotation', '-90 0 0');
            newPlane.setAttribute('animation', 'property: rotation; to:  270 0 0; dur: 1000; easing: linear');

            var newText = document.createElement('a-text');
            newText.setAttribute('value', `Codigo:${objeto.document.INCID_CODIGO}\nNombre:\n${objeto.document.TINCID_NOMBRE}\nDescripcion:\n${objeto.document.INCID_DESC}`);
            newText.setAttribute('align', 'center');
            newText.setAttribute('position', '0 0 0.05');
            newText.setAttribute('color', 'white');
            newText.setAttribute('scale', '0.3 0.3 0.3');
            newPlane.appendChild(newText);

            marker.appendChild(newPlane);
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    var detailsBox = document.querySelector('#details-box');
    if (detailsBox) {
        console.log("existe")
        detailsBox.setAttribute('details-listener', '');
    }
});

    
