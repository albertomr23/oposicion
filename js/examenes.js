// ============================================================
//  EXAMENES.JS — Lógica de cálculo de métricas
// ============================================================
import { getExamenes, SCORING, TEMARIO } from "./data.js";

/**
 * Calcula la nota de un examen dado aciertos, fallos y en blanco.
 * Fórmula: aciertos*1 - fallos*0.5
 * La nota se expresa sobre el total de preguntas.
 * @param {number} aciertos
 * @param {number} fallos
 * @param {number} blancos
 * @param {number} total
 * @returns {number} Nota de 0 a 10
 */
export function calcularNota(aciertos, fallos, blancos, total) {
  if (total === 0) return 0;
  const puntos = aciertos * SCORING.acierto + fallos * SCORING.fallo + blancos * SCORING.blanco;
  const maxPuntos = total * SCORING.acierto;
  return Math.max(0, (puntos / maxPuntos) * 10);
}

/**
 * Calcula la nota raw (puntuación directa sin normalizar).
 */
export function calcularPuntosRaw(aciertos, fallos) {
  return aciertos * SCORING.acierto + fallos * SCORING.fallo;
}

/**
 * Construye el objeto examen completo antes de guardarlo.
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Examen estructurado
 */
export function construirExamen(formData) {
  const { nombre, fecha, tipo, temas } = formData;

  // Totales globales sumando todos los temas
  let totalAciertos = 0;
  let totalFallos = 0;
  let totalBlancos = 0;
  let totalPreguntas = 0;

  const temasNormalizados = temas.map((t) => {
    const preguntas = Number(t.preguntas) || 0;
    const aciertos  = Number(t.aciertos)  || 0;
    const fallos    = Number(t.fallos)    || 0;
    const blancos   = preguntas - aciertos - fallos;

    totalPreguntas += preguntas;
    totalAciertos  += aciertos;
    totalFallos    += fallos;
    totalBlancos   += Math.max(0, blancos);

    return {
      temaId:    t.temaId,
      preguntas,
      aciertos,
      fallos,
      blancos:   Math.max(0, blancos),
    };
  });

  const nota = calcularNota(totalAciertos, totalFallos, totalBlancos, totalPreguntas);
  const puntosRaw = calcularPuntosRaw(totalAciertos, totalFallos);

  return {
    nombre,
    fecha,
    tipo,
    temas: temasNormalizados,
    totales: {
      preguntas: totalPreguntas,
      aciertos:  totalAciertos,
      fallos:    totalFallos,
      blancos:   totalBlancos,
    },
    nota:      parseFloat(nota.toFixed(2)),
    puntosRaw: parseFloat(puntosRaw.toFixed(2)),
  };
}

/**
 * Devuelve las métricas acumuladas para CADA tema.
 * @returns {Array} Array con stats por tema
 */
export function getStatsPorTema() {
  const examenes = getExamenes();

  // Inicializar mapa de stats por temaId
  const statsMap = {};
  TEMARIO.forEach((t) => {
    statsMap[t.id] = {
      temaId:    t.id,
      titulo:    t.titulo,
      bloque:    t.bloque,
      preguntas: 0,
      aciertos:  0,
      fallos:    0,
      blancos:   0,
      examenes:  0, // cuántos exámenes incluyeron este tema
    };
  });

  // Acumular datos de cada examen
  examenes.forEach((examen) => {
    examen.temas.forEach((t) => {
      if (statsMap[t.temaId]) {
        statsMap[t.temaId].preguntas += t.preguntas;
        statsMap[t.temaId].aciertos  += t.aciertos;
        statsMap[t.temaId].fallos    += t.fallos;
        statsMap[t.temaId].blancos   += t.blancos;
        statsMap[t.temaId].examenes  += 1;
      }
    });
  });

  // Calcular porcentajes
  return Object.values(statsMap).map((s) => {
    const pct = (val) =>
      s.preguntas > 0 ? parseFloat(((val / s.preguntas) * 100).toFixed(1)) : 0;
    return {
      ...s,
      pctAciertos: pct(s.aciertos),
      pctFallos:   pct(s.fallos),
      pctBlancos:  pct(s.blancos),
    };
  });
}

/**
 * Devuelve métricas globales agregadas de todos los exámenes.
 * @returns {Object}
 */
