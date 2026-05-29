document.getElementById("footer-copyright").textContent = "© " + new Date().getFullYear() + " CineMatch. Built for Mathias Videla";

// Sección de búsqueda de películas
const stepContainer = document.querySelector('#step-container');
const btnBack = document.querySelector('#btn-back');
const btnNext = document.querySelector('#btn-next');
const step = document.querySelector('#badge-step');

let currentStep = 1;

let respuestas = {
    genres: [],
    yearFrom: 2000,
    yearTo: 2026,
    duration: "Normal",
    recommendation: "Popular"
};

// Inicializar
if (stepContainer) {
    if (btnBack) {
        btnBack.addEventListener('click', backStep);
    }
    if (btnNext) {
        btnNext.addEventListener('click', nextStep);
    }

    // Cargar el paso inicial
    renderStep();
}

function nextStep() {
    if (currentStep < 4) {
        currentStep++;
        renderStep();
    } else if (currentStep === 4) {
        currentStep++;
        renderStep();
    }
}

function backStep() {
    if (currentStep > 1) {
        currentStep--;
        renderStep();
    }
}

// Mapear prevStep a backStep para dar soporte a los onclick en los templates inline
window.prevStep = function () {
    backStep();
};

function renderStep() {
    // Habilitar/deshabilitar los botones de navegación segun el paso
    if (btnBack) {
        if (currentStep === 1 || currentStep === 5) {
            btnBack.style.display = 'none';
        } else {
            btnBack.style.display = 'inline-flex';
        }
    }

    if (btnNext) {
        if (currentStep === 5) {
            btnNext.style.display = 'none';
        } else if (currentStep === 4) {
            btnNext.textContent = 'Ver resultados →';
            btnNext.style.display = 'inline-flex';
        } else {
            btnNext.textContent = 'Siguiente →';
            btnNext.style.display = 'inline-flex';
        }
    }

    if (currentStep === 1) {
        renderGenresStep();
    } else if (currentStep === 2) {
        renderYearsStep();
    } else if (currentStep === 3) {
        renderDurationStep();
    } else if (currentStep === 4) {
        renderRecommendationStep();
    } else if (currentStep === 5) {
        renderSummaryStep();
    }

    setupStepListeners();
}

// Paso 1 - Géneros
function renderGenresStep() {
    stepContainer.innerHTML = `
    <div class="step-header">
      <span class="step-badge">Paso 1 de 4</span>
      <div class="progress">
        <div class="progress-fill" style="width: 25%"></div>
      </div>
    </div>

    <h2>¿Qué géneros te interesan?</h2>
    <p class="step-subtitle">Elegí hasta 3 géneros.</p>

    <div class="options-grid">
      <button class="option-card">Acción</button>
      <button class="option-card">Comedia</button>
      <button class="option-card">Terror</button>
      <button class="option-card">Drama</button>
      <button class="option-card">Ciencia ficción</button>
      <button class="option-card">Romance</button>
      <button class="option-card">Suspenso</button>
      <button class="option-card">Animación</button>
    </div>

    <div class="actions">
      <button class="primary-button" onclick="nextStep()">Continuar</button>
    </div>
  `;
}

// Paso 2 - Años
function renderYearsStep() {
    stepContainer.innerHTML = `
    <div class="step-header">
      <span class="step-badge">Paso 2 de 4</span>
      <div class="progress">
        <div class="progress-fill" style="width: 50%"></div>
      </div>
    </div>

    <h2>¿De qué años querés buscar?</h2>
    <p class="step-subtitle">Mové el rango desde / hasta.</p>

    <div class="year-values">
      <span>Desde <strong id="val-from">2000</strong></span>
      <span>Hasta <strong id="val-to">2026</strong></span>
    </div>

    <div class="slider-box">
      <label>
        Año desde
        <input type="range" id="input-from" min="1980" max="2026" value="2000" />
      </label>

      <label>
        Año hasta
        <input type="range" id="input-to" min="1980" max="2026" value="2026" />
      </label>
    </div>

    <div class="actions">
      <button class="secondary-button" onclick="prevStep()">Volver</button>
      <button class="primary-button" onclick="nextStep()">Continuar</button>
    </div>
  `;
}

