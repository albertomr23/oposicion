// ============================================================
//  APP.JS — Router principal y controlador de vistas
// ============================================================
import { saveExamen, deleteExamen, updateExamen, getExamenById, exportData, TEMARIO, getExamenes } from "./data.js";
import {
  construirExamen,
  getStatsGlobales,
  getStatsPorTema,
  getStatsPorBloque,
  getTemasMasFlojos,
  getEvolucion,
  getRankingUrgencia,
  getHistorialTema,
} from "./examenes.js";
import {
  renderGraficoEvolucion,
  renderGraficoBloques,
  renderGraficoRadar,
  renderGraficoComparativaTema,
} from "./charts.js";

// ── ROUTER ───────────────────────────────────────────────────
const routes = {
  dashboard:      renderDashboard,
  "nuevo-examen": renderNuevoExamen,
  evolucion:      renderEvolucion,
  temas:          renderTemas,
  urgencia:       renderRankingUrgencia,
};

export function navigate(page, params = {}) {
  document.querySelectorAll(".nav-link").forEach((el) => {
    el.classList.toggle("active", el.dataset.page === page);
  });

  const main = document.getElementById("main-content");
  main.classList.add("page-exit");

  setTimeout(() => {
    main.innerHTML = "";
    main.classList.remove("page-exit");
    main.classList.add("page-enter");

    if      (page === "detalle-examen")   renderDetalleExamen(main, params.id);
    else if (page === "editar-examen")    renderNuevoExamen(main, params.id);
    else if (page === "comparativa-tema") renderComparativaTema(main, params.temaId);
    else { (routes[page] || renderDashboard)(main); }

    setTimeout(() => main.classList.remove("page-enter"), 400);
  }, 150);
}

