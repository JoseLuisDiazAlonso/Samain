function initMap() {
    //Coordenadas de la ubicación deseada.

    const location = { lat: 41.814054, lng: -2.44637 };

    //Crear el mapa

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15, //Nivel de Zoom
        center: location, //centramos la ubicación
    });

    //Añadir un marcador en la ubicación

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "C/Garrejo, 17 Bajo, Garray"
    });
}