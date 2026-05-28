// ====================================================================
// COVERS BUILDER
// ====================================================================

export function createCoversSummaryCard() {
  // Zählt jetzt alle Rollos, die 'open', 'opening' oder 'closing' sind!
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set offen = states.cover | rejectattr('entity_id', 'in', ignored) | selectattr('state', 'in', ['open', 'opening', 'closing']) | list | count %}";
  
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
  const tileOptions = {
    type: "tile",
    features: [
      { type: "cover-open-close" },
      { type: "cover-position" }
    ]
  };

  return {
    // Bubble Card ist das Haupt-Element
    type: "custom:bubble-card",
    card_type: "pop-up",
    hash: "#covers-popup",
    name: "Rollo-Steuerung",
    icon: "mdi:window-shutter-open",
    cards: [
      { type: "markdown", content: "## 🪟 Offen & in Bewegung" },
      {
        type: "custom:auto-entities", 
        show_empty: false, 
        card: { type: "vertical-stack" }, 
        card_param: "cards", 
        sort: { method: "last_changed", reverse: true },
        filter: {
          include: [
            { domain: "cover", state: "open", options: tileOptions },
            { domain: "cover", state: "opening", options: tileOptions },
            { domain: "cover", state: "closing", options: tileOptions }
          ],
          exclude: [
            { label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }, { state: "unknown" }
          ]
        }
      },
      { type: "markdown", content: "## 🔒 Geschlossen" },
      {
        type: "custom:auto-entities", 
        show_empty: false, 
        card: { type: "vertical-stack" }, 
        card_param: "cards", 
        sort: { method: "last_changed", reverse: true },
        filter: {
          include: [
            { domain: "cover", state: "closed", options: tileOptions }
          ],
          exclude: [
            { label: "no_dboard" }, { label: "no-dboard" }, { state: "unavailable" }, { state: "unknown" }
          ]
        }
      }
    ]
  };
}