// ── DASHBOARD ────────────────────────────────────────────────
function renderDashboard(container) {
  const stats   = getStatsGlobales();
  const flojos  = getTemasMasFlojos(5);
  const bloques = getStatsPorBloque();

  const tendenciaIcon  = stats.tendencia > 0 ? "↑" : stats.tendencia < 0 ? "↓" : "→";
  const tendenciaClass = stats.tendencia > 0 ? "positivo" : stats.tendencia < 0 ? "negativo" : "neutro";

  container.innerHTML = `
    <div class="page-header">
      <h1>Dashboard</h1>
      <p class="subtitle">Resumen de tu preparación</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card accent">
        <div class="stat-label">Nota media</div>
        <div class="stat-value">${stats.notaMedia > 0 ? stats.notaMedia.toFixed(2) : "—"}</div>
        <div class="stat-sub">/ 10 · máx ${stats.notaMaxima > 0 ? stats.notaMaxima.toFixed(2) : "—"} · mín ${stats.notaMinima > 0 ? stats.notaMinima.toFixed(2) : "—"}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Exámenes realizados</div>
        <div class="stat-value">${stats.totalExamenes}</div>
        <div class="stat-sub">${stats.totalPreguntas} preguntas totales</div>
      </div>
      <div class="stat-card success">
        <div class="stat-label">% Aciertos</div>
        <div class="stat-value">${stats.pctAciertos}%</div>
        <div class="stat-sub">Fallos: ${stats.pctFallos}% · Blancos: ${stats.pctBlancos}%</div>
      </div>
      <div class="stat-card ${tendenciaClass}">
        <div class="stat-label">Tendencia</div>
        <div class="stat-value">${tendenciaIcon} ${Math.abs(stats.tendencia).toFixed(2)}</div>
        <div class="stat-sub">Respecto a tu primera mitad</div>
      </div>
    </div>

    ${stats.totalExamenes === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>Aún no hay exámenes registrados</h3>
        <p>Empieza registrando tu primer examen para ver estadísticas aquí.</p>
        <button class="btn btn-primary" onclick="window.app.navigate('nuevo-examen')">Registrar primer examen</button>
      </div>
    ` : `
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header"><h2>Evolución de notas</h2></div>
          <div class="card-body"><canvas id="chart-evolucion" height="220"></canvas></div>
        </div>
        <div class="card">
          <div class="card-header"><h2>Radar por bloques</h2></div>
          <div class="card-body"><canvas id="chart-radar" height="220"></canvas></div>
        </div>
        <div class="card">
          <div class="card-header"><h2>Rendimiento por bloque</h2></div>
          <div class="card-body"><canvas id="chart-bloques" height="220"></canvas></div>
        </div>
        <div class="card full-width">
          <div class="card-header">
            <h2>🔴 Temas más flojos</h2>
            <span class="card-sub">Los 5 con menor % de aciertos</span>
          </div>
          <div class="card-body">
            ${flojos.length === 0
              ? `<p class="muted">Sin datos suficientes aún.</p>`
              : flojos.map((t) => `
                <div class="tema-row">
                  <div class="tema-info">
                    <span class="tema-num">T${t.temaId}</span>
                    <span class="tema-titulo">${t.titulo.substring(0, 70)}</span>
                  </div>
                  <div class="tema-bars">
                    <div class="bar-wrap">
                      <div class="bar acierto" style="width:${t.pctAciertos}%"></div>
                      <div class="bar fallo"   style="width:${t.pctFallos}%"></div>
                      <div class="bar blanco"  style="width:${t.pctBlancos}%"></div>
                    </div>
                    <span class="pct-label">${t.pctAciertos}% ✓</span>
                  </div>
                </div>`).join("")}
          </div>
        </div>
      </div>
    `}
  `;

  if (stats.totalExamenes > 0) {
    requestAnimationFrame(() => {
      renderGraficoEvolucion("chart-evolucion", getEvolucion());
      renderGraficoBloques("chart-bloques", bloques);
      renderGraficoRadar("chart-radar", bloques);
    });
  }
}

// ── NUEVO / EDITAR EXAMEN ────────────────────────────────────
function renderNuevoExamen(container, editId = null) {
  const examenExistente = editId ? getExamenById(editId) : null;
  const isEdit = !!examenExistente;

  container.innerHTML = `
    <div class="page-header">
      <h1>${isEdit ? "Editar examen" : "Registrar examen"}</h1>
      <p class="subtitle">${isEdit ? `Modificando: <strong>${escapeHtml(examenExistente.nombre)}</strong>` : "Introduce los resultados desglosados por tema"}</p>
    </div>

    <div class="card form-card">
      <div class="form-row">
        <div class="form-group">
          <label>Nombre del examen</label>
          <input type="text" id="examen-nombre" placeholder="Ej: Simulacro 3 - Academia Opositas"
            value="${isEdit ? escapeHtml(examenExistente.nombre) : ""}" />
        </div>
        <div class="form-group">
          <label>Fecha</label>
          <input type="date" id="examen-fecha"
            value="${isEdit ? examenExistente.fecha : new Date().toISOString().slice(0, 10)}" />
        </div>
        <div class="form-group">
          <label>Tipo</label>
          <select id="examen-tipo">
            <option value="simulacro" ${isEdit && examenExistente.tipo === "simulacro" ? "selected" : ""}>Simulacro cronometrado</option>
            <option value="online"    ${isEdit && examenExistente.tipo === "online"    ? "selected" : ""}>Plataforma online</option>
            <option value="papel"     ${isEdit && examenExistente.tipo === "papel"     ? "selected" : ""}>En papel</option>
          </select>
        </div>
      </div>

      <div class="section-divider"><span>Temas del examen</span></div>

      <div class="tema-search-wrap">
        <input type="text" id="tema-search" placeholder="🔍 Buscar y añadir temas..." autocomplete="off" />
        <div id="tema-dropdown" class="tema-dropdown hidden"></div>
      </div>

      <div id="temas-seleccionados" class="temas-seleccionados">
        <p class="hint">Busca un tema arriba para añadirlo al examen.</p>
      </div>

      <div class="form-actions">
        <div id="form-error" class="form-error hidden"></div>
        <button class="btn btn-secondary" onclick="window.app.navigate('${isEdit ? "evolucion" : "dashboard"}')">Cancelar</button>
        <button class="btn btn-primary" id="btn-guardar">${isEdit ? "Guardar cambios" : "Guardar examen"}</button>
      </div>
    </div>
  `;

  initFormHandlers(isEdit, editId, examenExistente);
}

function initFormHandlers(isEdit, editId, examenExistente) {
  const searchInput  = document.getElementById("tema-search");
  const dropdown     = document.getElementById("tema-dropdown");
  const selectedWrap = document.getElementById("temas-seleccionados");
  const selectedIds  = new Set();

  if (isEdit && examenExistente) {
    examenExistente.temas.forEach((t) => addTema(t.temaId, t));
  }

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    if (q.length < 1) { dropdown.classList.add("hidden"); return; }

    const matches = TEMARIO.filter(
      (t) => !selectedIds.has(t.id) &&
        (t.titulo.toLowerCase().includes(q) || String(t.id).includes(q) || t.bloque.toLowerCase().includes(q))
    ).slice(0, 8);

    if (matches.length === 0) { dropdown.classList.add("hidden"); return; }

    dropdown.innerHTML = matches.map((t) => `
      <div class="dropdown-item" data-id="${t.id}">
        <span class="dd-num">T${t.id}</span>
        <span class="dd-titulo">${t.titulo.substring(0, 80)}${t.titulo.length > 80 ? "…" : ""}</span>
        <span class="dd-bloque">${t.bloque}</span>
      </div>
    `).join("");
    dropdown.classList.remove("hidden");
  });

  dropdown.addEventListener("click", (e) => {
    const item = e.target.closest(".dropdown-item");
    if (!item) return;
    addTema(Number(item.dataset.id));
    searchInput.value = "";
    dropdown.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".tema-search-wrap")) dropdown.classList.add("hidden");
  });

  function addTema(temaId, prefill = null) {
    if (selectedIds.has(temaId)) return;
    selectedIds.add(temaId);

    const tema = TEMARIO.find((t) => t.id === temaId);
    const hint = selectedWrap.querySelector(".hint");
    if (hint) hint.remove();

    const row = document.createElement("div");
    row.className = "tema-input-row";
    row.dataset.id = temaId;
    row.innerHTML = `
      <div class="tema-input-header">
        <span class="tema-badge">T${temaId}</span>
        <span class="tema-input-titulo">${tema.titulo.substring(0, 70)}${tema.titulo.length > 70 ? "…" : ""}</span>
        <button class="btn-remove" title="Quitar tema">✕</button>
      </div>
      <div class="tema-inputs">
        <div class="input-group">
          <label>Preguntas</label>
          <input type="number" class="t-preguntas" min="1" max="200" placeholder="0" value="${prefill ? prefill.preguntas : ""}" />
        </div>
        <div class="input-group success-input">
          <label>✓ Aciertos</label>
          <input type="number" class="t-aciertos" min="0" placeholder="0" value="${prefill ? prefill.aciertos : ""}" />
        </div>
        <div class="input-group error-input">
          <label>✗ Fallos</label>
          <input type="number" class="t-fallos" min="0" placeholder="0" value="${prefill ? prefill.fallos : ""}" />
        </div>
        <div class="input-group blank-input">
          <label>○ Blancos</label>
          <input type="number" class="t-blancos" min="0" placeholder="0" value="${prefill ? prefill.blancos : ""}" readonly />
        </div>
      </div>
    `;
    selectedWrap.appendChild(row);

    const inputP = row.querySelector(".t-preguntas");
    const inputA = row.querySelector(".t-aciertos");
    const inputF = row.querySelector(".t-fallos");
    const inputB = row.querySelector(".t-blancos");

    function actualizarBlancos() {
      const p = Number(inputP.value) || 0;
      const a = Number(inputA.value) || 0;
      const f = Number(inputF.value) || 0;
      inputB.value = Math.max(0, p - a - f);
    }
    [inputP, inputA, inputF].forEach((el) => el.addEventListener("input", actualizarBlancos));

    row.querySelector(".btn-remove").addEventListener("click", () => {
      selectedIds.delete(temaId);
      row.remove();
      if (selectedWrap.children.length === 0) {
        selectedWrap.innerHTML = `<p class="hint">Busca un tema arriba para añadirlo al examen.</p>`;
      }
    });
  }

  document.getElementById("btn-guardar").addEventListener("click", () => {
    const nombre  = document.getElementById("examen-nombre").value.trim();
    const fecha   = document.getElementById("examen-fecha").value;
    const tipo    = document.getElementById("examen-tipo").value;
    const errorEl = document.getElementById("form-error");
    const rows    = document.querySelectorAll(".tema-input-row");

    if (!nombre) { showError(errorEl, "Introduce un nombre para el examen."); return; }
    if (!fecha)  { showError(errorEl, "Selecciona una fecha."); return; }
    if (rows.length === 0) { showError(errorEl, "Añade al menos un tema."); return; }

    const temas = [];
    let valid = true;

    rows.forEach((row) => {
      const temaId    = Number(row.dataset.id);
      const preguntas = Number(row.querySelector(".t-preguntas").value) || 0;
      const aciertos  = Number(row.querySelector(".t-aciertos").value)  || 0;
      const fallos    = Number(row.querySelector(".t-fallos").value)    || 0;
      if (preguntas === 0) { showError(errorEl, `T${temaId}: indica el número de preguntas.`); valid = false; }
      if (aciertos + fallos > preguntas) { showError(errorEl, `T${temaId}: aciertos + fallos superan el total.`); valid = false; }
      temas.push({ temaId, preguntas, aciertos, fallos });
    });

    if (!valid) return;

    const examen = construirExamen({ nombre, fecha, tipo, temas });

    if (isEdit) {
      updateExamen(editId, examen);
      showToast("✓ Examen actualizado correctamente");
      navigate("detalle-examen", { id: editId });
    } else {
      const saved = saveExamen(examen);
      showToast(`✓ Examen guardado — Nota: ${examen.nota.toFixed(2)}/10`);
      navigate("detalle-examen", { id: saved.id });
    }
  });
}

// ── DETALLE EXAMEN ───────────────────────────────────────────
function renderDetalleExamen(container, id) {
  const examen = getExamenById(id);
  if (!examen) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Examen no encontrado</h3>
        <button class="btn btn-primary" onclick="window.app.navigate('evolucion')">Volver</button>
      </div>`;
    return;
  }

  const temasDelExamen = examen.temas.map((t) => {
    const info = TEMARIO.find((tm) => tm.id === t.temaId);
    return { ...t, titulo: info ? info.titulo : `Tema ${t.temaId}`, bloque: info ? info.bloque : "" };
  });

  container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <button class="btn btn-secondary" onclick="window.app.navigate('evolucion')">← Volver</button>
        <div>
          <h1>${escapeHtml(examen.nombre)}</h1>
          <p class="subtitle">${formatFecha(examen.fecha)} · <span class="tipo-badge tipo-${examen.tipo}">${examen.tipo}</span></p>
        </div>
        <div style="margin-left:auto;display:flex;gap:.6rem">
          <button class="btn btn-secondary" onclick="window.app.navigate('editar-examen',{id:${examen.id}})">✏️ Editar</button>
          <button class="btn btn-secondary" id="btn-delete-examen">🗑️ Eliminar</button>
        </div>
      </div>
    </div>

    <div class="stats-grid" style="margin-bottom:1.5rem">
      <div class="stat-card accent">
        <div class="stat-label">Nota</div>
        <div class="stat-value ${notaClass(examen.nota)}">${examen.nota.toFixed(2)}</div>
        <div class="stat-sub">/ 10 · ${examen.puntosRaw >= 0 ? "+" : ""}${examen.puntosRaw} puntos raw</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total preguntas</div>
        <div class="stat-value">${examen.totales.preguntas}</div>
        <div class="stat-sub">${examen.temas.length} tema${examen.temas.length > 1 ? "s" : ""}</div>
      </div>
      <div class="stat-card success">
        <div class="stat-label">Aciertos</div>
        <div class="stat-value">${examen.totales.aciertos}</div>
        <div class="stat-sub">${pct(examen.totales.aciertos, examen.totales.preguntas)}% del total</div>
      </div>
      <div class="stat-card negativo">
        <div class="stat-label">Fallos</div>
        <div class="stat-value">${examen.totales.fallos}</div>
        <div class="stat-sub">${pct(examen.totales.fallos, examen.totales.preguntas)}% · −${(examen.totales.fallos * 0.5).toFixed(1)} pts</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Desglose por tema</h2>
        <span class="card-sub">${examen.temas.length} temas evaluados</span>
      </div>
      <div class="card-body table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nº</th><th>Tema</th><th>Bloque</th>
              <th>Preg.</th>
              <th class="success-text">✓</th>
              <th class="error-text">✗</th>
              <th class="muted">○</th>
              <th>% ✓</th>
              <th>Distribución</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${temasDelExamen.map((t) => {
              const pa = pct(t.aciertos, t.preguntas);
              const pf = pct(t.fallos,   t.preguntas);
              const pb = pct(t.blancos,  t.preguntas);
              return `
              <tr>
                <td><span class="tema-num-sm">T${t.temaId}</span></td>
                <td class="titulo-col">${t.titulo.substring(0, 80)}${t.titulo.length > 80 ? "…" : ""}</td>
                <td><span class="bloque-tag bloque-${slugBloque(t.bloque)}">${t.bloque.replace("Ciencias ", "")}</span></td>
                <td>${t.preguntas}</td>
                <td class="success-text">${t.aciertos}</td>
                <td class="error-text">${t.fallos}</td>
                <td class="muted">${t.blancos}</td>
                <td><strong class="${pa >= 70 ? "success-text" : pa >= 50 ? "warning-text" : "error-text"}">${pa}%</strong></td>
                <td>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar acierto" style="width:${pa}%"></div>
                    <div class="mini-bar fallo"   style="width:${pf}%"></div>
                    <div class="mini-bar blanco"  style="width:${pb}%"></div>
                  </div>
                </td>
                <td>
                  <button class="btn-icon" title="Ver evolución histórica de este tema"
                    onclick="window.app.navigate('comparativa-tema',{temaId:${t.temaId}})">📈</button>
                </td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("btn-delete-examen").addEventListener("click", () => {
    if (confirm("¿Eliminar este examen? Esta acción no se puede deshacer.")) {
      deleteExamen(examen.id);
      showToast("Examen eliminado");
      navigate("evolucion");
    }
  });
}

// ── EVOLUCIÓN ────────────────────────────────────────────────
function renderEvolucion(container) {
  const evolucion = getEvolucion();
  const examenes  = getExamenes().sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  container.innerHTML = `
    <div class="page-header">
      <h1>Evolución</h1>
      <p class="subtitle">Progresión de tus notas a lo largo del tiempo</p>
    </div>

    ${evolucion.length >= 2 ? `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-body"><canvas id="chart-evolucion-full" height="300"></canvas></div>
      </div>` : `
      <div class="empty-state" style="margin-bottom:1.5rem">
        <div class="empty-icon">📈</div>
        <h3>Necesitas al menos 2 exámenes para ver el gráfico</h3>
      </div>`}

    ${examenes.length > 0 ? `
      <div class="card">
        <div class="card-header">
          <h2>Historial de exámenes</h2>
          <span class="card-sub">${examenes.length} examen${examenes.length > 1 ? "es" : ""}</span>
        </div>
        <div class="card-body table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fecha</th><th>Nombre</th><th>Tipo</th>
                <th>Preguntas</th>
                <th class="success-text">✓</th>
                <th class="error-text">✗</th>
                <th class="muted">○</th>
                <th>Nota</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${examenes.map((e) => `
                <tr>
                  <td>${formatFecha(e.fecha)}</td>
                  <td>
                    <button class="btn-link" onclick="window.app.navigate('detalle-examen',{id:${e.id}})">${escapeHtml(e.nombre)}</button>
                  </td>
                  <td><span class="tipo-badge tipo-${e.tipo}">${e.tipo}</span></td>
                  <td>${e.totales.preguntas}</td>
                  <td class="success-text">${e.totales.aciertos}</td>
                  <td class="error-text">${e.totales.fallos}</td>
                  <td class="muted">${e.totales.blancos}</td>
                  <td><strong class="${notaClass(e.nota)}">${e.nota.toFixed(2)}</strong></td>
                  <td style="display:flex;gap:.4rem;align-items:center">
                    <button class="btn-icon" title="Ver detalle" onclick="window.app.navigate('detalle-examen',{id:${e.id}})">🔍</button>
                    <button class="btn-icon" title="Editar"      onclick="window.app.navigate('editar-examen',{id:${e.id}})">✏️</button>
                    <button class="btn-icon btn-delete" data-id="${e.id}" title="Eliminar">🗑️</button>
                  </td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>` : ""}
  `;

  if (evolucion.length >= 2) {
    requestAnimationFrame(() => renderGraficoEvolucion("chart-evolucion-full", evolucion, true));
  }

  container.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("¿Eliminar este examen?")) {
        deleteExamen(Number(btn.dataset.id));
        showToast("Examen eliminado");
        navigate("evolucion");
      }
    });
  });
}

