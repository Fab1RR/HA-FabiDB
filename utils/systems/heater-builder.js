// ====================================================================
// HEATER BUILDER - v70 (Raum-Thermostate & Smart Hub)
// ====================================================================

export function createHeaterSummaryCard() {
  const countTemplate = "{% set active = states.climate | selectattr('state', 'in', ['heat', 'auto']) | list | count %}";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Heizung",
    secondary: countTemplate + "{% if active > 0 %}{{ active }} aktiv{% else %}Alle aus{% endif %}",
    icon: "mdi:radiator",
    icon_color: countTemplate + "{% if active > 0 %}deep-orange{% else %}disabled{% endif %}",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "heater" }
  };
}

export function createHeaterView() {
  return {
    type: "sections",
    max_columns: 2, 
    icon: "mdi:radiator",
    path: "heater",
    title: "Heizungssteuerung",
    subview: true,
    sections: [
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Alle Thermostate", heading_style: "title", icon: "mdi:home-thermometer" },
          {
            type: "custom:auto-entities",
            show_empty: false,
            card: { type: "grid", columns: 1, square: false },
            card_param: "cards",
            sort: { method: "friendly_name" }, 
            filter: {
              include: [
                {
                  domain: "climate",
                  options: {
                    type: "tile",
                    icon: "mdi:radiator",
                    color: "deep-orange",
                    features: [
                      { type: "target-temperature" },
                      { type: "climate-hvac-modes", hvac_modes: ["heat", "auto", "off"] }
                    ]
                  }
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
      },
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Smart Hub & System", heading_style: "title", icon: "mdi:hubline" },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "binary_sensor.smart_hub_heizung_cloud_connection", name: "Cloud", icon: "mdi:cloud-check", color: "blue" },
              { type: "tile", entity: "binary_sensor.smart_hub_heizung_overheated", name: "Überhitzung", icon: "mdi:thermometer-alert", color: "red" },
              { type: "tile", entity: "switch.smart_hub_heizung_led", name: "LED", icon: "mdi:led-on", color: "amber" },
              { type: "tile", entity: "sensor.smart_hub_heizung_signal_level", name: "WLAN", icon: "mdi:wifi", color: "cyan" }
            ]
          }
        ]
      }
    ]
  };
}