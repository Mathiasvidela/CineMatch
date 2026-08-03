let activeWatchlistFilter = "all";
let watchlistItems = [];

/**
 * 1. Lee y parsea el usuario logueado desde localStorage (key: cinematchUser).
 * @returns {Object|null}
 */
function getLoggedUser() {
  try {
    const userStr = localStorage.getItem("cinematchUser");
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Error al leer el usuario de localStorage:", e);
    return null;
  }
}

/**
 * 2. Devuelve la URL base de la API según el entorno.
 * @returns {string}
 */
function getApiBaseUrl() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return isLocal
    ? "http://localhost:8080"
    : "https://cinematch-0lck.onrender.com";
}

/**
 * 3. Inicializa la página Watchlist en DOMContentLoaded.
 */
function initWatchlistPage() {
  const user = getLoggedUser();

  if (!user || !user.userId) {
    renderAccessRestrictedState();
    return;
  }

  // Mostrar saludo personalizado
  const greetingEl = document.getElementById("watchlist-user-greeting");
  if (greetingEl) {
    greetingEl.textContent = `Hola, ${user.name || "Cinéfilo"}`;
    greetingEl.style.display = "inline-block";
  }

  // Escuchar eventos de clic en las pestañas de filtro con data-filter
  const filterTabs = document.querySelectorAll(".watchlist-tab-btn[data-filter]");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");
      if (filter) {
        setActiveFilter(filter);
      }
    });
  });

  // Cargar elementos desde el backend
  loadWatchlist();
}

/**
 * 4. Carga la watchlist desde el backend.
 */
async function loadWatchlist() {
  const user = getLoggedUser();
  if (!user || !user.userId) {
    renderAccessRestrictedState();
    return;
  }

  renderLoadingState();

  try {
    const response = await fetch(
      `${getApiBaseUrl()}/api/watchlist/user/${user.userId}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo cargar tu Watchlist.`);
    }

    watchlistItems = await response.json();
    console.log("Watchlist cargada:", watchlistItems);
    renderWatchlist();
  } catch (error) {
    console.error("Error al cargar la watchlist:", error);
    renderErrorState(error.message || "No pudimos conectar con el servidor.");
  }
}

/**
 * 5. Controla el renderizado principal de la watchlist y stats según filtros.
 */
function renderWatchlist() {
  renderWatchlistStats();

  if (!watchlistItems || watchlistItems.length === 0) {
    renderEmptyState();
    return;
  }

  const filteredItems = watchlistItems.filter((item) => {
    if (activeWatchlistFilter === "movie") return item.mediaType === "movie";
    if (activeWatchlistFilter === "tv") return item.mediaType === "tv";
    return true; // "all"
  });

  if (filteredItems.length === 0) {
    renderEmptyFilterState();
  } else {
    renderWatchlistItems(filteredItems);
  }
}

/**
 * 6. Calcula y actualiza las estadísticas de la watchlist en el HTML.
 */
function renderWatchlistStats() {
  const totalCountEl =
    document.getElementById("watchlist-total-count") ||
    document.getElementById("stat-total-count");
  const moviesCountEl =
    document.getElementById("watchlist-movie-count") ||
    document.getElementById("stat-movies-count");
  const tvCountEl =
    document.getElementById("watchlist-tv-count") ||
    document.getElementById("stat-tv-count");

  const items = watchlistItems || [];
  const total = items.length;
  const movies = items.filter((item) => item.mediaType === "movie").length;
  const series = items.filter((item) => item.mediaType === "tv").length;

  if (totalCountEl) totalCountEl.textContent = total;
  if (moviesCountEl) moviesCountEl.textContent = movies;
  if (tvCountEl) tvCountEl.textContent = series;
}

/**
 * 7. Renderiza el grid con las cards de películas/series guardadas.
 * @param {Array} items
 */
