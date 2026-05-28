// ====================================================================
// WP COCKPIT BUILDER (Das Weishaupt Kontrollzentrum) - v54
// ====================================================================

export function createWpCockpitSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Wärmepumpe Cockpit",
    secondary: "Diagnose, Effizienz & Steuerung",
    icon: "mdi:heat-pump",
    icon_color: "blue",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "wp-cockpit" }
  };
}

export function createWpCockpitView() {
  return {
    type: "sections",
    max_columns: 4,
    icon: "mdi:heat-pump-outline",
    path: "wp-cockpit",
    title: "WP Cockpit",
    subview: true,
    sections: [
      // --- 1. EFFIZIENZ & ENERGIE ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Effizienz & Arbeitszahl", heading_style: "title", icon: "mdi:leaf-circle" },
          { type: "gauge", entity: "sensor.wp_arbeitszahl_cop_2", name: "Arbeitszahl (COP)", min: 0, max: 6, severity: { green: 4.0, yellow: 3.0, red: 0 }, needle: true },
          
          // --- STROMVERBRAUCH ---
          { type: "heading", heading: "⚡ Stromverbrauch", heading_style: "subtitle" },
          {
            type: "grid",
            columns: 4,
            square: false,
            cards: [
              { type: "tile", entity: "sensor.wp_stromverbrauch_berechnet", name: "Gesamt", icon: "mdi:sigma", color: "amber", vertical: true },
              { type: "tile", entity: "sensor.wp_strom_heute", name: "Heute", icon: "mdi:calendar-today", color: "amber", vertical: true },
              { type: "tile", entity: "sensor.wp_strom_woche", name: "Woche", icon: "mdi:calendar-week", color: "amber", vertical: true },
              { type: "tile", entity: "sensor.wp_strom_monat", name: "Monat", icon: "mdi:calendar-month", color: "amber", vertical: true }
            ]
          },

          // --- ERZEUGTE WÄRME ---
          { type: "heading", heading: "🔥 Erzeugte Wärme", heading_style: "subtitle" },
          {
            type: "grid",
            columns: 4,
            square: false,
            cards: [
              { type: "tile", entity: "sensor.wp_warme_gesamt", name: "Gesamt", icon: "mdi:sigma", color: "deep-orange", vertical: true },
              { type: "tile", entity: "sensor.wp_warme_heute", name: "Heute", icon: "mdi:calendar-today", color: "deep-orange", vertical: true },
              { type: "tile", entity: "sensor.wp_warme_woche", name: "Woche", icon: "mdi:calendar-week", color: "deep-orange", vertical: true },
              { type: "tile", entity: "sensor.wp_warme_monat", name: "Monat", icon: "mdi:calendar-month", color: "deep-orange", vertical: true }
            ]
          },

          // --- UMWELTENERGIE ---
          { type: "heading", heading: "🍃 Umweltenergie", heading_style: "subtitle" },
          {
            type: "grid",
            columns: 4,
            square: false,
            cards: [
              { type: "tile", entity: "sensor.wp_energy_umwelt_total", name: "Gesamt", icon: "mdi:sigma", color: "green", vertical: true },
              { type: "tile", entity: "sensor.wp_umwelt_heute", name: "Heute", icon: "mdi:calendar-today", color: "green", vertical: true },
              { type: "tile", entity: "sensor.wp_umwelt_woche", name: "Woche", icon: "mdi:calendar-week", color: "green", vertical: true },
              { type: "tile", entity: "sensor.wp_umwelt_monat", name: "Monat", icon: "mdi:calendar-month", color: "green", vertical: true }
            ]
          }
        ]
      },
     // --- 2. TEMPERATUREN & SPREIZUNG ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Temperaturverlauf", heading_style: "title", icon: "mdi:chart-timeline-variant" },
          {
            type: "history-graph",
            title: "Heizkurve & Spreizung",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.wp_vorlauf_temperatur", name: "Vorlauf" },
              { entity: "sensor.wp_rucklauf_temperatur", name: "Rücklauf" }
            ]
          },
          {
            type: "history-graph",
            title: "Außen & Warmwasser",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.wp_warmwasser_temperatur", name: "Warmwasser" },
              { entity: "sensor.wp_aussen_temperatur", name: "Außen" }
            ]
          }
        ]
      },
      // --- 3. STEUERUNG ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Steuerung", heading_style: "title", icon: "mdi:tune" },
          { type: "tile", entity: "select.wp_betriebsmodus", name: "Betriebsmodus", icon: "mdi:cog-transfer", features_position: "bottom" },
          { type: "tile", entity: "sensor.wp_rucklauf_solltemperatur", name: "Soll Rücklauf", icon: "mdi:target", vertical: false },
          { type: "tile", entity: "sensor.wp_warmwasser_solltemperatur", name: "Soll Warmwasser", icon: "mdi:water-thermometer", vertical: false },
          { type: "custom:bubble-card", card_type: "climate", entity: "climate.wp_climate_heizen_temperatur", name: "Heizkurve anpassen", show_state: true },
          { type: "custom:bubble-card", card_type: "climate", entity: "climate.wp_climate_warmwasser_temperatur", name: "Warmwasser anpassen", show_state: true }
        ]
      },
      // --- 4. MASCHINENRAUM & DIAGNOSE ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Diagnose & Laufzeiten", heading_style: "title", icon: "mdi:stethoscope" },
          { type: "tile", entity: "sensor.wp_display_status", name: "Aktueller Status", color: "blue" },
          { type: "tile", entity: "sensor.wp_display_sperre", name: "Sperre", color: "grey" },
          { type: "tile", entity: "sensor.wp_display_storung", name: "Störung", color: "red" },
          { type: "tile", entity: "sensor.wp_verdichter_stunden", name: "Verdichter (Std.)", icon: "mdi:engine", vertical: false },
          { type: "tile", entity: "sensor.heizungspumpe", name: "Heizungspumpe (Std.)", icon: "mdi:pump", vertical: false },
          { type: "tile", entity: "sensor.warmwasserpumpe", name: "WW-Pumpe (Std.)", icon: "mdi:water-pump", vertical: false }
        ]
      }
    ]
  };
}