// ====================================================================
// Module: Grid Cockpit Builder
// Pfad: utils/diagnoseboards/grid-cockpit-builder.js
// Version: 1.2.0 (?v=73)
// ====================================================================

export function createGridCockpitSummaryCard() {
  return {
    type: "custom:bubble-card",
    card_type: "button",
    name: "Netzanschluss & Schieflast",
    icon: "mdi:transmission-tower",
    entity: "sensor.power_meter_consumption",
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
            name: "Phasen-Überwachung (Live)",
            icon: "mdi:flash"
          },
          {
            type: "history-graph",
            title: "Stromstärke je Phase (A)",
            hours_to_show: 4,
            refresh_interval: 10,
            entities: [
              "sensor.power_meter_current_l1",
              "sensor.power_meter_current_l2",
              "sensor.power_meter_current_l3"
            ]
          },
          {
            type: "history-graph",
            title: "Netz-Leistungverlauf (kW)",
            hours_to_show: 24,
            entities: [
              "sensor.power_meter_active_power"
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
                  domain: "sensor",
                  label: "grossverbraucher",
                  state: "> 0.5",
                  options: {
                    type: "custom:bubble-card",
                    card_type: "button",
                    show_state: true
                  }
                }
              ],
              exclude: [
                {
                  state: "unavailable"
                },
                {
                  state: "unknown"
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
          }
        ]
      }
    ]
  };
}