// Inicia la cámara al hacer clic en el botón
document.querySelector('button').addEventListener('click', function () {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: { ideal: 'environment' } // Más explícito con "ideal"
    }
  })
  .then(stream => {
    const video = document.querySelector('video');
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = function () {
        video.play();
      };
      document.documentElement.classList.add('streaming');
    } else {
      console.error('No se encontró el elemento <video>.');
    }
  })
  .catch(err => {
    console.error('Error al acceder a la cámara:', err);
  });
});

// Previene el scroll o interacción al tocar el <aside>
document.querySelector('aside')?.addEventListener('touchstart', e => {
  e.preventDefault();
}, { passive: false }); // Se especifica "passive: false" para que "preventDefault" funcione correctamente

// Cambia el valor de la variable CSS --hue al seleccionar una opción
const options = Array.from(document.querySelectorAll('input[type=radio]'));

options.forEach(option => {
  option.addEventListener('click', e => {
    const hue = e.currentTarget.getAttribute('data-hue');
    if (hue) {
      document.documentElement.style.setProperty('--hue', hue);
    }
  });
});
