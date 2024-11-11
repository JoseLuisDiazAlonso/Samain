//Creamos una función para abrir el lightbox

function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    //Llamamos a cada una del src de las diferentes imágenes

    lightboxImage.src = imgElement.src;

    //Mostramos el contenedor del lightbox

    lightbox.style.display = "flex";
}

//Función para cerrar el lightbox

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}