document.addEventListener('DOMContentLoaded', function () {
    // Lista de álbumes con las imágenes
    const albums = [
        {
            title: 'Samain 2024',
            folderPath: '../media/2024/',
            images: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg', 'foto11.jpg',
                'foto12.jpg', 'foto13.jpg', 'foto14.jpg', 'foto15.jpg', 'foto16.jpg', 'foto17.jpg', 'foto18.jpg', 'foto19.jpg'
            ]

        },
        {
            title: 'Samain 2022',
            folderPath: '../media/Samain2022/', // Ruta donde se encuentran las fotos
            images: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg', 'foto11.jpg', 'foto12.jpg', 'foto13.jpg',
                'foto14.jpg', 'foto15.jpg', 'foto16.jpg', 'foto17.jpg'
            ]
        },

        {
            title: 'Samain 2018',
            folderPath: '../media/Samain2018/',
            images: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg', 'foto11.jpg', 'foto12.jpg', 'foto13.jpg',
                'foto14.jpg', 'foto15.jpg', 'foto16.jpg', 'foto17.jpg'
            ]
        },
        {
            title: 'Samain 2017',
            folderPath: '../media/Samain2017/',
            images: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg', 'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9jpg', 'foto10.jpg', 'foto11.jpg', 'foto12.jpg']
        },
    ];

    // Contenedor donde se agregarán las cards
    const albumContainer = document.getElementById('album-container');

    // Generar las cards para cada álbum
    albums.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('col-md-4', 'mb-4');

        albumCard.innerHTML = `
            <div class="card" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#carouselModal" data-album-index="${index}">
                <img src="${album.folderPath + album.images[0]}" class="card-img-top" alt="Imagen del album ${album.title}">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">Haz clic para ver las fotos de ${album.title}</p>
                </div>
            </div>
        `;

        // Añadir la card al contenedor
        albumContainer.appendChild(albumCard);
    });

    // Manejar el clic en una card para abrir el carrusel
    albumContainer.addEventListener('click', function (event) {
        const albumIndex = event.target.closest('.card')?.dataset.albumIndex;
        if (albumIndex !== undefined) {
            openCarousel(Number(albumIndex));
        }
    });

    // Función para abrir el carrusel
    function openCarousel(albumIndex) {
        const album = albums[albumIndex];
        const modalBody = document.getElementById('carousel-modal-body');
        modalBody.innerHTML = ''; // Limpiar el contenido anterior del carrusel

        // Comprobar si las imágenes existen en el álbum
        if (album.images && album.images.length > 0) {
            album.images.forEach((image, index) => {
                const imgElement = document.createElement('div');
                imgElement.classList.add('carousel-item');

                // Si es la primera imagen, se le agrega la clase 'active'
                if (index === 0) {
                    imgElement.classList.add('active');
                }

                imgElement.innerHTML = `
                    <img src="${album.folderPath + image}" class="d-block w-100" alt="Imagen ${index + 1}">
                `;
                modalBody.appendChild(imgElement);
            });

            // Reiniciar el carrusel al abrir el modal
            const carousel = new bootstrap.Carousel(document.getElementById('carouselExampleControls'));
            carousel.refresh();
        } else {
            console.error('No se encontraron imágenes en el álbum.');
        }
    }
    
});
