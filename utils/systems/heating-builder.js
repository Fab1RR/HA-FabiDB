// ====================================================================
// HEATING BUILDER - v70 (Physischer Heizungsraum)
// ====================================================================

export function createHeatingSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Heizungsraum",
    secondary: "WP • Solar • Kamin • Tank",
    icon: "mdi:water-boiler",
    icon_color: "deep-orange",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "heizraum" }
  };
}

function createDynamicHeatingSection(title, icon, label) {
  return {
    type: "grid",
    cards: [
      {
        type: "heading",
        heading: title,
        heading_style: "title",
        icon: icon,
        tap_action: { 
          action: label === "wp" ? "navigate" : "none", 
          navigation_path: label === "wp" ? "wp-cockpit" : "" 
        }
      },
      {
        type: "custom:auto-entities",
        show_empty: false,
        unique: true,
        grid_options: { columns: 12 }, 
        card: { type: "grid", columns: 2, square: false }, 
        card_param: "cards",
        sort: { method: "name" },
        filter: {
          include: [
            {
              label: label,
              domain: "sensor",
              attributes: { unit_of_measurement: "°C" },
              options: { type: "sensor", graph: "line", detail: 2, hours_to_show: 2 }
            },
            {
              label: label,
              domain: "sensor",
              attributes: { device_class: "temperature" }, 
              options: { type: "sensor", graph: "line", detail: 2, hours_to_show: 2 }
            }
          ],
          exclude: [{ label: "no_dboard" }, { label: "no-dboard" }]
        }
      },
      {
        type: "custom:auto-entities",
        show_empty: false,
        unique: true,
        card: { type: "vertical-stack" }, 
        card_param: "cards",
        sort: { method: "domain" },
        filter: {
          include: [
            {
              label: label,
              domain: "climate",
              options: { type: "custom:bubble-card", card_type: "climate", scrolling_effect: true, state_color: true, show_icon: true, show_name: true }
            },
            {
              label: label,
              options: { type: "tile", features_position: "bottom" }
            }
          ],
          exclude: [
            { domain: "sensor", attributes: { unit_of_measurement: "°C" } },
            { domain: "sensor", attributes: { device_class: "temperature" } }, 
            { label: "no_dboard" }, 
            { label: "no-dboard" }
          ]
        }
      }
    ]
  };
}

export function createHeatingView() {
  return {
    type: "sections",
    max_columns: 4,
    icon: "mdi:heating-coil",
    path: "heizraum",
    title: "Heizraum",
    subview: true,
    sections: [
      createDynamicHeatingSection("Wärmepumpe", "mdi:heat-pump", "wp"),
      createDynamicHeatingSection("Warmwasserspeicher", "mdi:diving-scuba-tank-multiple", "tank"),
      createDynamicHeatingSection("Wasserführender Kamin", "mdi:fireplace", "kamin"),
      createDynamicHeatingSection("Solarthermie", "mdi:solar-power", "thermie")
    ]
  };
}