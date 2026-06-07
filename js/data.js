// ============================================================
//  DATA.JS — Capa de datos: temario + persistencia localStorage
// ============================================================

// ── TEMARIO COMPLETO ─────────────────────────────────────────
export const TEMARIO = [
  // BLOQUE 1: CIENCIAS JURÍDICAS
  { id: 1,  bloque: "Ciencias Jurídicas",        titulo: "El ordenamiento jurídico. Fuentes del Derecho. La Constitución como fuente. La Ley. La costumbre. Los principios generales del derecho." },
  { id: 2,  bloque: "Ciencias Jurídicas",        titulo: "La persona: concepto. Persona física y jurídica. Capacidad jurídica y de obrar. La emancipación. El estado civil." },
  { id: 3,  bloque: "Ciencias Jurídicas",        titulo: "La nacionalidad: adquisición y pérdida. Doble nacionalidad. Refugiados y apátridas. La vecindad civil. El domicilio." },
  { id: 4,  bloque: "Ciencias Jurídicas",        titulo: "La Constitución: concepto y clases. Valor normativo. Constitución de 1978: estructura. La reforma constitucional." },
  { id: 5,  bloque: "Ciencias Jurídicas",        titulo: "Derechos fundamentales y libertades públicas. Igualdad ante la Ley. Garantías jurisdiccionales. Suspensión de derechos. El Defensor del Pueblo." },
  { id: 6,  bloque: "Ciencias Jurídicas",        titulo: "Los órganos constitucionales. La Corona. Las Cortes Generales. El Gobierno. El CGPJ. El Tribunal Constitucional." },
  { id: 7,  bloque: "Ciencias Jurídicas",        titulo: "La organización territorial del Estado. Estado unitario, federal y regional. El Estado de las Autonomías. La autonomía local." },
  { id: 8,  bloque: "Ciencias Jurídicas",        titulo: "La Unión Europea. Los tratados. El Derecho derivado. Las instituciones. Aplicación del derecho comunitario. El Acuerdo de Schengen." },
  { id: 9,  bloque: "Ciencias Jurídicas",        titulo: "El TEDH y el TJUE. Marco normativo. Composición y funciones. Efectos de sus resoluciones. La Fiscalía Europea." },
  { id: 10, bloque: "Ciencias Jurídicas",        titulo: "Derecho Administrativo. El principio de legalidad. Actividad reglada y discrecional. El reglamento. El acto administrativo. El procedimiento administrativo." },
  { id: 11, bloque: "Ciencias Jurídicas",        titulo: "El Gobierno: composición y funciones. La Administración General del Estado: principios de organización. Órganos superiores y directivos." },
  { id: 12, bloque: "Ciencias Jurídicas",        titulo: "Los empleados públicos: concepto y clases. Adquisición y pérdida de la condición de funcionario. Situaciones administrativas. Deberes, derechos e incompatibilidades." },
  { id: 13, bloque: "Ciencias Jurídicas",        titulo: "El Ministerio del Interior: estructura orgánica. La Secretaría de Estado de Seguridad. La Dirección General de la Policía. La Seguridad Privada." },
  { id: 14, bloque: "Ciencias Jurídicas",        titulo: "La LOFCS: disposiciones generales. Principios básicos de actuación. El CNP: naturaleza, estructura y funciones. Régimen disciplinario. Policías Autonómicas y Locales." },
  { id: 15, bloque: "Ciencias Jurídicas",        titulo: "Entrada y residencia en España de ciudadanos UE. Derechos de extranjeros e integración social. Reagrupación familiar. Garantías jurídicas." },
  { id: 16, bloque: "Ciencias Jurídicas",        titulo: "Documentación de extranjeros. Potestad sancionadora. Tipos de infracciones. Sanciones. Expulsión. Trata de seres humanos." },
  { id: 17, bloque: "Ciencias Jurídicas",        titulo: "La protección internacional. Solicitud de asilo. Estatuto del refugiado. El estatuto de apátrida. Régimen de protección temporal." },
  { id: 18, bloque: "Ciencias Jurídicas",        titulo: "Seguridad Privada: disposiciones generales. Empresas de seguridad. Personal de seguridad privada. Medidas de seguridad. Régimen sancionador." },
  { id: 19, bloque: "Ciencias Jurídicas",        titulo: "Ley Orgánica 4/2015 de protección de la seguridad ciudadana. Documentación e identificación. Mantenimiento de la seguridad ciudadana. Régimen sancionador." },
  { id: 20, bloque: "Ciencias Jurídicas",        titulo: "Protección de datos. Reglamento UE 2016/679 (RGPD). LO 3/2018 de Protección de Datos Personales. LO 7/2021 sobre datos para fines penales." },
  { id: 21, bloque: "Ciencias Jurídicas",        titulo: "Protección de Infraestructuras Críticas. El Catálogo Nacional. El sistema de Protección. Agentes del Sistema. Instrumentos de planificación. Ciberseguridad." },
  { id: 22, bloque: "Ciencias Jurídicas",        titulo: "Concepto de Derecho Penal. Principios informadores. Principios de legalidad y mínima intervención. El Código Penal: estructura." },
  { id: 23, bloque: "Ciencias Jurídicas",        titulo: "La Ley Penal en el tiempo y en el espacio. Inmunidades. Regulación de la extradición." },
  { id: 24, bloque: "Ciencias Jurídicas",        titulo: "Reconocimiento mutuo de resoluciones penales en la UE. La Orden europea de detención y entrega. La Orden europea de protección. La Orden europea de investigación." },
  { id: 25, bloque: "Ciencias Jurídicas",        titulo: "El Delito. Elementos del delito. Concepto de acción, tipicidad, antijuridicidad, culpabilidad y punibilidad. Criterios de clasificación." },
  { id: 26, bloque: "Ciencias Jurídicas",        titulo: "El sujeto activo y pasivo del delito. Objeto del delito. Bien jurídico. Acción y omisión. La comisión por omisión." },
  { id: 27, bloque: "Ciencias Jurídicas",        titulo: "El dolo: elementos y clases. Regulación legal del error de tipo. Regulación legal de la imprudencia." },
  { id: 28, bloque: "Ciencias Jurídicas",        titulo: "Causas de exclusión de la antijuridicidad. La legítima defensa. El estado de necesidad justificante. El cumplimiento de un deber. El consentimiento del ofendido." },
  { id: 29, bloque: "Ciencias Jurídicas",        titulo: "Causas de exclusión de la culpabilidad. Minoría de edad. Anomalía psíquica. Intoxicación plena. Miedo insuperable. Error de prohibición." },
  { id: 30, bloque: "Ciencias Jurídicas",        titulo: "Las circunstancias atenuantes: clases. Las circunstancias agravantes: clases. La circunstancia mixta de parentesco." },
  { id: 31, bloque: "Ciencias Jurídicas",        titulo: "La vida del delito: actos preparatorios. Tentativa y consumación. Regulación legal de la autoría y la participación." },
  { id: 32, bloque: "Ciencias Jurídicas",        titulo: "Unidad y pluralidad de delitos. El delito continuado. El concurso real e ideal de delitos. El concurso de leyes." },
  { id: 33, bloque: "Ciencias Jurídicas",        titulo: "Las penas: concepto, clases y fines. Formas sustitutivas de las penas privativas de libertad. Las medidas de seguridad. La responsabilidad civil. Extinción de la responsabilidad penal." },
  { id: 34, bloque: "Ciencias Jurídicas",        titulo: "Del homicidio y sus formas. Del aborto. De las lesiones. De las lesiones al feto. Delitos relativos a la manipulación genética." },
  { id: 35, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra la libertad: detenciones ilegales; amenazas; coacciones. Delitos de odio. Torturas. Trata de seres humanos." },
  { id: 36, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra la libertad sexual. Agresiones sexuales a menores. Acoso sexual. Exhibicionismo. Prostitución y explotación sexual." },
  { id: 37, bloque: "Ciencias Jurídicas",        titulo: "Omisión del deber de socorro. Delitos contra la intimidad e inviolabilidad del domicilio. Delitos contra el honor. Delitos contra las relaciones familiares." },
  { id: 38, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra el patrimonio y el orden socioeconómico. Delitos contra la Hacienda Pública. Delitos contra los derechos de los trabajadores. Delitos contra derechos de extranjeros." },
  { id: 39, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra la ordenación del territorio. Delitos contra el patrimonio histórico. Delitos contra el medio ambiente. Delitos contra la seguridad colectiva." },
  { id: 40, bloque: "Ciencias Jurídicas",        titulo: "De las falsedades: falsificación de moneda; falsedades documentales; usurpación del estado civil; usurpación de funciones públicas e intrusismo." },
  { id: 41, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra la Administración Pública: prevaricación; desobediencia; cohecho; tráfico de influencias; malversación; fraudes y negociaciones prohibidas." },
  { id: 42, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra la Administración de Justicia: prevaricación; encubrimiento; acusación falsa; falso testimonio; obstrucción a la Justicia; quebrantamiento de condena." },
  { id: 43, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra la Constitución: rebelión; delitos contra la Corona; delitos relativos a derechos fundamentales; delitos contra las garantías constitucionales; ultrajes a España." },
  { id: 44, bloque: "Ciencias Jurídicas",        titulo: "Delitos contra el orden público: atentados contra la autoridad; desórdenes públicos; tenencia de armas y explosivos; organizaciones criminales; terrorismo." },
  { id: 45, bloque: "Ciencias Jurídicas",        titulo: "La potestad jurisdiccional. Los principios de la jurisdicción. Los distintos órdenes jurisdiccionales. Competencia. Los órganos jurisdiccionales penales." },
  { id: 46, bloque: "Ciencias Jurídicas",        titulo: "El proceso penal: principios y fases. El sumario. El atestado. El procedimiento abreviado. El enjuiciamiento rápido. El procedimiento por delitos leves. El habeas corpus." },
  { id: 47, bloque: "Ciencias Jurídicas",        titulo: "Las partes en el proceso penal. Partes acusadoras y acusadas. La acción popular. El Ministerio Fiscal. La policía judicial." },
  { id: 48, bloque: "Ciencias Jurídicas",        titulo: "Medidas cautelares personales: la detención y la prisión provisional. La incomunicación. El Protocolo Facultativo contra la Tortura. Instrucciones SES sobre detenidos." },
  { id: 49, bloque: "Ciencias Jurídicas",        titulo: "La prueba en el proceso penal. Medios de prueba. Prueba anticipada y preconstituida. Prueba por indicios. Pruebas obtenidas con violación de derechos fundamentales." },
  { id: 50, bloque: "Ciencias Jurídicas",        titulo: "Medidas instrumentales judiciales. Entrada y registro. El secreto de las comunicaciones. Medios de investigación tecnológica. Interceptación de comunicaciones. Registros informáticos." },
  { id: 51, bloque: "Ciencias Jurídicas",        titulo: "Ley 4/2015 del Estatuto de la víctima del delito. Concepto de víctima. Derechos básicos. Medidas de protección a la víctima." },
  { id: 52, bloque: "Ciencias Jurídicas",        titulo: "Políticas de igualdad en la AGE. LO 3/2007 para la igualdad efectiva. LO 10/2022 de libertad sexual. Violencia de género. LO 1/2004. Personas LGTBI. Ley 4/2023." },
  { id: 53, bloque: "Ciencias Jurídicas",        titulo: "Prevención de Riesgos Laborales. Concepto de salud y condiciones de trabajo. Marco normativo: Ley 31/1995. RD 39/1997. RD 2/2006 para el CNP." },

  // BLOQUE 2: CIENCIAS SOCIALES
  { id: 54, bloque: "Ciencias Sociales",         titulo: "Corrientes del pensamiento político contemporáneo: Liberalismo, Socialismo, Fascismo y Ecologismo. Sistemas de legitimación social y política." },
  { id: 55, bloque: "Ciencias Sociales",         titulo: "Derechos Humanos. Declaración Universal. Convenio Europeo de DDHH. Convenio contra la Tortura. Mecanismo Nacional de Prevención de la Tortura." },
  { id: 56, bloque: "Ciencias Sociales",         titulo: "Bases fisiológicas del comportamiento humano. El sistema nervioso central y periférico. El sistema neuroendocrino. Receptores sensoriales. La vista y el oído." },
  { id: 57, bloque: "Ciencias Sociales",         titulo: "La atención: concepto. Atención visual. Atención auditiva. Integración de atributos." },
  { id: 58, bloque: "Ciencias Sociales",         titulo: "Estructura y procesos de memoria. Memoria episódica, semántica y de corta duración. Memoria y amnesia. Memoria de testigos. Cómo mejorar la memoria." },
  { id: 59, bloque: "Ciencias Sociales",         titulo: "El aprendizaje: condicionamiento clásico. Condicionamiento operante. El aprendizaje observacional." },
  { id: 60, bloque: "Ciencias Sociales",         titulo: "Teorías del desarrollo: Piaget y Vigotsky. Desarrollo cognitivo. Desarrollo social. Desarrollo moral." },
  { id: 61, bloque: "Ciencias Sociales",         titulo: "Personalidad: influencias genéticas y culturales. La teoría de Cattell. La teoría de Eysenck. El modelo de los cinco factores." },
  { id: 62, bloque: "Ciencias Sociales",         titulo: "Psicología diferencial: herencia y ambiente en la diversidad psicológica humana. Diferencias en inteligencia y personalidad por edad y sexo." },
  { id: 63, bloque: "Ciencias Sociales",         titulo: "La conducta anormal. Trastornos mentales según la OMS: esquizofrenia; trastornos neuróticos y relacionados con el estrés; trastorno asocial de la personalidad." },
  { id: 64, bloque: "Ciencias Sociales",         titulo: "Actitudes: definición y componentes. Cambio de actitudes. Estereotipos y prejuicios. Percepción social y atribución. Conducta de ayuda. Agresividad." },
  { id: 65, bloque: "Ciencias Sociales",         titulo: "Composición y estructura de grupos. El liderazgo. Formación y desarrollo de grupos. Procesos de influencia. Productividad grupal. Toma de decisiones en grupo." },
  { id: 66, bloque: "Ciencias Sociales",         titulo: "Anomia, marginalidad y desviación. El control social. Teorías explicativas de la delincuencia. La víctima: concepto y tipología. Tipos de victimización." },
  { id: 67, bloque: "Ciencias Sociales",         titulo: "Comportamientos colectivos: conducta humana en emergencias. Comunicación con afectados en emergencias. Consecuencias psicológicas de las catástrofes." },
  { id: 68, bloque: "Ciencias Sociales",         titulo: "Los cambios sociales: teorías y procesos. Tecnología y cambio social. Globalización, antiglobalización y nuevos movimientos sociales." },

  // BLOQUE 3: CIENCIAS TÉCNICO-CIENTÍFICAS
  { id: 69, bloque: "Ciencias Técnico-Científicas", titulo: "Introducción a la metodología científica. Método científico: correlacional y experimental. Estudios de laboratorio y de campo." },
  { id: 70, bloque: "Ciencias Técnico-Científicas", titulo: "Aspectos metodológicos en las ciencias sociales. Instrumentos: encuestas, test, observación, escalas. Validez, fiabilidad, sensibilidad y especificidad." },
  { id: 71, bloque: "Ciencias Técnico-Científicas", titulo: "Estadística: concepto y campo de aplicación. Selección de la muestra. Medidas de tendencia central y dispersión. Probabilidad. Estudios estadísticos sobre delincuencia." },
  { id: 72, bloque: "Ciencias Técnico-Científicas", titulo: "La contabilidad y la información contable. El patrimonio empresarial. El balance de situación. Cuentas de pérdidas y ganancias. El IVA." },
  { id: 73, bloque: "Ciencias Técnico-Científicas", titulo: "Redes informáticas: modelo OSI. Modelo TCP/IP. Dispositivos de red: hubs, switches, routers, firewalls. Direccionamiento IP. Redes inalámbricas." },
  { id: 74, bloque: "Ciencias Técnico-Científicas", titulo: "Fundamentos de sistemas operativos. Tipologías: MS-DOS, UNIX, Linux, Windows, Mac OS, iOS, Android. Sistemas de almacenamiento y de archivos." },
  { id: 75, bloque: "Ciencias Técnico-Científicas", titulo: "Ciberdelincuencia: Botnet, Phishing, Ransomware, Malware, Spoofing, Zero-day, XSS, Inyección SQL. Cibercriminales. APTs. Cyber Kill Chain." },
  { id: 76, bloque: "Ciencias Técnico-Científicas", titulo: "Inteligencia: dato, información e inteligencia. Tipologías. Ciclo de la Inteligencia. OSINT. Surface Web, Deep Web y Dark Web. Big Data. Cloud Computing." },
  { id: 77, bloque: "Ciencias Técnico-Científicas", titulo: "Seguridad de la Información: ciclo de vida. Confidencialidad, integridad y disponibilidad. Sistema de gestión de la Seguridad de la Información. Riesgos y amenazas." },
  { id: 78, bloque: "Ciencias Técnico-Científicas", titulo: "Documentación del vehículo y del conductor. Permisos de conducción. El seguro obligatorio. Inspección técnica de vehículos." },
  { id: 79, bloque: "Ciencias Técnico-Científicas", titulo: "Procedimiento sancionador en materia de tráfico. Potestad sancionadora. Actuación en accidentes de tráfico. Medidas de protección e investigación." },
  { id: 80, bloque: "Ciencias Técnico-Científicas", titulo: "El vehículo prioritario: definición y facultades del conductor. Comportamiento de otros conductores. Conducción en situación de emergencia. Señales de emergencia." },
  { id: 81, bloque: "Ciencias Técnico-Científicas", titulo: "Origen de las armas de fuego. Definición, clasificación y funcionamiento. Cartucho: definición y componentes. Armas prohibidas. Documentación para la tenencia y porte. Balística forense." },
];

// ── BLOQUES ──────────────────────────────────────────────────
export const BLOQUES = [
  "Ciencias Jurídicas",
  "Ciencias Sociales",
  "Ciencias Técnico-Científicas",
];

// ── SISTEMA DE PUNTUACIÓN ────────────────────────────────────
export const SCORING = {
  acierto: 1,
  fallo: -0.5,
  blanco: 0,
};

// ── PERSISTENCIA EN LOCALSTORAGE ─────────────────────────────
const STORAGE_KEY = "oposicion_tracker_v1";

/**
 * Devuelve todos los exámenes guardados.
 * @returns {Array} Lista de exámenes
 */
export function getExamenes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Guarda un nuevo examen.
 * @param {Object} examen - Objeto examen a guardar
 */
export function saveExamen(examen) {
  const examenes = getExamenes();
  examen.id = Date.now(); // ID único basado en timestamp
  examenes.push(examen);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(examenes));
  return examen;
}

/**
 * Elimina un examen por su id.
 * @param {number} id
 */
export function deleteExamen(id) {
  const examenes = getExamenes().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(examenes));
}

/**
 * Actualiza un examen existente por su id.
 * @param {number} id
 * @param {Object} datosActualizados - Objeto examen con los nuevos datos
 */
export function updateExamen(id, datosActualizados) {
  const examenes = getExamenes().map((e) =>
    e.id === id ? { ...datosActualizados, id } : e
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(examenes));
}

/**
 * Devuelve un examen por su id.
 * @param {number} id
 * @returns {Object|null}
 */
export function getExamenById(id) {
  return getExamenes().find((e) => e.id === id) || null;
}

/**
 * Exporta todos los datos como JSON descargable.
 */
export function exportData() {
  const data = JSON.stringify(getExamenes(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `oposicion_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Importa datos desde un JSON exportado previamente.
 * @param {string} jsonString
 */
export function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) throw new Error("Formato inválido");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

/**
 * Borra TODOS los datos. Irreversible.
 */
export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
}