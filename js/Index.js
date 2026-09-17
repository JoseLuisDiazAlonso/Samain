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