// ====================================================================
// EG BUILDER (v35 - Wintergarten integriert, Medien ausgelagert)
// ====================================================================

export function createEgWohnenSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Wohnbereich",
    secondary: "Wohnen, Essen & Küche",
    icon: "mdi:sofa",
    icon_color: "orange",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "eg-wohnen" }
  };
}

export function createEgBadSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Badezimmer",
    secondary: "EG Bad & WC",
    icon: "mdi:shower",
    icon_color: "light-blue",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "eg-bad" }
  };
}

// ====================================================================
// VORLAGE 1: RÄUME (Blendet sich komplett aus, wenn leer)
// ====================================================================
function createZoneSection(title, path, icon, targetAreas) {
  
  const globalExclude = [ { label: "no-dboard" }, { label: "no_dboard" }, { state: "unavailable" }, { state: "unknown" } ];

  const lightIncludes = targetAreas.map(area => ({ domain: "light", area: area, options: { type: "tile", icon_tap_action: { action: "toggle" }, features: [{ type: "light-brightness" }] } }));
  const coverIncludes = targetAreas.map(area => ({ domain: "cover", area: area, options: { type: "tile", features: [{ type: "cover-open-close" }] } }));
  
  let klimaIncludes = [];
  let deviceIncludes = [];
  
  targetAreas.forEach(area => {
    klimaIncludes.push({ domain: "climate", area: area, options: { type: "tile" } });
    klimaIncludes.push({ domain: "sensor", attributes: { device_class: "temperature" }, area: area, options: { type: "tile", color: "orange" } });
    klimaIncludes.push({ domain: "sensor", attributes: { device_class: "humidity" }, area: area, options: { type: "tile", color: "blue" } });
    
    deviceIncludes.push({ domain: "switch", area: area, options: { type: "tile" } });
    deviceIncludes.push({ domain: "binary_sensor", attributes: { device_class: "motion" }, area: area, options: { type: "tile" } });
    deviceIncludes.push({ domain: "binary_sensor", attributes: { device_class: "window" }, area: area, options: { type: "tile", color: "red" } });
  });

  return {
    type: "sections",
    max_columns: 2,
    icon: icon,
    path: path,
    title: title,
    subview: true,
    sections: [
      {
        type: "grid",
        cards: [
          // BELEUCHTUNG
          {
            type: "custom:auto-entities",
            show_empty: false, 
            card: { type: "grid", columns: 2, square: false, title: "Beleuchtung 💡" }, 
            card_param: "cards",
            filter: { include: lightIncludes, exclude: globalExclude },
            sort: { method: "friendly_name" }
          },
          // BESCHATTUNG
          {
            type: "custom:auto-entities",
            show_empty: false,
            card: { type: "grid", columns: 2, square: false, title: "Beschattung 🪟" },
            card_param: "cards",
            filter: { include: coverIncludes, exclude: globalExclude },
            sort: { method: "friendly_name" }
          }
        ]
      },
      {
        type: "grid",
        cards: [
          // KLIMA & HEIZUNG
          {
            type: "custom:auto-entities",
            show_empty: false,
            card: { type: "grid", columns: 2, square: false, title: "Klima & Heizung 🌡️" },
            card_param: "cards",
            filter: { include: klimaIncludes, exclude: globalExclude },
            sort: { method: "friendly_name" }
          },
          // GERÄTE & SENSOREN
          {
            type: "custom:auto-entities",
            show_empty: false,
            card: { type: "grid", columns: 2, square: false, title: "Geräte & Sensoren 🔌" },
            card_param: "cards",
            filter: { include: deviceIncludes, exclude: globalExclude },
            sort: { method: "friendly_name" }
          }
        ]
      }
    ]
  };
}

// ====================================================================
// DEINE BEREICHE IN HOME ASSISTANT
// ====================================================================

export function createEgWohnenView() {
  // Der Wintergarten ist jetzt für immer hier verankert!
  return createZoneSection("Wohnbereich", "eg-wohnen", "mdi:sofa", ["Wohnzimmer", "Esszimmer", "Küche", "Flur", "Wintergarten"]);
}

export function createEgBadView() {
  return createZoneSection("Badezimmer", "eg-bad", "mdi:shower", ["Badezimmer", "Gäste-WC"]);
}