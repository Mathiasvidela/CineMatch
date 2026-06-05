document.getElementById("footer-copyright").textContent = "© " + new Date().getFullYear() + " CineMatch. Built for Mathias Videla";

// Sección de búsqueda de películas
const stepContainer = document.querySelector('#step-container');
const btnBack = document.querySelector('#btn-back');
const btnNext = document.querySelector('#btn-next');
const step = document.querySelector('#badge-step');

let currentStep = 1;
//objeto donde se guardan las respuestas del usuario
let respuestas = {
  genres: [],
  yearFrom: 2000,
  yearTo: 2026,
  duration: "Normal",
  recommendation: "Popular"
};

//estandarizacion para la Api

const genreMap = {
  "Acción": 28,
  "Comedia": 35,
  "Terror": 27,
  "Drama": 18,
  "Ciencia ficción": 878,
  "Romance": 10749,
  "Suspenso": 53,
  "Animación": 16
};

const durationMap = {
  "Corta": "short",
  "Normal": "normal",
  "Larga": "long",
  "Me da igual": ""
};

const recommendationMap = {
  "Popular": "popular",
  "Mejor valorada": "top_rated",
  "Reciente": "recent",
  "Joyita oculta": "hidden_gems"
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
    return;
  }

  if (currentStep === 4) {
    loadMovies();
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
  // Habilitar o deshabilitar los botones de navegación segun el paso
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


//fetch peliculas api TMDB
async function fetchMovies() {
  const params = new URLSearchParams();

  //generos
  const genreIds = respuestas.genres
    .map(genreName => genreMap[genreName])
    .filter(Boolean);

  if (genreIds.length > 0) {
    params.append("genres", genreIds.join("|"));
  }
  //año desde y hasta
  params.append("yearFrom", respuestas.yearFrom);
  params.append("yearTo", respuestas.yearTo);

  //duración
  const durationValue = durationMap[respuestas.duration];
  if (durationValue) {
    params.append("duration", durationValue);
  }

  //recomendadas
  const recommendationValue = recommendationMap[respuestas.recommendation] || "popular";
  params.append("sortBy", recommendationValue);

  const response = await fetch(`http://localhost:8080/api/movies?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Error al buscar películas");
  }

  const data = await response.json();

  return data.results;

}

//funcion cargar peliculas
async function loadMovies() {
  try {
    currentStep = 5;
    renderLoading();

    const movies = await fetchMovies();

    renderMovies(movies);
  } catch (error) {
    console.error(error);
    renderError();
  }
}

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
function renderMovies(movies) {
  if (!movies || movies.length === 0) {
    stepContainer.innerHTML = `
      <div class="error-card">
        <h2>No encontramos películas</h2>
        <p>Probá cambiar los filtros de búsqueda.</p>
        <button class="secondary-button" onclick="restartSteps()">Volver a buscar</button>
      </div>
    `;
    return;
  }

  stepContainer.innerHTML = `
    <div class="step-header">
      <span class="step-badge">¡Tu CineMatch Perfecto!</span>
      <div class="progress">
        <div class="progress-fill" style="width: 100%; background-color: #61A90E;"></div>
      </div>
    </div>

    <h2>Recomendaciones para vos</h2>
    <p class="step-subtitle">
      Encontramos ${movies.length} películas según tus gustos.
    </p>

    <div class="movies-grid">
      ${movies.map(movie => {
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    const year = movie.release_date
      ? movie.release_date.slice(0, 4)
      : "Sin año";

    const rating = movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "N/A";

    return `
          <article class="movie-match-card">
            <div class="movie-poster-box">
              ${posterUrl
        ? `<img src="${posterUrl}" alt="${movie.title}" class="movie-poster-img" />`
        : `<div class="movie-poster-fallback">🎬</div>`
      }
            </div>

            <div class="movie-details-box">
              <h3 class="movie-title">${movie.title}</h3>

              <div class="movie-meta-info">
                <span>${year}</span>
                <span class="rating-badge">${rating}</span>
              </div>

              <p class="movie-overview">
                ${movie.overview || "Sin descripción disponible."}
              </p>
            </div>
          </article>
        `;
  }).join("")}
    </div>

    <div class="actions" style="margin-top: 1.5rem;">
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

