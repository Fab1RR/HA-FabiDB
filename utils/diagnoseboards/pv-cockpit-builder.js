// ====================================================================
// PV COCKPIT BUILDER (Huawei SUN2000, LUNA2000 & Balkonkraftwerk) - v62
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
          { type: "tile", entity: "sensor.micro_inverter_roof_power", name: "PV Leistung (Balkon)", icon: "mdi:solar-panel", color: "amber", vertical: false },
          { type: "tile", entity: "sensor.batteries_charge_discharge_power", name: "Batterie Leistung", icon: "mdi:battery-charging-high", color: "green", vertical: false },
          
          // HIER IST DAS UPDATE: Tasmota übernimmt die Netz-Überwachung im PV-Cockpit!
          { type: "tile", entity: "sensor.bitshake_smartmeterreader_sml_watt_summe", name: "Netz (Bezug/Einspeisung)", icon: "mdi:transmission-tower", color: "blue", vertical: false }
        ]
      },
      
      // --- SPALTE 2: ERTRAG & BILANZ (Kompakt nebeneinander) ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Ertrag & Bilanz", heading_style: "title", icon: "mdi:calendar-today" },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.inverter_pv_dach_heute", name: "Heute (Dach)", icon: "mdi:white-balance-sunny", color: "amber" },
              { type: "tile", entity: "sensor.micro_inverter_roof_daily_generation", name: "Heute (Balkon)", icon: "mdi:white-balance-sunny", color: "amber" }
            ]
          },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.batteries_day_charge", name: "Geladen", icon: "mdi:battery-arrow-up", color: "green" },
              { type: "tile", entity: "sensor.batteries_day_discharge", name: "Entladen", icon: "mdi:battery-arrow-down", color: "deep-orange" }
            ]
          },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.inverter_total_dc_input_energy", name: "Gesamt (Dach)", icon: "mdi:sigma", color: "amber" },
              { type: "tile", entity: "sensor.micro_inverter_roof_total_generation", name: "Gesamt (Balkon)", icon: "mdi:sigma", color: "amber" }
            ]
          }
        ]
      },
      
      // --- SPALTE 3: SYSTEM-DIAGNOSE & MODULE ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "System & Diagnose", heading_style: "title", icon: "mdi:stethoscope" },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.inverter_device_status", name: "Status Dach", icon: "mdi:solar-power", color: "blue" },
              { type: "tile", entity: "sensor.micro_inverter_roof_inverter_status", name: "Status Balkon", icon: "mdi:solar-panel", color: "blue" }
            ]
          },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.batteries_status", name: "Status Akku", icon: "mdi:battery", color: "cyan" },
              { type: "tile", entity: "sensor.inverter_efficiency", name: "Effizienz Dach", icon: "mdi:percent", color: "purple" }
            ]
          },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.battery_1_bms_temperature", name: "Temp Akku", icon: "mdi:thermometer", color: "red" },
              { type: "tile", entity: "sensor.micro_inverter_roof_temperature", name: "Temp Balkon", icon: "mdi:thermometer", color: "red" }
            ]
          },
          { type: "heading", heading: "Modul-Details (Live)", heading_style: "title", icon: "mdi:view-grid" },
          {
            type: "grid", columns: 2, square: false,
            cards: [
              { type: "tile", entity: "sensor.module_pv1_roof_power", name: "PV1", icon: "mdi:solar-panel", color: "orange" },
              { type: "tile", entity: "sensor.module_pv2_roof_power", name: "PV2", icon: "mdi:solar-panel", color: "orange" },
              { type: "tile", entity: "sensor.module_pv3_roof_power", name: "PV3", icon: "mdi:solar-panel", color: "orange" },
              { type: "tile", entity: "sensor.module_pv4_roof_power", name: "PV4", icon: "mdi:solar-panel", color: "orange" }
            ]
          }
        ]
      },
      
      // --- SPALTE 4: GRAPHEN & BATTERIE-STEUERUNG ---
      {
        type: "grid",
        cards: [
          { type: "heading", heading: "Leistungsverlauf", heading_style: "title", icon: "mdi:chart-areaspline" },
          {
            type: "history-graph",
            title: "PV-Leistung vs. Netz",
            hours_to_show: 6,
            entities: [
              { entity: "sensor.inverter_input_power", name: "PV Dach", color: "amber" },
              { entity: "sensor.micro_inverter_roof_power", name: "PV Balkon", color: "orange" },
              // HIER IST DAS ZWEITE UPDATE: Der Tasmota-Sensor zeichnet nun die Netzkurve mit!
              { entity: "sensor.bitshake_smartmeterreader_sml_watt_summe", name: "Netz", color: "blue" }
            ]
          },
          {
            type: "history-graph",
            title: "Batteriestand (%)",
            hours_to_show: 24,
            entities: [
              { entity: "sensor.batteries_state_of_capacity", name: "SoC", color: "green" }
            ]
          },

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