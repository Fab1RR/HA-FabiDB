// ====================================================================
// COVERS BUILDER
// ====================================================================

export function createCoversSummaryCard() {
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set offen = states.cover | rejectattr('entity_id', 'in', ignored) | selectattr('state', 'eq', 'open') | list | count %}";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Rollos",
    secondary: countTemplate + "{{ offen }} offen",
    icon: "mdi:window-shutter",
    icon_color: countTemplate + "{% if offen > 0 %}purple{% else %}disabled{% endif %}",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "#covers-popup" }
  };
}

export function createCoversPopup() {
  return {
    type: "vertical-stack",
    cards: [
      { type: "custom:bubble-card", card_type: "pop-up", hash: "#covers-popup", name: "Rollo-Steuerung", icon: "mdi:window-shutter-open" },
      { type: "markdown", content: "## 🪟 Offen" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [{ domain: "cover", state: "open", options: { type: "tile", features_position: "inline", features: [{ type: "cover-open-close" }] } }],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }, { state: "unknown" }]
        }
      },
      { type: "markdown", content: "## 🔒 Geschlossen" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [{ domain: "cover", state: "closed", options: { type: "tile", features_position: "inline", features: [{ type: "cover-open-close" }] } }],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }, { state: "unknown" }]
        }
      }
    ]
  };
}