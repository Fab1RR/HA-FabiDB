// ====================================================================
// Module: Grid Cockpit Builder (Tasmota bitShake SmartMeterReader)
// Pfad: utils/diagnoseboards/grid-cockpit-builder.js
// Version: 1.3.0 (?v=77)
// ====================================================================

export function createGridCockpitSummaryCard() {
  return {
    type: "custom:bubble-card",
    card_type: "button",
    name: "Netzanschluss & Schieflast",
    icon: "mdi:transmission-tower",
    entity: "sensor.bitshake_smartmeterreader_sml_watt_summe",
    show_state: true,
    button_action: {
      action: "navigate",
      navigation_path: "grid-cockpit"
    }
  };
}

export function createGridCockpitView() {
  return {
    title: "Stromnetz Diagnose",
    path: "grid-cockpit",
    icon: "mdi:chart-timeline-variant",
    type: "sections",
    max_columns: 2,
    cards: [
      {
        type: "vertical-stack",
        cards: [
          {
            type: "custom:bubble-card",
            card_type: "separator",
            name: "Netz-Last & Schieflast (Live)",
            icon: "mdi:flash"
          },
          {
            type: "history-graph",
            title: "Leistung je Phase (W) - Schieflast-Kontrolle",
            hours_to_show: 4,
            refresh_interval: 10,
            entities: [
              { entity: "sensor.bitshake_smartmeterreader_sml_watt_l1", name: "Phase L1", color: "#ff5252" },
              { entity: "sensor.bitshake_smartmeterreader_sml_watt_l2", name: "Phase L2", color: "#4caf50" },
              { entity: "sensor.bitshake_smartmeterreader_sml_watt_l3", name: "Phase L3", color: "#2196f3" }
            ]
          },
          {
            type: "history-graph",
            title: "Gesamt-Netzleistung (W) - Bezug & Einspeisung",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.bitshake_smartmeterreader_sml_watt_summe", name: "Gesamtleistung", color: "#ff9800" }
            ]
          },
          {
             type: "grid",
             columns: 3,
             square: false,
             cards: [
               { type: "tile", entity: "sensor.bitshake_smartmeterreader_sml_volt_l1", name: "Volt L1", icon: "mdi:sine-wave" },
               { type: "tile", entity: "sensor.bitshake_smartmeterreader_sml_volt_l2", name: "Volt L2", icon: "mdi:sine-wave" },
               { type: "tile", entity: "sensor.bitshake_smartmeterreader_sml_volt_l3", name: "Volt L3", icon: "mdi:sine-wave" }
             ]
          }
        ]
      },
      {
        type: "vertical-stack",
        cards: [
          {
            type: "custom:bubble-card",
            card_type: "separator",
            name: "Aktive Großverbraucher (>0.5 kW)",
            icon: "mdi:chart-scatter-plot"
          },
          {
            type: "custom:auto-entities",
            card: {
              type: "grid",
              columns: 1,
              square: false
            },
            card_param: "cards",
            filter: {
              include: [
                {
                  label: "grossverbraucher",
                  state: "> 0.5",
                  type: "custom:bubble-card",
                  card_type: "button",
                  show_state: true
                }
              ],
              exclude: [
                {
                  state: "unavailable"
                }
              ]
            },
            show_empty: true,
            else_card: {
              type: "custom:bubble-card",
              card_type: "button",
              name: "Keine Großverbraucher aktiv",
              icon: "mdi:leaf",
              color: "green"
            }
          },
          {
            type: "custom:bubble-card",
            card_type: "separator",
            name: "Netz-Tagesbilanz",
            icon: "mdi:scale-balance"
          },
          {
             type: "grid",
             columns: 2,
             square: false,
             cards: [
               { type: "tile", entity: "sensor.bitshake_smartmeterreader_netz_verbrauch_heute", name: "Verbrauch Heute", icon: "mdi:arrow-down-bold", color: "red" },
               { type: "tile", entity: "sensor.bitshake_smartmeterreader_netz_einspeizung_heute", name: "Einspeisung Heute", icon: "mdi:arrow-up-bold", color: "green" }
             ]
          }
        ]
      }
    ]
  };
}