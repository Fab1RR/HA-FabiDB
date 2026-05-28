// ====================================================================
// GLOBAL MEDIA BUILDER (v35 - Alle Alexas & Lautsprecher)
// ====================================================================

export function createMediaSummaryCard() {
  return {
    type: "custom:mushroom-template-card",
    primary: "Medien & Audio",
    secondary: "Alle Lautsprecher",
    icon: "mdi:cast-audio",
    icon_color: "purple",
    layout: "horizontal",
    tap_action: { action: "navigate", navigation_path: "medien" }
  };
}

export function createMediaView() {
  return {
    type: "sections",
    max_columns: 2,
    icon: "mdi:cast-audio",
    path: "medien",
    title: "Medien & Audio",
    subview: true,
    sections: [
      {
        type: "grid",
        cards: [
          {
            type: "custom:auto-entities",
            show_empty: false,
            // Wir nutzen hier GANZ WICHTIG einen vertical-stack statt grid! 
            // So haben die dicken Media-Karten Platz in der Breite.
            card: { type: "vertical-stack" },
            card_param: "cards",
            filter: {
              include: [ 
                { 
                  domain: "media_player", 
                  options: { type: "media-control" } // Die saubere Standard-Medienkarte
                } 
              ],
              exclude: [ 
                { label: "no-dboard" }, 
                { label: "no_dboard" }, 
                { state: "unavailable" }, 
                { state: "unknown" } 
              ]
            },
            sort: { method: "friendly_name" }
          }
        ]
      }
    ]
  };
}