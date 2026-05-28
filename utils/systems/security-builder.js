// ====================================================================
// SECURITY BUILDER
// ====================================================================

export function createSecuritySummaryCard() {
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set open = states.binary_sensor | rejectattr('entity_id', 'in', ignored) | selectattr('attributes.device_class', 'defined') | selectattr('attributes.device_class', 'in', ['door', 'window', 'garage_door']) | selectattr('state', 'eq', 'on') | list | count %}";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Sicherheit",
    secondary: countTemplate + "{% if open > 0 %}{{ open }} unsicher{% else %}Alles sicher{% endif %}",
    icon: countTemplate + "{% if open > 0 %}mdi:shield-alert{% else %}mdi:shield-check{% endif %}",
    icon_color: countTemplate + "{% if open > 0 %}red{% else %}green{% endif %}",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "#security-popup" }
  };
}

export function createSecurityPopup() {
  return {
    type: "custom:bubble-card",
    card_type: "pop-up",
    hash: "#security-popup",
    name: "Sicherheits-Status",
    icon: "mdi:shield-home",
    cards: [
      { type: "markdown", content: "## ⚠️ Unsicher (Offen)" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "last_changed", reverse: true },
        filter: {
          include: [
            { domain: "binary_sensor", attributes: { device_class: "window" }, state: "on", options: { type: "tile" } },
            { domain: "binary_sensor", attributes: { device_class: "door" }, state: "on", options: { type: "tile" } },
            { domain: "binary_sensor", attributes: { device_class: "garage_door" }, state: "on", options: { type: "tile" } }
          ],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }]
        }
      },
      { type: "markdown", content: "## 🛡️ Sicher (Geschlossen)" },
      {
        type: "custom:auto-entities", show_empty: false, card: { type: "vertical-stack" }, card_param: "cards", sort: { method: "name" },
        filter: {
          include: [
            { domain: "binary_sensor", attributes: { device_class: "window" }, state: "off", options: { type: "tile" } },
            { domain: "binary_sensor", attributes: { device_class: "door" }, state: "off", options: { type: "tile" } },
            { domain: "binary_sensor", attributes: { device_class: "garage_door" }, state: "off", options: { type: "tile" } }
          ],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }]
        }
      }
    ]
  };
}