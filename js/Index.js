function generarPathPiedra({
    ancho=680,
    yBase=150,
    paso=20,
    amplitud=15,
    seed=Date.now()
}) {
    //PRNG simple con seed, para poder repetir el mismo patrón si hace falta.
    let s = seed;
    const random = () => {
        s = (s * 9301 + 49297) % 233280;
        
        return s / 233280
    };

    const puntos = [];

    for (let x = 0; x <= ancho; x += paso) {
        const y = yBase + (random() - 0.5) * amplitud * 2;
        puntos.push(`${x},${y.toFixed(1)}`);
    }
    return puntos.map((p, i) => (i === 0 ? `M${p}` : `L${p}`)).join('');
}

function pintarDivisorPiedra (svgEl, opciones) {
    const zigzag = generarPathPiedra(opciones);
    const ancho = opciones.ancho ?? 680;

    const borde = svgEl.querySelector('#borde-piedra');
    const filo = svgEl.querySelector('#filo-piedra');

    //el filo es solo el trazado irregular
    filo.setAttribute('d', zigzag);

    //el relleno necesita cerrar el path hacia arriba pafra formar una superficie
    borde.setAttribute('d', `${zigzag} L${ancho},0 L0, 0 Z`);
}

//uso:
document.querySelectorAll('.divisor-piedra').forEach((svg, i) => {
    pintarDivisorPiedra(svg, {seed: 1000 + i * 37}); //seed distinto por instancia
});

/**Función para controlar las cards de los artículos */

// Array de artículos
const updates = [
    {
        image: "./media/foto_antorcha.jpg",
        title: "¡Hemos Vuelto!",
        description: "INTERKELTOI-SAMAIN vuelve en 2026",
        url: "./articulo13.html"
    },
    
    {
        image: "./media/articulo12img.jpeg",
        title: "Algo está a punto de despertar",
        description: "INTERKELTOI-SAMAIN vuelve en 2026",
        url: "./articulo12.html"
    },
    {
        image: "./media/arbolSamain.jpg",
        title: "El Bosque de los Héroes",
        description: "El 1 de noviembre, a las 12:00 horas, no te pierdas el acto más emotivo de Interkeltoi",
        url: "./articulo11.html"
    },
    {
        image: "./media/thumbnails/videoMusical.png",
        title: "IRISH TREBLE en concierto",
        description: "No te pierdas a nuestras representantes irlandesas",
        url: "./articulo10.html"

    },
    {
        image: "./media/thumbnails/videoInMyDreams.png",
        title: "TIC TAC!",
        description: "Se acerca el momento",
        url: "./articulo9.html"

    },
    {
        image: "./media/thumbnails/videoDanza.png",
        title: "Danza Samain 2025",
        description: "Sabías que la Danza de Samain se prepara con un mes de Antelación.",
        url: "./articulo8.html"

    },
    {
        image: "./media/saukon.jpg",
        title: "Samain 2025",
        description: "Saukon, el espíritu del bosque.",
        url: "./articulo7.html"
    },
    {
        image:"./media/thumbnails/videosRuben.jpg",
        title: "Samain 2025",
        description: "El desfile de antorchas, desde las 20:00 horas.",
        url: "./articulo6.html"
    },
    {
        image: "./media/delorgan.jpg",
        title: "Delorgan",
        description: "Atención amantes de Outlander",
        url: "./articulo5.html"
    },
    {
        image: "./media/Programas/samain_cartel2025.jpg",
        title: "Samain 2025",
        description: "Samain-Interkeltoi 2025: el origen de la noche de los difuntos",
        url: "./articulo1.html"
    },
    {
        image: "./media/chainLeyendo.jpg",
        title: "Samain 2025",
        description: "Samain: La cadena de la historia",
        url: "./articulo2.html"
    },
    {
        image: "./media/Programas/cartel2025.jpg",
        title: "Programa 2025",
        description: "Programa completo de Samain 2025",
        url: "./articulo3.html"
    },
    {
        image: "./media/JohnStewart.jpg",
        title: "Jhon Stewart-El gaitero Escocés",
        description: "31 Octubre 2025",
        url: "./articulo4.html"
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

//Control de las Cookies
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');

    if (!cookieBanner || !cookieAccept) return

    const COOKIE_KEY = 'samain_cookies_aceptadas';

    //Si el usuario, ya acepto antes no se muestra el banner de las cookies
    const yaAceptado = localStorage.getItem(COOKIE_KEY);

    if (!yaAceptado) {
        //Se genera un pequeño retardo para que la tarnsicción CSS se aprecie al cargar
        setTimeout (() => {
            cookieBanner.classList.add('visible');
        }, 500);
    }

    cookieAccept.addEventListener ('click', () => {
        localStorage.setItem(COOKIE_KEY, 'true');
        cookieBanner.classList.remove('visible');
    });
});