// Paso 3 - Duración
function renderDurationStep() {
    stepContainer.innerHTML = `
    <div class="step-header">
      <span class="step-badge">Paso 3 de 4</span>
      <div class="progress">
        <div class="progress-fill" style="width: 75%"></div>
      </div>
    </div>

    <h2>¿Qué duración preferís?</h2>
    <p class="step-subtitle">Elegí una opción para ajustar mejor la recomendación.</p>

    <div class="options-grid">
      <button class="option-card">Corta<br><small>Menos de 90 min</small></button>
      <button class="option-card">Normal<br><small>90 a 140 min</small></button>
      <button class="option-card">Larga<br><small>Más de 140 min</small></button>
      <button class="option-card">Me da igual</button>
    </div>

    <div class="actions">
      <button class="secondary-button" onclick="prevStep()">Volver</button>
      <button class="primary-button" onclick="nextStep()">Continuar</button>
    </div>
  `;
}

// Paso 4 - Recomendaciones
function renderRecommendationStep() {
    stepContainer.innerHTML = `
    <div class="step-header">
      <span class="step-badge">Paso 4 de 4</span>
      <div class="progress">
        <div class="progress-fill" style="width: 100%"></div>
      </div>
    </div>

    <h2>¿Qué tipo de recomendación querés?</h2>
    <p class="step-subtitle">Elegí cómo querés ordenar los resultados.</p>

    <div class="options-grid">
      <button class="option-card">Popular</button>
      <button class="option-card">Mejor valorada</button>
      <button class="option-card">Reciente</button>
      <button class="option-card">Joyita oculta</button>
    </div>

    <div class="actions">
      <button class="secondary-button" onclick="prevStep()">Volver</button>
      <button class="primary-button" onclick="nextStep()">Ver resultados</button>
    </div>
  `;
}

// Base de datos de películas simulada para el mockup
const peliculasMock = [
    {
        titulo: "Interestelar",
        anio: 2014,
        duracion: "169 min",
        rating: 8.6,
        sinopsis: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.",
        generos: ["Acción", "Ciencia ficción", "Drama"],
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60"
    },
    {
        titulo: "Mad Max: Furia en el Camino",
        anio: 2015,
        duracion: "120 min",
        rating: 8.1,
        sinopsis: "En un futuro post-apocalíptico, una mujer se rebela contra un líder tiránico en busca de su patria con la ayuda de un grupo de prisioneras y un vagabundo llamado Max.",
        generos: ["Acción", "Aventura", "Ciencia ficción"],
        poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60"
    },
    {
        titulo: "El Origen (Inception)",
        anio: 2010,
        duracion: "148 min",
        rating: 8.8,
        sinopsis: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un director general.",
        generos: ["Acción", "Ciencia ficción", "Suspenso"],
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60"
    }
];

//fetch pelicula TMDB

// spinner de cargando
function renderLoading() {
    stepContainer.innerHTML = `
    <div class="loading-card">
      <h2>Buscando recomendaciones...</h2>
      <p>Estamos cruzando tus gustos con la base de películas.</p>
    </div>
  `;
}

// seccion de error
function renderError() {
    stepContainer.innerHTML = `
    <div class="error-card">
      <h2>Ups, algo salió mal</h2>
      <p>No pudimos cargar las películas. Probá de nuevo.</p>
      <button class="btn btn-next" onclick="loadMovies()">Reintentar</button>
      <button class="btn btn-back" onclick="restartSteps()">Volver al inicio</button>
    </div>
  `;
}

let indicePeliculaActual = 0;

// Paso 5 - renderizar peliculas (Mockup)
function renderSummaryStep() {
    const pelicula = peliculasMock[indicePeliculaActual];

    stepContainer.innerHTML = `
    <div class="step-header">
      <span class="step-badge">¡Tu CineMatch Perfecto! 🍿</span>
      <div class="progress">
        <div class="progress-fill" style="width: 100%; background-color: #61A90E;"></div>
      </div>
    </div>

    <h2>Recomendación para vos</h2>
    <p class="step-subtitle">Según tus gustos, te sugerimos ver esta obra de arte:</p>

    <article class="movie-match-card">
      <div class="movie-poster-box">
        <img src="${pelicula.poster}" alt="${pelicula.titulo}" class="movie-poster-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="movie-poster-fallback" style="display: none; background-color: var(--primary-blue);">🎬</div>
      </div>
      
      <div class="movie-details-box">
        <div class="movie-genres-badges">
          ${pelicula.generos.map(g => `<span class="genre-badge">${g}</span>`).join('')}
        </div>
        
        <h3 class="movie-title">${pelicula.titulo}</h3>
        
        <div class="movie-meta-info">
          <span>📅 ${pelicula.anio}</span>
          <span>⏳ ${pelicula.duracion}</span>
          <span class="rating-badge">⭐ ${pelicula.rating}</span>
        </div>
        
        <p class="movie-overview">${pelicula.sinopsis}</p>
      </div>
    </article>

    <div class="actions" style="margin-top: 1.5rem;">
      <button class="primary-button" onclick="mostrarSiguientePelicula()">
        <span>Buscar otra película</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      </button>
      <button class="secondary-button" onclick="restartSteps()">
        <span>Volver a buscar</span>
      </button>
    </div>
  `;
}

