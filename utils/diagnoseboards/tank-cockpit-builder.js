// ====================================================================
// TANK COCKPIT BUILDER (Pufferspeicher, Kamin & Solarthermie)
// ====================================================================

export function createTankCockpitSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Pufferspeicher",
    secondary: "Speicher, Solar & Kamin",
    icon: "mdi:water-boiler",
    icon_color: "cyan",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "tank-cockpit" }
  };
}

export function createTankCockpitView() {
  return {
    type: "sections",
    max_columns: 4,
    icon: "mdi:water-boiler",
    path: "tank-cockpit",
    title: "Tank Cockpit",
    subview: true,
    sections: [
      // --- 1. DER GROSSE GESAMT-GRAPH ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Gesamtsystem: Temperaturen", heading_style: "title", icon: "mdi:chart-timeline-variant" },
          {
            type: "custom:apexcharts-card",
            graph_span: "12h",
            header: { show: true, title: "Speicher, Kamin & Solarthermie: 12Std View", show_states: false },
            all_series_config: { type: "line", stroke_width: 2, curve: "smooth" },
            series: [
              { entity: "sensor.temperatur_zockiraum_temperature", name: "Tank Oben", color: "#ff5252" }, // Rot
              { entity: "sensor.tank_unten_temperature", name: "Tank Unten", color: "#2196f3" }, // Blau
              { entity: "sensor.shelly_frischwasserstation_temperature", name: "Kamin", color: "#ff9800" }, // Orange
              { entity: "sensor.shelly_frischwasserstation_temperature_3", name: "Solar VL", color: "#ffeb3b" }, // Gelb
              // Ich habe für den Solar Rücklauf ein "Hellblau/Cyan" (#00bcd4) genommen, 
              // damit du es besser vom "Tank Unten" Blau unterscheiden kannst!
              { entity: "sensor.shelly_frischwasserstation_temperature_2", name: "Solar RL", color: "#fcdd00" } 
            ]
          },
          
          {
            type: "custom:apexcharts-card",
            graph_span: "2h",
            header: { show: true, title: "Speicher, Kamin & Solarthermie: 2Std View", show_states: false },
            all_series_config: { type: "line", stroke_width: 2, curve: "smooth" },
            series: [
              { entity: "sensor.temperatur_zockiraum_temperature", name: "Tank Oben", color: "#ff5252" }, // Rot
              { entity: "sensor.tank_unten_temperature", name: "Tank Unten", color: "#2196f3" }, // Blau
              { entity: "sensor.shelly_frischwasserstation_temperature", name: "Kamin", color: "#ff9800" }, // Orange
              { entity: "sensor.shelly_frischwasserstation_temperature_3", name: "Solar VL", color: "#ffeb3b" }, // Gelb
              // Ich habe für den Solar Rücklauf ein "Hellblau/Cyan" (#00bcd4) genommen, 
              // damit du es besser vom "Tank Unten" Blau unterscheiden kannst!
              { entity: "sensor.shelly_frischwasserstation_temperature_2", name: "Solar RL", color: "#fcdd00" } 
            ]
          }
        ]
      },

      
      // --- 3. KOMPAKTE TACHOS (3-Spalten-Raster für kleine Größe) ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Aktuelle Werte", heading_style: "title", icon: "mdi:gauge" },
          {
            type: "grid",
            columns: 3, // <-- DAS macht die Tachos schön klein und kompakt!
            square: false,
            cards: [
              { type: "gauge", entity: "sensor.temperatur_zockiraum_temperature", name: "Tank Oben", min: 20, max: 80, severity: { green: 45, yellow: 40, red: 20 }, needle: true },
              { type: "gauge", entity: "sensor.shelly_frischwasserstation_temperature", name: "Kamin", min: 20, max: 80, severity: { green: 60, yellow: 45, red: 20 }, needle: true },
              { type: "gauge", entity: "sensor.shelly_frischwasserstation_temperature_3", name: "Solar VL", min: 20, max: 100, severity: { green: 60, yellow: 40, red: 20 }, needle: true },
              
              { type: "gauge", entity: "sensor.tank_unten_temperature", name: "Tank Unten", min: 20, max: 80, severity: { green: 30, yellow: 25, red: 20 }, needle: true },
              { type: "gauge", entity: "sensor.shelly_frischwasserstation_temperature_2", name: "Solar RL", min: 20, max: 100, severity: { green: 40, yellow: 30, red: 20 }, needle: true }
            ]
          }
        ]
      },

      // --- 3. PUMPEN & STEUERUNG ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Pumpen & Sensoren", heading_style: "title", icon: "mdi:pump" },
          { type: "tile", entity: "switch.shellyplus1pm_e465b8942058_switch_0", name: "Frischwasserstation", icon: "mdi:thermometer-water", features_position: "bottom" },
          { type: "tile", entity: "sensor.shellyplus1pm_e465b8942058_switch_0_power", name: "FriWa Verbrauch", icon: "mdi:flash", color: "amber" },
          { type: "tile", entity: "switch.spulungspumpe", name: "Spülungspumpe", icon: "mdi:spray-bottle" },
          { type: "tile", entity: "binary_sensor.wassersensor_heizraum_occupancy", name: "Wassersensor Heizraum", color: "red" }
        ]
      }
    ]
  };
}