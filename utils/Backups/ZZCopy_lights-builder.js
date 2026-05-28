export function createLightsSummaryCard() {
  // Zählt Lichter "on", zieht aber alle ab, die das Label no_dboard oder no-dboard haben
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
  // ... (Der restliche obere Teil deines Popups bleibt gleich)
  return {
    type: "vertical-stack",
    cards: [
      { type: "custom:bubble-card", card_type: "pop-up", hash: "#lichter-popup", name: "Lichtersteuerung", icon: "mdi:lightbulb-group" },
      { type: "markdown", content: "## 🟢 An" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [{ domain: "light", state: "on", options: { type: "tile", features_position: "inline", features: [{ type: "light-brightness" }] } }],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }] // <-- HIER ERGÄNZT
        }
      },
      { type: "markdown", content: "## ⚫ Aus" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [{ domain: "light", state: "off", options: { type: "tile", features_position: "inline", features: [{ type: "light-brightness" }] } }],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }] // <-- HIER ERGÄNZT
        }
      }
    ]
  };
}