/**Función para controlar el video con compatibilidad iOS */
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("intro-video");
    const videoContainer = document.getElementById("video-container");

    // Función para ocultar el contenedor del video
    function hideVideoContainer() {
        videoContainer.style.opacity = '0';
        setTimeout(() => {
            videoContainer.style.display = "none";
        }, 500);
    }

    // Detectar si es un dispositivo Apple o si hay problemas con autoplay
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Intentar reproducir el video
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // El video se reproduce correctamente
                console.log("Video reproducido exitosamente");
            })
            .catch(error => {
                // Error al reproducir (común en iOS)
                console.log("Error al reproducir video:", error);
                
                // Si falla el autoplay, ocultar el video después de 1 segundo
                setTimeout(() => {
                    hideVideoContainer();
                }, 1000);
            });
    }

    // Cuando el video termine
    video.addEventListener('ended', () => {
        hideVideoContainer();
    });

    // Fallback: Si después de 3 segundos el video no ha empezado a reproducirse
    setTimeout(() => {
        if (video.paused && video.currentTime === 0) {
            console.log("El video no se reprodujo, ocultando contenedor");
            hideVideoContainer();
        }
    }, 3000);

    // Listener adicional para detectar si el video se cargó correctamente
    video.addEventListener('loadeddata', () => {
        console.log("Video cargado correctamente");
    });

    video.addEventListener('error', (e) => {
        console.error("Error al cargar el video:", e);
        hideVideoContainer();
    });
});

/**Creamos la función para el recuadro de aceptar las Cookies. */
document.addEventListener("DOMContentLoaded", function () {
    //Comprobamos si se aceptaron las cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        //Muestra el aviso de las cookies.
        document.getElementById("cookieConsent").style.display = "block";
    }

    //Función para aceptar las Cookies
    document.getElementById("acceptCookies").addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        document.getElementById("cookieConsent").style.display = "none";
    });

    //Función para rechazar las cookies
    document.getElementById("declineCookies").addEventListener("click", function () {
        alert("No se aceptaron las cookies. Algunas funciones pueden no estar disponibles.");
        document.getElementById("cookieConsent").style.display = "none";
    });
});

/**Función para controlar las cards de los artículos */

// Array de artículos
const updates = [
    {
        image: "../media/saukon.jpg",
        title: "Samain 2025",
        description: "Saukon, el espíritu del bosque.",
        url: "../html/articulo7.html"
    },
    {
        image:"../media/thumbnails/videosRuben.jpg",
        title: "Samain 2025",
        description: "El desfile de antorchas, desde las 20:00 horas.",
        url: "../html/articulo6.html"
    },
    {
        image: "../media/delorgan.jpg",
        title: "Delorgan",
        description: "Atención amantes de Outlander",
        url: "../html/articulo5.html"
    },
    {
        image: "../media/Programas/samain_cartel2025.jpg",
        title: "Samain 2025",
        description: "Samain-Interkeltoi 2025: el origen de la noche de los difuntos",
        url: "../html/articulo1.html"
    },
    {
        image: "../media/chainLeyendo.jpg",
        title: "Samain 2025",
        description: "Samain: La cadena de la historia",
        url: "../html/articulo2.html"
    },
    {
        image: "../media/Programas/cartel2025.jpg",
        title: "Programa 2025",
        description: "Programa completo de Samain 2025",
        url: "../html/articulo3.html"
    },
    {
        image: "../media/JohnStewart.jpg",
        title: "Jhon Stewart-El gaitero Escocés",
        description: "31 Octubre 2025",
        url: "../html/articulo4.html"
    }
];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const newsTrack = document.getElementById('carousel-recorrido');
    const dotsContainer = document.getElementById('carousel-datos');
    const prevBtn = document.getElementById('updatesPrev');
    const nextBtn = document.getElementById('updatesNext');
    
    // Verificar que los elementos existan
    if (!newsTrack || !dotsContainer || !prevBtn || !nextBtn) {
        console.log('No se encontraron los elementos del carousel de noticias');
        return;
    }
    
    let newsCurrentIndex = 0;
    let cardsPerView = 3;

    function updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            cardsPerView = 1;
        } else if (width <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
    }

    function createCard() {
        newsTrack.innerHTML = updates.map((update, index) => 
            `<div class="card" data-url="${update.url}" data-index="${index}">
                <img src="${update.image}" alt="${update.title}" class="card-image" 
                     onerror="console.error('Error cargando imagen:', this.src); this.style.backgroundColor='#ddd';">
                <div class="card-content">
                    <h3 class="card-title">${update.title}</h3>
                    <p class="card-description">${update.description}</p>
                </div>
            </div>`
        ).join('');

        // Añadir evento click a cada card
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function() {
                const url = this.dataset.url;
                window.open(url, '_blank');
            });
        });
    }

    function createDots() {
        const maxIndex = Math.max(0, updates.length - cardsPerView);
        const dotsCount = maxIndex + 1;
        
        dotsContainer.innerHTML = Array.from({length: dotsCount}, (_, i) =>
            `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');
        
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                newsCurrentIndex = parseInt(dot.dataset.index);
                updateNewsCarousel();
            });
        });
    }

    function updateNewsCarousel() {
        const cards = document.querySelectorAll('.card');
        if (cards.length === 0) return;

        const container = document.querySelector('.updates-carousel-container');
        const containerWidth = container.clientWidth;
        const containerPadding = 40; // 20px de padding en cada lado
        const gap = 32;
        
        let offset;
        
        if (cardsPerView === 1) {
            // En móvil: cada card ocupa todo el ancho disponible
            const cardWidth = containerWidth - containerPadding;
            offset = -(newsCurrentIndex * (cardWidth + gap));
        } else {
            // En desktop/tablet: calcular el ancho de cada card según el número visible
            const totalGaps = (cardsPerView - 1) * gap;
            const cardWidth = (containerWidth - containerPadding - totalGaps) / cardsPerView;
            offset = -(newsCurrentIndex * (cardWidth + gap));
        }
        
        newsTrack.style.transform = `translateX(${offset}px)`;

        // Actualizar dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === newsCurrentIndex);
        });

        // Actualizar botones
        const maxIndex = Math.max(0, updates.length - cardsPerView);
        prevBtn.disabled = newsCurrentIndex === 0;
        nextBtn.disabled = newsCurrentIndex >= maxIndex;
    }

    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        if (newsCurrentIndex > 0) {
            newsCurrentIndex--;
            updateNewsCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, updates.length - cardsPerView);
        if (newsCurrentIndex < maxIndex) {
            newsCurrentIndex++;
            updateNewsCarousel();
        }
    });

    // Actualizar en resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const prevCardsPerView = cardsPerView;
            updateCardsPerView();
            
            // Solo resetear si cambia el número de cards visibles
            if (prevCardsPerView !== cardsPerView) {
                newsCurrentIndex = 0;
                createDots();
            }
            
            updateNewsCarousel();
        }, 250);
    });

    // Inicializar
    updateCardsPerView();
    createCard();
    createDots();
    updateNewsCarousel();
});