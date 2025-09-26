# Temperature Manager

Aplicación web construida con React y javascript vanilla que permite gestionar temperaturas de distintas zonas.
Puedes compilar la aplicación y correrla en local o puedes acceder desde aqui https://adrianchsilva.github.io/temperature-manager/

---

## Tecnologías utilizadas

- [Vite](https://vitejs.dev/) - Build tool
- [pnpm](https://pnpm.io/es/) - Gestor de dependencias
- [React](https://reactjs.org/)
- [JavasSript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [Zustand](https://zustand-demo.pmnd.rs/) — Gestión de estado ligera y persistente
- [mock-socket](https://www.npmjs.com/package/mock-socket) — Simulación de WebSockets
- [Vitest](https://vitest.dev/) - Unit testing
- [Playwright](https://playwright.dev/)
- Eslint + Prettier

## Funcionalidades

- Crear Zonas
- Editar Zonas
- Crear Grupos
- Editar Grupos
- Simulacion de temperaturas
- Encendido y apagado de zonas
- Encendido y apagado de grupos

## Arquitectura del proyecto

El proyecto sigue la arquitectura **Feature-Sliced Design (FSD)**, que organiza el código, de manera muy intuitiva, en torno a funcionalidades en lugar de componentes. He tomado esta arquitectura ya que considero que se puede usar tanto en aplicaciones pequeñas como para proyectos que van creciendo y escalando con el tiempo. Además, ofrece una [guía](https://feature-sliced.design/docs/get-started/overview) y ejemplos que lo hacen bastante didáctico y fácil de implementar

## Cómo ejecutar el proyecto

### Requisitos Previos

- **Node.js** >= 20.19.0
- **pnpm** >= 7.0.0

```bash
# Clona el repositorio
git clone https://github.com/AdrianChSilva/temperature-manager.git
cd temperature-manager

# Instala dependencias
pnpm install

# Haz el build
pnpm build

# Ejecuta en entorno local
pnpm dev
```

## Cómo ejecutar los tests

```bash
# Si quieres ejecutar los tests:
pnpm test

# Para ver el coverage
pnpm test:coverage

# Para ejeutar tests E2E:
pnpm test:e2e

# Para ejeutar todos los tests:
pnpm test:ci
```

---

Espero que os guste ❤️
