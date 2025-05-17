# 🐉 Pokedex App

 Esta aplicación es una Pokedex construida con Vue 3, utilizando una arquitectura modular, un enfoque escalable y buenas prácticas.

 ## Enfoque y decisiones de arquitectura
¿Conocen la importancia de afilar el hacha antes de cortar el árbol?
Eso fue lo que hice en los primeros pasos del proyecto. Antes de escribir una sola línea de código, dediqué tiempo a entender el diseño, organizar la estructura y planificar los componentes:

1. Cloné y bloqueé las vistas del diseño en Figma, asegurándome de comprender las vistas y flujos.

2. Dividí el diseño en layouts, vistas, componentes y subcomponentes, respetando el principio de Single Responsibility.

Este análisis previo me permitió construir una base sólida, preparada para manejar un alto volumen de datos y con potencial de escalar modularmente si el sistema crece.

## Tecnologías y herramientas utilizadas

| Tecnología                         | Propósito                             |
|:------------------------------------|:----------------------------------------|
| [Vue 3](https://vuejs.org/)        | Framework principal                    |
| [Vite](https://vitejs.dev/)        | Bundler rápido y moderno               |
| [Pinia](https://pinia.vuejs.org/)  | Manejo de estado global                |
| [Vue Router 4](https://router.vuejs.org/) | Enrutamiento por vistas       |
| [Axios](https://axios-http.com/)   | Cliente HTTP para consumo de APIs      |

## Detalles técnicos y aprendizajes

* Configuré el alias @ en Vite para que apunte a /src, facilitando los imports.
* Separé rutas globales y rutas por módulo para mantener independencia entre contextos.
* Implementé el layout base del módulo pokeapi y la vista inicial Welcome.vue.
* Apliqué el enfoque Mobile First para asegurar adaptabilidad desde el diseño.
* Durante el desarrollo del componente Button, me topé con un detalle curioso: al emitir un evento click, este se duplicaba debido a un mal manejo del binding. Lo solucioné eliminando el emit innecesario y utilizando el evento nativo.
* Aunque antes usaba Vuex, esta fue mi primera experiencia con Pinia, y me sorprendió por su simplicidad y enfoque modular.

### Estructura de directorios

```bash
src/
├── api/                # Abstracciones para consumo de APIs
├── assets/             # Recursos estáticos (íconos, imágenes)
├── components/         # Componentes reutilizables globales
├── composables/        # Composición: lógica reutilizable
├── router/             # Rutas principales del proyecto
├── store/              # Pinia stores globales
├── styles/             # Estilos globales
└── modules/
    └── pokeapi/
        ├── components/ # Componentes específicos del módulo
        ├── layouts/    # Layouts del módulo
        ├── views/      # Vistas del módulo
        ├── router/     # Rutas específicas del módulo
        └── store/      # Store del módulo (Pinia scoped)
```

## Variables de entorno

Se utilizo un archivo `.env` que contiene variables que permiten adaptar el entorno:

```env
VUE_APP_TITLE=Pokedex
NODE_ENV=development
VUE_APP_API_URL=https://pokeapi.co/api/v2
```

---

## Detalles técnicos y aprendizajes

- Configuré el alias `@` en Vite para que apunte a `/src`, facilitando los imports.
- Separé rutas globales y rutas por módulo para mantener independencia entre contextos.
- Implementé el layout base del módulo `pokeapi` y la vista inicial `Welcome.vue`.
- Apliqué el enfoque **Mobile First** para asegurar adaptabilidad desde el diseño.
- Durante el desarrollo del componente `Button`, me topé con un detalle curioso: al emitir un evento `click`, este se duplicaba debido a un mal manejo del binding. Lo solucioné eliminando el `emit` innecesario y utilizando el evento nativo.
- Aunque antes usaba **Vuex**, esta fue mi primera experiencia con **Pinia**, y me sorprendió por su simplicidad y enfoque modular.

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
```

---

## Posibles mejoras

- Añadir pruebas unitarias con Vitest o Jest.
- Añadir paginación y caching para mejorar el manejo de datos a gran escala.
- Usar lazy loading en imágenes y vistas.

---

## Gracias

Gracias por revisar este README. Espero que refleje no solo cómo estructuré el proyecto, sino también **cómo pienso al desarrollar soluciones que escalen y sean fáciles de mantener**, incluso si el alcance inicial es limitado.
