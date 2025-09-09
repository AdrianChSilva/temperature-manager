// Test data constants
export const TEST_DATA = {
  GROUPS: {
    DEFAULT_FIRST: "Planta Baja",
    TEST_GROUP: "Grupo Test",
    CANCELLED_GROUP: "Grupo Cancelado",
  },
  ZONES: {
    EXPECTED_COUNT_FIRST_GROUP: 2, // Salón y Dormitorio
  },
  UI: {
    BUTTONS: {
      NEW_GROUP: "+ Nuevo grupo",
      CREATE: "Crear",
      CANCEL: "Cancelar",
      ON: "ON",
      OFF: "OFF",
    },
    TITLES: {
      APP_TITLE: "Temperature Manager",
      RENAME: "Renombrar",
      DELETE: "Eliminar",
      EXPAND: "Expandir",
      COLLAPSE: "Contraer",
    },
    ARIA_LABELS: {
      GROUP_NAME_INPUT: "Ej: Cocina",
    },
    SELECTORS: {
      GROUP_HEADER_TITLE: ".group-header__title",
      GROUP_HEADER_TOGGLE: "button.group-header__toggle",
      ZONES_GRID: ".zones-grid",
      ZONE_CARD: "article.zone-card",
      ZONE_POWER_BUTTON: "button.zc-power",
      CHIP_GHOST: "button.chip--ghost",
      GROUP_HEADER_ACTIONS: ".group-header__actions",
    },
    STATES: {
      EXPANDED_ICON: "▾",
      COLLAPSED_ICON: "▸",
      STATE_OFF_CLASS: /state-off/,
    },
  },
};

// Test configuration
export const TEST_CONFIG = {
  TIMEOUTS: {
    DEFAULT: 5000,
    NAVIGATION: 10000,
  },
  VIEWPORT: {
    DESKTOP: { width: 1920, height: 1080 },
    MOBILE: { width: 639, height: 667 },
  },
};
