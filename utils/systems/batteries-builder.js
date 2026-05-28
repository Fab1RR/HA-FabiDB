// ====================================================================
// BATTERIES BUILDER
// ====================================================================

export function createBatteriesSummaryCard() {
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set low = states.sensor | rejectattr('entity_id', 'in', ignored) | selectattr('attributes.device_class', 'defined') | selectattr('attributes.device_class', 'eq', 'battery') | rejectattr('state', 'in', ['unavailable', 'unknown']) | map(attribute='state') | map('float', -1) | select('lt', 20) | select('ge', 0) | list | count %}";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Batterien",
    secondary: countTemplate + "{% if low > 0 %}{{ low }} kritisch{% else %}Alle OK{% endif %}",
    icon: countTemplate + "{% if low > 0 %}mdi:battery-alert{% else %}mdi:battery-check{% endif %}",
    icon_color: countTemplate + "{% if low > 0 %}red{% else %}green{% endif %}",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "#batteries-popup" }
  };
}

export function createBatteriesPopup() {
  return {
    type: "custom:bubble-card",
    card_type: "pop-up",
    hash: "#batteries-popup",
    name: "Batterie-Status",
    icon: "mdi:battery-charging",
    cards: [
      { type: "markdown", content: "## 🪫 Kritisch (< 20%)" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "state", numeric: true },
        filter: {
          include: [{ domain: "sensor", attributes: { device_class: "battery" }, options: { type: "tile" } }],
          exclude: [{ state: ">= 20" }, { state: "unavailable" }, { state: "unknown" }, { label: "no_dboard" }, { label: "no-dboard" }]
        }
      },
      { type: "markdown", content: "## 🔋 OK (>= 20%)" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "state", numeric: true },
        filter: {
          include: [{ domain: "sensor", attributes: { device_class: "battery" }, options: { type: "tile" } }],
          exclude: [{ state: "< 20" }, { state: "unavailable" }, { state: "unknown" }, { label: "no_dboard" }, { label: "no-dboard" }]
        }
      }
    ]
  };
}