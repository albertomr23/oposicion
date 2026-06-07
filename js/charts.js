// ============================================================
//  CHARTS.JS — Gráficos con Chart.js
// ============================================================

const COLORS = {
  acierto:  "#22c55e",
  fallo:    "#ef4444",
  blanco:   "#94a3b8",
  accent:   "#3b82f6",
  line:     "#6366f1",
  gridLine: "rgba(255,255,255,0.06)",
  textColor:"#94a3b8",
};

const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

export function renderGraficoEvolucion(canvasId, data, tall = false) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas || data.length === 0) return;

  const labels = data.map((d) => formatFechaCorta(d.fecha));
  const notas  = data.map((d) => d.nota);
  const mediaGlobal = notas.reduce((a, b) => a + b, 0) / notas.length;

  chartInstances[canvasId] = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Nota",
          data: notas,
          borderColor: COLORS.line,
          backgroundColor: "rgba(99,102,241,0.12)",
          borderWidth: 2.5,
          pointBackgroundColor: notas.map((n) =>
            n >= 7 ? COLORS.acierto : n >= 5 ? "#f59e0b" : COLORS.fallo
          ),
          pointRadius: 6,
          pointHoverRadius: 9,
          tension: 0.35,
          fill: true,
        },
        {
          label: "Media",
          data: notas.map(() => parseFloat(mediaGlobal.toFixed(2))),
          borderColor: "rgba(148,163,184,0.5)",
          borderDash: [6, 4],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: COLORS.textColor, font: { size: 12 } } },
        tooltip: {
          callbacks: {
            title: (items) => data[items[0].dataIndex]?.nombre || items[0].label,
            label: (item) => ` Nota: ${item.raw.toFixed(2)} / 10`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: COLORS.textColor, maxRotation: 45 },
          grid:  { color: COLORS.gridLine },
        },
        y: {
          min: 0,
          max: 10,
          ticks: { color: COLORS.textColor, stepSize: 1 },
          grid:  { color: COLORS.gridLine },
        },
      },
    },
  });
}

export function renderGraficoBloques(canvasId, bloques) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas || bloques.length === 0) return;

  const labels = bloques.map((b) => b.bloque.replace("Ciencias ", ""));

  chartInstances[canvasId] = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "✓ Aciertos",
          data: bloques.map((b) => b.pctAciertos),
          backgroundColor: "rgba(34,197,94,0.8)",
          borderRadius: 4,
        },
        {
          label: "✗ Fallos",
          data: bloques.map((b) => b.pctFallos),
          backgroundColor: "rgba(239,68,68,0.8)",
          borderRadius: 4,
        },
        {
          label: "○ Blancos",
          data: bloques.map((b) => b.pctBlancos),
          backgroundColor: "rgba(148,163,184,0.5)",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: COLORS.textColor, font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: (item) => ` ${item.dataset.label}: ${item.raw}%`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: COLORS.textColor },
          grid:  { color: COLORS.gridLine },
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: COLORS.textColor, callback: (v) => v + "%" },
          grid:  { color: COLORS.gridLine },
        },
      },
    },
  });
}

export function renderGraficoTema(canvasId, stats) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  chartInstances[canvasId] = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Aciertos", "Fallos", "En blanco"],
      datasets: [{
        data: [stats.aciertos, stats.fallos, stats.blancos],
        backgroundColor: [COLORS.acierto, COLORS.fallo, COLORS.blanco],
        borderWidth: 0,
      }],
    },
    options: {
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: COLORS.textColor, font: { size: 12 } },
        },
      },
    },
  });
}

export function renderGraficoRadar(canvasId, bloques) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas || bloques.length === 0) return;

  const labels = bloques.map((b) => b.bloque.replace("Ciencias ", ""));
  const data   = bloques.map((b) => b.pctAciertos);

  chartInstances[canvasId] = new Chart(canvas, {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: "% Aciertos",
        data,
        borderColor: COLORS.accent,
        backgroundColor: "rgba(99,102,241,0.15)",
        borderWidth: 2,
        pointBackgroundColor: COLORS.accent,
        pointRadius: 5,
        pointHoverRadius: 8,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: COLORS.textColor, font: { size: 12 } } },
        tooltip: {
          callbacks: { label: (item) => ` ${item.raw}% de aciertos` },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: COLORS.textColor,
            backdropColor: "transparent",
            callback: (v) => v + "%",
          },
          grid:        { color: COLORS.gridLine },
          angleLines:  { color: COLORS.gridLine },
          pointLabels: { color: COLORS.textColor, font: { size: 13, weight: "600" } },
        },
      },
    },
  });
}

export function renderGraficoComparativaTema(canvasId, historial) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas || historial.length === 0) return;

  const labels = historial.map((h) => formatFechaCorta(h.fecha));

  chartInstances[canvasId] = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "% Aciertos",
          data: historial.map((h) => h.pctAciertos),
          borderColor: COLORS.acierto,
          backgroundColor: "rgba(34,197,94,0.1)",
          borderWidth: 2.5,
          pointBackgroundColor: COLORS.acierto,
          pointRadius: 6,
          tension: 0.3,
          fill: true,
        },
        {
          label: "% Fallos",
          data: historial.map((h) => h.pctFallos),
          borderColor: COLORS.fallo,
          backgroundColor: "rgba(239,68,68,0.08)",
          borderWidth: 2,
          pointBackgroundColor: COLORS.fallo,
          pointRadius: 5,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { labels: { color: COLORS.textColor, font: { size: 12 } } },
        tooltip: {
          callbacks: {
            title: (items) => historial[items[0].dataIndex]?.nombre || items[0].label,
            label: (item) => ` ${item.dataset.label}: ${item.raw}%`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: COLORS.textColor },
          grid:  { color: COLORS.gridLine },
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: COLORS.textColor, callback: (v) => v + "%" },
          grid:  { color: COLORS.gridLine },
        },
      },
    },
  });
}

function formatFechaCorta(fechaStr) {
  if (!fechaStr) return "";
  const [, m, d] = fechaStr.split("-");
  return `${d}/${m}`;
}