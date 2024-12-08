/**Creamos la función para el recuadro de aceptar las Cookies. Este recuadro aparecerá la primera vez que carguemos la página. */

document.addEventListener("DOMContentLoaded", function () {
    //Comprobamos si se aceptaron las cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        //Muestra el aviso de las cookies.
        document.getElementById("cookieConsent").style.display = "block";
    }

    //Función para aceptar las Cookies
    document.getElementById("acceptCookies").addEventListener("click", function () {
        localStorage.setItem("cookieAccepted", "true");
        document.getElementById("cookieConsent").style.display = "none";
    });

    //Función para rechazar las cookies

    document.getElementById("declineCookies").addEventListener("click", function () {
        alert("No se aceptaron las cookies. Algunas funciones pueden no estar disponibles.");
        document.getElementById("cookieConsent").style.display = "none";
    });
});