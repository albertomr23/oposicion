# 📋 Guía de instalación — Oposición Tracker CNP
### Para Paula Rodríguez · Escala Ejecutiva

---

## ¿Qué es esto?

Una aplicación web que funciona **en tu propio ordenador** (sin internet, sin registros, sin nada).  
Guarda todos tus exámenes, calcula tus notas automáticamente y te muestra en qué temas tienes que mejorar.

Solo tienes que hacer la instalación **una sola vez**. Después, para usarla, son dos clics.

---

## PASO 1 — Instalar Visual Studio Code

Visual Studio Code es el programa que usarás para abrir la aplicación.

1. Abre el navegador y ve a: **https://code.visualstudio.com**
2. Haz clic en el botón azul grande que dice **"Download for Windows"**
3. Cuando termine de descargar, abre el archivo `.exe` que aparece abajo del navegador
4. Sigue el asistente de instalación haciendo clic en **"Siguiente"** en todo hasta llegar a **"Instalar"**
5. Al final haz clic en **"Finalizar"**

> ✅ Ya tienes Visual Studio Code instalado.

---

## PASO 2 — Instalar la extensión Live Server

Esta extensión es la que hace que la aplicación se abra en el navegador.

1. Abre **Visual Studio Code** (el icono azul que apareció en tu escritorio)
2. En el panel de la izquierda, busca el icono que parece **cuatro cuadraditos** (Extensions) y haz clic
3. En el buscador que aparece arriba escribe: `Live Server`
4. El primero que aparece se llama **"Live Server"** de *Ritwick Dey* — haz clic en **"Install"**
5. Espera unos segundos a que se instale

> ✅ Ya tienes Live Server instalado.

---

## PASO 3 — Copiar la carpeta de la aplicación

1. Copia la carpeta **`oposicion-tracker`** (la que te han enviado) a cualquier sitio de tu ordenador.  
   Por ejemplo, puedes meterla dentro de **Documentos** o directamente en el **Escritorio**.

> ⚠️ No cambies el nombre de la carpeta ni muevas los archivos que hay dentro.

---

## PASO 4 — Abrir la aplicación

Cada vez que quieras usar la aplicación, sigue estos pasos:

1. Abre **Visual Studio Code**
2. Ve al menú de arriba: **Archivo → Abrir carpeta...**  
   *(o en inglés: File → Open Folder...)*
3. Busca la carpeta `oposicion-tracker` que copiaste antes y haz clic en **"Seleccionar carpeta"**
4. En el panel de la izquierda verás los archivos de la app. Haz clic en **`index.html`**
5. En la barra azul de abajo del todo verás el texto **"Go Live"** — haz clic en él
6. Se abrirá automáticamente tu navegador con la aplicación

> 🎉 ¡Listo! Ya puedes empezar a usar la aplicación.

---

## Uso habitual (a partir de la segunda vez)

Una vez instalado todo, para abrir la aplicación solo necesitas:

```
1. Abrir Visual Studio Code
2. La carpeta ya estará recordada — haz clic en index.html
3. Clic en "Go Live" (barra azul de abajo)
```

---

## ¿Cómo registro un examen?

1. En el menú de la izquierda de la app, haz clic en **➕ Registrar examen**
2. Escribe el nombre del examen (ej: *Simulacro 3 - Academia*)
3. Selecciona la fecha y el tipo
4. En el buscador de temas escribe el número o el nombre del tema (ej: *Tema 5* o *Constitución*)
5. Introduce cuántas preguntas tenía ese tema, cuántas acertaste y cuántas fallaste
6. Añade todos los temas que quieras
7. Haz clic en **Guardar examen**

Los blancos se calculan solos automáticamente.

---

## ¿Dónde se guardan mis datos?

Los datos se guardan **en tu propio navegador**, en tu ordenador.  
No se suben a ningún servidor ni se comparten con nadie.

> ⚠️ Si borras los datos del navegador (historial, caché, cookies), **perderías los exámenes guardados**.  
> Para evitarlo, usa el botón **⬇️ Exportar datos** de vez en cuando — te descarga un archivo de copia de seguridad.

---

## Solución de problemas frecuentes

**La aplicación no se abre o sale en blanco**
- Asegúrate de haber hecho clic en `index.html` antes de pulsar "Go Live"
- Comprueba que la carpeta `oposicion-tracker` contiene las subcarpetas `css` y `js`

**No aparece el botón "Go Live" abajo del todo**
- La extensión Live Server no está instalada — repite el Paso 2

**Los datos han desaparecido**
- Es posible que hayas borrado los datos del navegador. Comprueba si tienes un archivo de exportación (`.json`) guardado y contacta con quien te configuró la app para restaurarlo.

**La pantalla de bienvenida se queda fija**
- Espera 4 segundos, se cierra sola. Si no, recarga la página con **F5**.

---

## Resumen de las secciones de la app

| Sección | Para qué sirve |
|---|---|
| 📊 **Dashboard** | Resumen general: nota media, tendencia, temas más flojos |
| ➕ **Registrar examen** | Añadir un examen nuevo con resultados por tema |
| 📈 **Evolución** | Ver cómo han ido tus notas a lo largo del tiempo |
| 📚 **Por temas** | Ver el % de aciertos/fallos de cada uno de los 81 temas |
| 🚨 **Ranking urgencia** | Los temas que más necesitas repasar, ordenados por prioridad |

---

*Cualquier duda, pregunta a quien te preparó esto* 😊
