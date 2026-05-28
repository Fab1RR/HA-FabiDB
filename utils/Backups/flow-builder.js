// ====================================================================
// FLOW BUILDER (Energiefluss / Power Flow Card Plus) - v45
// ====================================================================

export function createFlowSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Energiefluss",
    secondary: "Live Stromverteilung",
    icon: "mdi:transmission-tower",
    icon_color: "blue",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "energiefluss" }
  };
}

export function createFlowView() {
  return {
    type: "sections",
    max_columns: 2, 
    icon: "mdi:flash",
    path: "energiefluss",
    title: "Energiefluss",
    subview: true,
    sections: [
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Live Energiefluss", heading_style: "title", icon: "mdi:swap-horizontal-circle" },
          {
            type: "custom:power-flow-card-plus",
            entities: {
              grid: {
                entity: "sensor.power_meter_active_power",
                name: "Netz",
                icon: "mdi:transmission-tower",
                color_value: true
              },
              solar: {
                entity: "sensor.inverter_input_power",
                name: "Dach PV",
                icon: "mdi:solar-panel-large",
                color_value: true,
                color_icon: true
              },
              battery: {
                entity: "sensor.batteries_charge_discharge_power",
                state_of_charge: "sensor.batteries_state_of_capacity",
                name: "LUNA2000",
                icon: "mdi:battery-charging-high",
                color_value: true,
                color_icon: true
              },
              individual: [
                {
                  entity: "sensor.micro_inverter_roof_power",
                  name: "Balkon PV",
                  icon: "mdi:solar-panel-variant",
                  color_value: true,
                  color_icon: true,
                  display_zero: true,
                  calculate_flow: true,
                  // HIER IST DIE MAGIE: Dreht die Richtung um und macht es zum Produzenten!
                  invert_state: true 
                }
              ],
              home: {
                name: "Zuhause",
                icon: "mdi:home-lightning-bolt",
                color_value: true,
                color_icon: true
              }
            },
            clickable_entities: true,
            display_zero_lines: true,
            use_new_flow_rate_model: true
          }
        ]
      }
    ]
  };
}