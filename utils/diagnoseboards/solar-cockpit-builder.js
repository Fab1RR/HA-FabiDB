// ====================================================================
// SOLAR COCKPIT BUILDER (Solarthermie)
// ====================================================================

export function createSolarCockpitSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Solarthermie",
    secondary: "Ertrag & Vorlauf",
    icon: "mdi:solar-power",
    icon_color: "amber",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "solar-cockpit" }
  };
}

export function createSolarCockpitView() {
  return {
    type: "sections",
    max_columns: 4,
    icon: "mdi:solar-power",
    path: "solar-cockpit",
    title: "Solar Cockpit",
    subview: true,
    sections: [
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Solar Ertrag & Spreizung", heading_style: "title", icon: "mdi:white-balance-sunny" },
          // Der gemeinsame Graph für die Sonne!
          {
            type: "history-graph",
            title: "Solar Vorlauf & Rücklauf",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.shelly_frischwasserstation_temperature_3", name: "Vorlauf" },
              { entity: "sensor.shelly_frischwasserstation_temperature_2", name: "Rücklauf" }
            ]
          },
          // Die Kacheln für die aktuellen Werte
          { type: "tile", entity: "sensor.shelly_frischwasserstation_temperature_3", name: "Solar Vorlauf", icon: "mdi:arrow-down-bold", color: "deep-orange" },
          { type: "tile", entity: "sensor.shelly_frischwasserstation_temperature_2", name: "Solar Rücklauf", icon: "mdi:arrow-up-bold", color: "blue" }
        ]
      }
    ]
  };
}