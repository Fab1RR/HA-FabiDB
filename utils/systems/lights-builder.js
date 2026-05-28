// ====================================================================
// LIGHTS BUILDER
// ====================================================================

export function createLightsSummaryCard() {
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set an = states.light | rejectattr('entity_id', 'in', ignored) | selectattr('state', 'eq', 'on') | list | count %}";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Lichter",
    secondary: countTemplate + "{{ an }} an",
    icon: "mdi:lightbulb-multiple",
    icon_color: countTemplate + "{% if an > 0 %}amber{% else %}disabled{% endif %}",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "#lichter-popup" }
  };
}

export function createLightsPopup() {
  return {
    // Bubble Card ist jetzt das Haupt-Element
    type: "custom:bubble-card",
    card_type: "pop-up",
    hash: "#lichter-popup",
    name: "Lichtersteuerung",
    icon: "mdi:lightbulb-group",
    cards: [
      {
        type: "custom:mushroom-template-card",
        primary: "💡 🟢 An",
        secondary: "Tippen: Alle ausschalten",
        icon: "mdi:power",
        icon_color: "red",
        layout: "horizontal",
        tap_action: {
          action: "call-service",
          service: "light.turn_off",
          target: { entity_id: "all" }
        }
      },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [{ 
            domain: "light", state: "on", 
            options: { type: "tile", state_content: ["state", "last-changed"], features_position: "inline", features: [{ type: "light-brightness" }] } 
          }],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }, { state: "unknown" }]
        }
      },
      { type: "markdown", content: "## 💡 ⚫ Aus" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [{ 
            domain: "light", state: "off", 
            options: { type: "tile", state_content: ["state", "last-changed"], features_position: "inline", features: [{ type: "light-brightness" }] } 
          }],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }, { state: "unknown" }]
        }
      }
    ]
  };
}