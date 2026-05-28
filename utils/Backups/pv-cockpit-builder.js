// ====================================================================
// PV COCKPIT BUILDER (Huawei SUN2000 & LUNA2000 - Layout Fix)
// ====================================================================

export function createPvCockpitSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Photovoltaik & Speicher",
    secondary: "Live-Ertrag, Batterie & Netz",
    icon: "mdi:solar-power-variant",
    icon_color: "amber",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "pv-cockpit" }
  };
}

export function createPvCockpitView() {
  return {
    type: "sections",
    max_columns: 4,
    icon: "mdi:solar-power",
    path: "pv-cockpit",
    title: "PV Cockpit",
    subview: true,
    sections: [
      // --- SPALTE 1: LIVE-WERTE & BATTERIE ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Live-Status", heading_style: "title", icon: "mdi:broadcast" },
          { 
            type: "gauge", 
            entity: "sensor.batteries_state_of_capacity", 
            name: "Batteriestand", 
            min: 0, max: 100, 
            severity: { green: 20, yellow: 10, red: 0 }, 
            needle: true 
          },
          { type: "tile", entity: "sensor.inverter_input_power", name: "PV Leistung (Dach)", icon: "mdi:solar-panel-large", color: "amber", vertical: false },
          { type: "tile", entity: "sensor.batteries_charge_discharge_power", name: "Batterie Leistung", icon: "mdi:battery-charging-high", color: "green", vertical: false },
          { type: "tile", entity: "sensor.power_meter_active_power", name: "Netz (Bezug/Einspeisung)", icon: "mdi:transmission-tower", color: "blue", vertical: false }
        ]
      },
      
      // --- SPALTE 2: BILANZ & DIAGNOSE (Zusammengelegt für perfekte Höhe) ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Ertrag & Bilanz", heading_style: "title", icon: "mdi:calendar-today" },
          { type: "tile", entity: "sensor.inverter_daily_yield", name: "Ertrag Heute", icon: "mdi:white-balance-sunny", color: "amber" },
          { type: "tile", entity: "sensor.batteries_day_charge", name: "Heute geladen", icon: "mdi:battery-arrow-up", color: "green" },
          { type: "tile", entity: "sensor.batteries_day_discharge", name: "Heute entladen", icon: "mdi:battery-arrow-down", color: "deep-orange" },
          { type: "tile", entity: "sensor.inverter_total_yield", name: "Gesamtertrag (All-Time)", icon: "mdi:sigma", color: "amber" },
          
          // Direkt darunter in der gleichen Spalte angehängt:
          { type: "heading", heading: "System-Diagnose", heading_style: "title", icon: "mdi:stethoscope" },
          { type: "tile", entity: "sensor.inverter_device_status", name: "Status WR", icon: "mdi:information", color: "blue" },
          { type: "tile", entity: "sensor.batteries_status", name: "Status Controller", icon: "mdi:information-outline", color: "cyan" },
          { type: "tile", entity: "sensor.battery_1_bms_temperature", name: "Batterie Temperatur", icon: "mdi:thermometer", color: "red" },
          { type: "tile", entity: "sensor.inverter_efficiency", name: "WR Effizienz", icon: "mdi:percent", color: "purple" }
        ]
      },
      
      // --- SPALTE 3: GRAPHEN (VERLAUF) ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Leistungsverlauf", heading_style: "title", icon: "mdi:chart-areaspline" },
          {
            type: "history-graph",
            title: "PV-Leistung vs. Netz",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.inverter_input_power", name: "PV Dach" },
              { entity: "sensor.power_meter_active_power", name: "Netz" }
            ]
          },
          {
            type: "history-graph",
            title: "Batteriestand (%)",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.batteries_state_of_capacity", name: "SoC", color: "green" }
            ]
          }
        ]
      },
      
      // --- SPALTE 4: BATTERIE-STEUERUNG ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Batterie-Steuerung", heading_style: "title", icon: "mdi:tune-vertical" },
          { type: "tile", entity: "select.batteries_working_mode", name: "Betriebsmodus", icon: "mdi:cog-transfer" },
          { type: "tile", entity: "switch.batteries_charge_from_grid", name: "Aus dem Netz laden", icon: "mdi:power-plug" },
          { 
            type: "tile", entity: "number.batteries_end_of_charge_soc", name: "Lade-Limit (Max %)", icon: "mdi:battery-high",
            features: [{ type: "numeric-input" }] 
          },
          { 
            type: "tile", entity: "number.batteries_end_of_discharge_soc", name: "Entlade-Limit (Min %)", icon: "mdi:battery-low",
            features: [{ type: "numeric-input" }] 
          },
          { 
            type: "tile", entity: "number.batteries_maximum_charging_power", name: "Max Ladeleistung (W)", icon: "mdi:speedometer", color: "green",
            features: [{ type: "numeric-input" }] 
          },
          { 
            type: "tile", entity: "number.batteries_maximum_discharging_power", name: "Max Entladeleistung (W)", icon: "mdi:speedometer-medium", color: "deep-orange",
            features: [{ type: "numeric-input" }] 
          }
        ]
      }
    ]
  };
}