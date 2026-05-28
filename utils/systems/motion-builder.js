// ====================================================================
// MOTION BUILDER (Bewegungsmelder & Präsenz) - v53
// ====================================================================

export function createMotionSummaryCard() {
  // Zählt alle aktiven Bewegungs-, Präsenz- und Belegungssensoren (ignoriert no-dboard)
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set active = states.binary_sensor | rejectattr('entity_id', 'in', ignored) | selectattr('attributes.device_class', 'defined') | selectattr('attributes.device_class', 'in', ['motion', 'occupancy', 'presence']) | selectattr('state', 'eq', 'on') | list | count %}";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Bewegungen",
    secondary: countTemplate + "{% if active > 0 %}{{ active }} erkannt{% else %}Alles ruhig{% endif %}",
    icon: "mdi:motion-sensor",
    icon_color: countTemplate + "{% if active > 0 %}amber{% else %}disabled{% endif %}",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "motion" }
  };
}

export function createMotionView() {
  return {
    type: "sections",
    max_columns: 2, 
    icon: "mdi:motion-sensor",
    path: "motion",
    title: "Bewegungsmelder",
    subview: true,
    sections: [
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Bewegung & Präsenz", heading_style: "title", icon: "mdi:run-fast" },
          {
            type: "custom:auto-entities",
            show_empty: false,
            card: { type: "grid", columns: 2, square: false },
            card_param: "cards",
            // Aktive Bewegungen ('on') werden automatisch ganz oben einsortiert!
            sort: { method: "state", reverse: true }, 
            filter: {
              include: [
                {
                  domain: "binary_sensor",
                  attributes: { device_class: "motion" },
                  options: { type: "tile", state_content: ["state", "last-changed"] }
                },
                {
                  domain: "binary_sensor",
                  attributes: { device_class: "occupancy" },
                  options: { type: "tile", state_content: ["state", "last-changed"] }
                },
                {
                  domain: "binary_sensor",
                  attributes: { device_class: "presence" },
                  options: { type: "tile", state_content: ["state", "last-changed"] }
                }
              ],
              exclude: [
                { state: "unavailable" }, 
                { state: "unknown" }, 
                { label: "no_dboard" }, 
                { label: "no-dboard" }
              ]
            }
          }
        ]
      }
    ]
  };
}