function renderWatchlistItems(items) {
  const container = document.getElementById("watchlist-content");
  if (!container) return;

  const cardsHtml = items
    .map((item) => {
      const isMovie = item.mediaType === "movie";
      const mediaBadgeText = isMovie ? "Película" : "Serie";
      const mediaBadgeClass = isMovie ? "badge-movie" : "badge-tv";

      const posterUrl = item.posterPath
        ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
        : null;

      const posterMarkup = posterUrl
        ? `<img src="${posterUrl}" alt="${escapeHtml(item.title)}" class="watchlist-card-poster-img" onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'watchlist-card-no-poster\\'><i class=\\'fa-solid fa-film\\'></i><span>Sin poster</span></div>';" />`
        : `<div class="watchlist-card-no-poster"><i class="fa-solid fa-film"></i><span>Sin poster</span></div>`;

      const genresFormatted = item.genres ? item.genres : "Sin género";
      const yearFormatted = item.releaseYear || "N/A";
      const ratingFormatted = item.rating != null ? item.rating : "N/A";

      return `
        <article class="watchlist-card" data-id="${item.id}">
          <div class="watchlist-card-poster">
            ${posterMarkup}
            <span class="watchlist-type-badge ${mediaBadgeClass}">${mediaBadgeText}</span>
          </div>

          <div class="watchlist-card-content">
            <div class="watchlist-card-header">
              <h3 class="watchlist-card-title">${escapeHtml(item.title)}</h3>
              <div class="watchlist-card-meta">
                <span class="watchlist-meta-year"><i class="fa-regular fa-calendar"></i> ${yearFormatted}</span>
                <span class="watchlist-meta-rating"><i class="fa-solid fa-star"></i> ${ratingFormatted}</span>
              </div>
            </div>

            <p class="watchlist-card-genres">${escapeHtml(genresFormatted)}</p>

            <button type="button" data-id="${item.id}" class="watchlist-delete-btn btn-delete-item">
              <i class="fa-solid fa-trash-can"></i> Eliminar
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  container.innerHTML = `<div id="watchlist-grid" class="watchlist-grid">${cardsHtml}</div>`;

  // Listener para los botones de eliminar
  const deleteButtons = container.querySelectorAll(".watchlist-delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      if (itemId) {
        deleteWatchlistItem(Number(itemId));
      }
    });
  });
}

/**
 * 8. Cambia el filtro activo ("all", "movie", "tv") y actualiza la lista.
 * @param {string} filter
 */
function setActiveFilter(filter) {
  activeWatchlistFilter = filter;

  const tabs = document.querySelectorAll(".watchlist-tab-btn[data-filter]");
  tabs.forEach((tab) => {
    const tabFilter = tab.getAttribute("data-filter");
    tab.classList.toggle("active", tabFilter === filter);
  });

  renderWatchlist();
}

/**
 * 9. Elimina un item de la watchlist haciendo DELETE al backend.
 * @param {number} itemId
 */
async function deleteWatchlistItem(itemId) {
  const item = watchlistItems.find((i) => i.id === itemId);
  const title = item ? `"${item.title}"` : "este elemento";

  const confirmed = confirm(`¿Estás seguro de que querés eliminar ${title} de tu Watchlist?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/watchlist/${itemId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo eliminar el elemento.`);
    }

    watchlistItems = watchlistItems.filter((i) => i.id !== itemId);
    renderWatchlist();
  } catch (error) {
    console.error("Error al eliminar item de watchlist:", error);
    alert(error.message || "Ocurrió un error al intentar eliminar.");
  }
}

/**
 * 10. Renderiza la pantalla de acceso restringido cuando no hay usuario logueado.
 */
function renderAccessRestrictedState() {
  const container = document.getElementById("watchlist-content");
  const greetingEl = document.getElementById("watchlist-user-greeting");
  if (greetingEl) greetingEl.style.display = "none";

  if (!container) return;

  container.innerHTML = `
    <div class="watchlist-state-card blocked-state-card">
      <div class="state-icon">🔒</div>
      <h2>Acceso Restringido</h2>
      <p>Para ver y gestionar tu Watchlist personal, tenés que iniciar sesión con tu cuenta de CineMatch.</p>
      <a href="login.html" class="primary-button">
        Iniciar sesión <i class="fa-solid fa-right-to-bracket"></i>
      </a>
    </div>
  `;
}

/**
 * 11. Renderiza el estado de carga mientras se obtienen datos del backend.
 */
function renderLoadingState() {
  const container = document.getElementById("watchlist-content");
  if (!container) return;

  container.innerHTML = `
    <div class="watchlist-state-card loading-state-card">
      <div class="spinner"></div>
      <h2>Cargando tu Watchlist...</h2>
      <p>Buscando tus películas y series guardadas.</p>
    </div>
  `;
}

/**
 * 12. Renderiza el estado vacío cuando el usuario no tiene items guardados.
 */
function renderEmptyState() {
  const container = document.getElementById("watchlist-content");
  if (!container) return;

  container.innerHTML = `
    <div class="watchlist-state-card empty-state-card">
      <div class="state-icon">🍿</div>
      <h2>Todavía no guardaste nada</h2>
      <p>Cuando guardes películas o series, van a aparecer acá.</p>
      <a href="../index.html" class="primary-button btn-home">
        Ir al Home <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  `;
}

/**
 * Renderiza estado cuando la lista global tiene items pero la categoría seleccionada no.
 */
function renderEmptyFilterState() {
  const container = document.getElementById("watchlist-content");
  if (!container) return;

  const filterNames = {
    movie: "películas",
    tv: "series"
  };

  container.innerHTML = `
    <div class="watchlist-state-card empty-state-card">
      <div class="state-icon">🔍</div>
      <h2>No hay ${filterNames[activeWatchlistFilter] || "elementos"} en esta categoría</h2>
      <p>Intentá cambiando el filtro o agregando nuevo contenido a tu lista.</p>
      <button type="button" class="secondary-button" onclick="setActiveFilter('all')">
        Ver todo
      </button>
    </div>
  `;
}

/**
 * 13. Renderiza el estado de error en caso de fallo de red o API.
 * @param {string} message
 */
function renderErrorState(message) {
  const container = document.getElementById("watchlist-content");
  if (!container) return;

  container.innerHTML = `
    <div class="watchlist-state-card error-state-card">
      <div class="state-icon">⚠️</div>
      <h2>Ocurrió un error</h2>
      <p>${escapeHtml(message)}</p>
      <button type="button" class="primary-button" onclick="loadWatchlist()">
        <i class="fa-solid fa-rotate-right"></i> Reintentar
      </button>
    </div>
  `;
}

/**
 * Función auxiliar para sanitizar cadenas HTML y prevenir XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Escuchar el evento DOMContentLoaded para iniciar la lógica
document.addEventListener("DOMContentLoaded", initWatchlistPage);