// ── COMPARATIVA TEMA ─────────────────────────────────────────
function renderComparativaTema(container, temaId) {
  const tema     = TEMARIO.find((t) => t.id === temaId);
  const historial = getHistorialTema(temaId);
  const stats    = getStatsPorTema().find((t) => t.temaId === temaId);

  const diff = historial.length >= 2
    ? historial[historial.length - 1].pctAciertos - historial[0].pctAciertos
    : null;

  container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <button class="btn btn-secondary" onclick="window.app.navigate('temas')">← Volver</button>
        <div>
          <h1><span class="tema-num">T${temaId}</span> Comparativa histórica</h1>
          <p class="subtitle">${tema ? tema.titulo.substring(0, 90) : ""}</p>
        </div>
      </div>
    </div>

    ${historial.length === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <h3>Sin datos para este tema</h3>
        <p>Registra un examen que incluya el T${temaId} para ver su evolución.</p>
        <button class="btn btn-primary" onclick="window.app.navigate('nuevo-examen')">Registrar examen</button>
      </div>
    ` : `
      <div class="stats-grid" style="margin-bottom:1.5rem">
        <div class="stat-card accent">
          <div class="stat-label">% Aciertos acumulado</div>
          <div class="stat-value success-text">${stats.pctAciertos}%</div>
          <div class="stat-sub">${stats.preguntas} preguntas practicadas</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">% Fallos acumulado</div>
          <div class="stat-value error-text">${stats.pctFallos}%</div>
          <div class="stat-sub">${stats.fallos} fallos en total</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Veces practicado</div>
          <div class="stat-value">${historial.length}</div>
          <div class="stat-sub">examen${historial.length > 1 ? "es" : ""}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Tendencia</div>
          <div class="stat-value ${diff === null ? "muted" : diff > 0 ? "success-text" : diff < 0 ? "error-text" : "muted"}">
            ${diff === null ? "—" : diff > 0 ? `↑ +${diff.toFixed(1)}%` : `↓ ${diff.toFixed(1)}%`}
          </div>
          <div class="stat-sub">primer vs último examen</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h2>Evolución de aciertos y fallos</h2></div>
        <div class="card-body"><canvas id="chart-tema" height="280"></canvas></div>
      </div>

      <div class="card">
        <div class="card-header"><h2>Detalle por examen</h2></div>
        <div class="card-body table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Fecha</th><th>Examen</th><th>Preguntas</th>
                <th class="success-text">✓</th>
                <th class="error-text">✗</th>
                <th class="muted">○</th>
                <th>% Aciertos</th>
              </tr>
            </thead>
            <tbody>
              ${historial.map((h) => `
                <tr>
                  <td>${formatFecha(h.fecha)}</td>
                  <td>${escapeHtml(h.nombre)}</td>
                  <td>${h.preguntas}</td>
                  <td class="success-text">${h.aciertos}</td>
                  <td class="error-text">${h.fallos}</td>
                  <td class="muted">${h.blancos}</td>
                  <td><strong class="${h.pctAciertos >= 70 ? "success-text" : h.pctAciertos >= 50 ? "warning-text" : "error-text"}">${h.pctAciertos}%</strong></td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;

  if (historial.length > 0) {
    requestAnimationFrame(() => renderGraficoComparativaTema("chart-tema", historial));
  }
}

// ── TEMAS ────────────────────────────────────────────────────
function renderTemas(container) {
  const stats  = getStatsPorTema();
  const bloques = [...new Set(stats.map((t) => t.bloque))];
  let activeBloqueFilter = "todos";
  let sortBy = "id";

  function renderTabla() {
    let filtered = sortBy === "aciertos"
      ? stats.filter((t) => t.preguntas > 0)
      : [...stats];

    if (activeBloqueFilter !== "todos") {
      filtered = filtered.filter((t) => t.bloque === activeBloqueFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "id")        return a.temaId - b.temaId;
      if (sortBy === "aciertos")  return a.pctAciertos - b.pctAciertos;
      if (sortBy === "preguntas") return b.preguntas - a.preguntas;
      return 0;
    });

    document.getElementById("temas-table-body").innerHTML = filtered.map((t) => `
      <tr class="${t.preguntas === 0 ? "sin-datos" : ""}">
        <td><span class="tema-num-sm">T${t.temaId}</span></td>
        <td class="titulo-col">${t.titulo.substring(0, 90)}${t.titulo.length > 90 ? "…" : ""}</td>
        <td><span class="bloque-tag bloque-${slugBloque(t.bloque)}">${t.bloque.replace("Ciencias ", "")}</span></td>
        <td>${t.preguntas > 0 ? t.preguntas : "<span class='muted'>—</span>"}</td>
        <td class="${t.preguntas > 0 ? "success-text" : "muted"}">${t.preguntas > 0 ? t.pctAciertos + "%" : "—"}</td>
        <td class="${t.preguntas > 0 ? "error-text"   : "muted"}">${t.preguntas > 0 ? t.pctFallos   + "%" : "—"}</td>
        <td class="muted">${t.preguntas > 0 ? t.pctBlancos + "%" : "—"}</td>
        <td>
          ${t.preguntas > 0 ? `
            <div class="mini-bar-wrap">
              <div class="mini-bar acierto" style="width:${t.pctAciertos}%"></div>
              <div class="mini-bar fallo"   style="width:${t.pctFallos}%"></div>
              <div class="mini-bar blanco"  style="width:${t.pctBlancos}%"></div>
            </div>` : "<span class='muted'>sin datos</span>"}
        </td>
        <td>
          ${t.preguntas > 0
            ? `<button class="btn-icon" title="Ver evolución histórica"
                onclick="window.app.navigate('comparativa-tema',{temaId:${t.temaId}})">📈</button>`
            : ""}
        </td>
      </tr>
    `).join("");
  }

  container.innerHTML = `
    <div class="page-header">
      <h1>Análisis por temas</h1>
      <p class="subtitle">Rendimiento detallado de los 81 temas · haz clic en 📈 para ver la evolución histórica</p>
    </div>

    <div class="filters-bar">
      <div class="filter-group">
        <button class="filter-btn active" data-bloque="todos">Todos (81)</button>
        ${bloques.map((b) => `
          <button class="filter-btn" data-bloque="${b}">
            ${b.replace("Ciencias ", "")} (${stats.filter((t) => t.bloque === b).length})
          </button>`).join("")}
      </div>
      <div class="sort-group">
        <label>Ordenar:</label>
        <select id="sort-select">
          <option value="id">Nº tema</option>
          <option value="aciertos">% Aciertos ↑</option>
          <option value="preguntas">Más practicados</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="card-body table-responsive">
        <table class="data-table temas-table">
          <thead>
            <tr>
              <th>Nº</th><th>Tema</th><th>Bloque</th><th>Preguntas</th>
              <th class="success-text">% ✓</th>
              <th class="error-text">% ✗</th>
              <th class="muted">% ○</th>
              <th>Distribución</th><th></th>
            </tr>
          </thead>
          <tbody id="temas-table-body"></tbody>
        </table>
      </div>
    </div>
  `;

  renderTabla();

  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeBloqueFilter = btn.dataset.bloque;
      renderTabla();
    });
  });

  document.getElementById("sort-select").addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderTabla();
  });
}

// ── RANKING URGENCIA ─────────────────────────────────────────
function renderRankingUrgencia(container) {
  const ranking = getRankingUrgencia();

  container.innerHTML = `
    <div class="page-header">
      <h1>🚨 Ranking de urgencia</h1>
      <p class="subtitle">Temas priorizados por repaso · fallos (70%) + falta de práctica (30%)</p>
    </div>

    ${ranking.length === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>Aún no hay datos suficientes</h3>
        <p>Registra al menos un examen para ver el ranking de urgencia.</p>
        <button class="btn btn-primary" onclick="window.app.navigate('nuevo-examen')">Registrar examen</button>
      </div>
    ` : `
      <div class="card">
        <div class="card-body table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th><th>Nº</th><th>Tema</th><th>Bloque</th>
                <th>Score</th>
                <th class="success-text">% ✓</th>
                <th class="error-text">% ✗</th>
                <th>Practicado</th>
                <th>Prioridad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${ranking.map((t, i) => {
                const prioClass = t.urgencia >= 70 ? "error-text" : t.urgencia >= 45 ? "warning-text" : "success-text";
                const prioLabel = t.urgencia >= 70 ? "🔴 Alta" : t.urgencia >= 45 ? "🟡 Media" : "🟢 Baja";
                const barColor  = t.urgencia >= 70 ? "var(--danger)" : t.urgencia >= 45 ? "var(--warning)" : "var(--success)";
                return `
                <tr>
                  <td class="muted">${i + 1}</td>
                  <td><span class="tema-num-sm">T${t.temaId}</span></td>
                  <td class="titulo-col">${t.titulo.substring(0, 80)}${t.titulo.length > 80 ? "…" : ""}</td>
                  <td><span class="bloque-tag bloque-${slugBloque(t.bloque)}">${t.bloque.replace("Ciencias ", "")}</span></td>
                  <td>
                    <div style="display:flex;align-items:center;gap:.5rem">
                      <div class="mini-bar-wrap" style="width:80px">
                        <div class="mini-bar" style="width:${Math.min(t.urgencia, 100)}%;background:${barColor}"></div>
                      </div>
                      <strong class="${prioClass}">${t.urgencia}</strong>
                    </div>
                  </td>
                  <td class="success-text">${t.pctAciertos}%</td>
                  <td class="error-text">${t.pctFallos}%</td>
                  <td class="muted">${t.examenes} vez${t.examenes !== 1 ? "es" : ""}</td>
                  <td>${prioLabel}</td>
                  <td>
                    <button class="btn-icon" title="Ver evolución histórica"
                      onclick="window.app.navigate('comparativa-tema',{temaId:${t.temaId}})">📈</button>
                  </td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}

// ── UTILIDADES ───────────────────────────────────────────────
function formatFecha(fechaStr) {
  if (!fechaStr) return "—";
  const [y, m, d] = fechaStr.split("-");
  return `${d}/${m}/${y}`;
}

function notaClass(nota) {
  if (nota >= 7) return "success-text";
  if (nota >= 5) return "warning-text";
  return "error-text";
}

function slugBloque(bloque) {
  if (bloque.includes("Jurídicas"))  return "juridicas";
  if (bloque.includes("Sociales"))   return "sociales";
  if (bloque.includes("Técnico"))    return "tecnicas";
  return "otros";
}

function pct(val, total) {
  return total > 0 ? parseFloat(((val / total) * 100).toFixed(1)) : 0;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 4000);
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ── INIT ─────────────────────────────────────────────────────
export function init() {
  window.app = { navigate };

  document.querySelectorAll(".nav-link").forEach((el) => {
    el.addEventListener("click", () => navigate(el.dataset.page));
  });

  const btnExport = document.getElementById("btn-export");
  if (btnExport) btnExport.addEventListener("click", exportData);

  navigate("dashboard");
}