export function getStatsGlobales() {
  const examenes = getExamenes();
  if (examenes.length === 0) {
    return {
      totalExamenes:  0,
      notaMedia:      0,
      notaMaxima:     0,
      notaMinima:     0,
      totalPreguntas: 0,
      pctAciertos:    0,
      pctFallos:      0,
      pctBlancos:     0,
      tendencia:      0,
    };
  }

  const notas = examenes.map((e) => e.nota);
  const notaMedia = notas.reduce((a, b) => a + b, 0) / notas.length;

  let totalP = 0, totalA = 0, totalF = 0, totalB = 0;
  examenes.forEach((e) => {
    totalP += e.totales.preguntas;
    totalA += e.totales.aciertos;
    totalF += e.totales.fallos;
    totalB += e.totales.blancos;
  });

  // Tendencia: diferencia entre la media de la última mitad y la primera mitad
  let tendencia = 0;
  if (examenes.length >= 4) {
    const mid = Math.floor(examenes.length / 2);
    const primerasMitad = examenes.slice(0, mid).map((e) => e.nota);
    const ultimasMitad  = examenes.slice(mid).map((e) => e.nota);
    const mediaP = primerasMitad.reduce((a, b) => a + b, 0) / primerasMitad.length;
    const mediaU = ultimasMitad.reduce((a, b) => a + b, 0) / ultimasMitad.length;
    tendencia = parseFloat((mediaU - mediaP).toFixed(2));
  }

  return {
    totalExamenes:  examenes.length,
    notaMedia:      parseFloat(notaMedia.toFixed(2)),
    notaMaxima:     parseFloat(Math.max(...notas).toFixed(2)),
    notaMinima:     parseFloat(Math.min(...notas).toFixed(2)),
    totalPreguntas: totalP,
    pctAciertos:    totalP > 0 ? parseFloat(((totalA / totalP) * 100).toFixed(1)) : 0,
    pctFallos:      totalP > 0 ? parseFloat(((totalF / totalP) * 100).toFixed(1)) : 0,
    pctBlancos:     totalP > 0 ? parseFloat(((totalB / totalP) * 100).toFixed(1)) : 0,
    tendencia,
  };
}

/**
 * Devuelve los datos de evolución temporal para el gráfico de línea.
 * @returns {Array} [{fecha, nota, nombre}]
 */
export function getEvolucion() {
  const examenes = getExamenes();
  return [...examenes]
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .map((e) => ({
      fecha:  e.fecha,
      nota:   e.nota,
      nombre: e.nombre,
      tipo:   e.tipo,
    }));
}

/**
 * Devuelve métricas agrupadas por bloque temático.
 * @returns {Array}
 */
export function getStatsPorBloque() {
  const statsTema = getStatsPorTema();

  const bloques = {};
  statsTema.forEach((t) => {
    if (!bloques[t.bloque]) {
      bloques[t.bloque] = { bloque: t.bloque, preguntas: 0, aciertos: 0, fallos: 0, blancos: 0 };
    }
    bloques[t.bloque].preguntas += t.preguntas;
    bloques[t.bloque].aciertos  += t.aciertos;
    bloques[t.bloque].fallos    += t.fallos;
    bloques[t.bloque].blancos   += t.blancos;
  });

  return Object.values(bloques).map((b) => ({
    ...b,
    pctAciertos: b.preguntas > 0 ? parseFloat(((b.aciertos / b.preguntas) * 100).toFixed(1)) : 0,
    pctFallos:   b.preguntas > 0 ? parseFloat(((b.fallos   / b.preguntas) * 100).toFixed(1)) : 0,
    pctBlancos:  b.preguntas > 0 ? parseFloat(((b.blancos  / b.preguntas) * 100).toFixed(1)) : 0,
  }));
}

/**
 * Devuelve los N temas con peor % de aciertos (solo temas con datos).
 * @param {number} n
 * @returns {Array}
 */
export function getTemasMasFlojos(n = 5) {
  return getStatsPorTema()
    .filter((t) => t.preguntas > 0)
    .sort((a, b) => a.pctAciertos - b.pctAciertos)
    .slice(0, n);
}

/**
 * Ranking de urgencia: combina % de fallos + falta de práctica.
 * Fórmula: urgencia = (100 - pctAciertos) * 0.7 + (1 / (examenes+1)) * 100 * 0.3
 * @returns {Array} ordenado de mayor a menor urgencia
 */
export function getRankingUrgencia() {
  const totalExamenes = getExamenes().length || 1;

  return getStatsPorTema()
    .filter((t) => t.preguntas > 0)
    .map((t) => {
      const penalizacionFallo  = (100 - t.pctAciertos) * 0.7;
      const penalizacionOlvido = (1 - t.examenes / totalExamenes) * 100 * 0.3;
      const urgencia = parseFloat((penalizacionFallo + penalizacionOlvido).toFixed(1));
      return { ...t, urgencia };
    })
    .sort((a, b) => b.urgencia - a.urgencia);
}

/**
 * Devuelve el historial cronológico de un tema concreto.
 * @param {number} temaId
 * @returns {Array}
 */
export function getHistorialTema(temaId) {
  return getExamenes()
    .filter((e) => e.temas.some((t) => t.temaId === temaId))
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .map((e) => {
      const t = e.temas.find((t) => t.temaId === temaId);
      return {
        fecha:       e.fecha,
        nombre:      e.nombre,
        tipo:        e.tipo,
        preguntas:   t.preguntas,
        aciertos:    t.aciertos,
        fallos:      t.fallos,
        blancos:     t.blancos,
        pctAciertos: t.preguntas > 0 ? parseFloat(((t.aciertos / t.preguntas) * 100).toFixed(1)) : 0,
        pctFallos:   t.preguntas > 0 ? parseFloat(((t.fallos   / t.preguntas) * 100).toFixed(1)) : 0,
      };
    });
}