// Función para pasar a la siguiente película de la base de datos simulada
window.mostrarSiguientePelicula = function () {
    indicePeliculaActual = (indicePeliculaActual + 1) % peliculasMock.length;
    console.log("Cambiando a la película index " + indicePeliculaActual + ": " + peliculasMock[indicePeliculaActual].titulo);
    renderSummaryStep();
};

// restablecer las preguntas por default
function restartSteps() {
    currentStep = 1;
    indicePeliculaActual = 0;
    respuestas = {
        genres: [],
        yearFrom: 2000,
        yearTo: 2026,
        duration: "Normal",
        recommendation: "Popular"
    };
    renderStep();
}

function setupStepListeners() {
    // Actualizar la insignia de paso externa
    if (step) {
        if (currentStep <= 4) {
            step.textContent = `Paso ${currentStep} de 4`;
            step.style.display = 'inline-block';
        } else {
            step.style.display = 'none';
        }
    }

    if (currentStep === 1) {
        const optionCards = stepContainer.querySelectorAll('.option-card');

        optionCards.forEach(card => {
            const genre = card.textContent.trim();
            // Destacar géneros previamente seleccionados
            if (respuestas.genres.includes(genre)) {
                card.classList.add('selected');
            }

            card.addEventListener('click', () => {
                if (card.classList.contains('selected')) {
                    card.classList.remove('selected');
                    respuestas.genres = respuestas.genres.filter(g => g !== genre);
                } else {
                    if (respuestas.genres.length < 3) {
                        card.classList.add('selected');
                        respuestas.genres.push(genre);
                    } else {
                        // advertencia de mas de 3 generos
                        card.classList.add('warning-shake');
                        setTimeout(() => card.classList.remove('warning-shake'), 500);
                    }
                }
                console.log("Respuestas actualizadas (Paso 1):", respuestas);
            });
        });
    }

    if (currentStep === 2) {
        const sliderFrom = stepContainer.querySelector('#input-from');
        const sliderTo = stepContainer.querySelector('#input-to');
        const valFrom = stepContainer.querySelector('#val-from');
        const valTo = stepContainer.querySelector('#val-to');

        if (sliderFrom && sliderTo) {
            // Inicializar con los valores guardados
            sliderFrom.value = respuestas.yearFrom;
            sliderTo.value = respuestas.yearTo;
            if (valFrom) valFrom.textContent = respuestas.yearFrom;
            if (valTo) valTo.textContent = respuestas.yearTo;

            sliderFrom.addEventListener('input', () => {
                let fromVal = parseInt(sliderFrom.value);
                let toVal = parseInt(sliderTo.value);
                if (fromVal > toVal) {
                    sliderFrom.value = toVal;
                    fromVal = toVal;
                }
                respuestas.yearFrom = fromVal;
                if (valFrom) valFrom.textContent = fromVal;
                console.log("Respuestas actualizadas (Paso 2):", respuestas);
            });

            sliderTo.addEventListener('input', () => {
                let fromVal = parseInt(sliderFrom.value);
                let toVal = parseInt(sliderTo.value);
                if (toVal < fromVal) {
                    sliderTo.value = fromVal;
                    toVal = fromVal;
                }
                respuestas.yearTo = toVal;
                if (valTo) valTo.textContent = toVal;
                console.log("Respuestas actualizadas (Paso 2):", respuestas);
            });
        }
    }

    if (currentStep === 3) {
        const optionCards = stepContainer.querySelectorAll('.option-card');

        optionCards.forEach(card => {
            const textVal = card.childNodes[0].textContent.trim();
            // Destacar la opción seleccionada previamente
            if (respuestas.duration === textVal) {
                card.classList.add('selected');
            }

            card.addEventListener('click', () => {
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                respuestas.duration = textVal;
                console.log("Respuestas actualizadas (Paso 3):", respuestas);
            });
        });
    }

    if (currentStep === 4) {
        const optionCards = stepContainer.querySelectorAll('.option-card');

        optionCards.forEach(card => {
            const textVal = card.textContent.trim();
            // Destacar la opción seleccionada previamente
            if (respuestas.recommendation === textVal) {
                card.classList.add('selected');
            }

            card.addEventListener('click', () => {
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                respuestas.recommendation = textVal;
                console.log("Respuestas actualizadas (Paso 4):", respuestas);
            });
        });
    }
}

