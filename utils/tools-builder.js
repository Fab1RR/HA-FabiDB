// ====================================================================
// TOOLS BUILDER (Hausmodus Select & Werkzeuge)
// Pfad: utils/tools-builder.js
// Version: 1.2.7 (?v=79)
// ====================================================================

export function createHouseModeCard() {
  return {
    type: "custom:mushroom-select-card",
    entity: "input_select.hausmodus",
    name: "Hausmodus",
    icon: "mdi:home-automation",
    icon_color: "indigo",
    layout: "horizontal"
  };
}

export function createToolsSummaryCard() {
  // WICHTIG: Bubble Cards nutzen strikt "button_action", niemals "tap_action".
  return {
    type: "custom:bubble-card",
    card_type: "button",
    name: "Tools & Skripte",
    icon: "mdi:toolbox",
    button_action: { 
      action: "navigate", 
      navigation_path: "#tools-popup" 
    }
  };
}

export function createToolsPopup() {
  return {
    type: "custom:bubble-card",
    card_type: "pop-up",
    hash: "#tools-popup",
    name: "Werkzeuge & Skripte",
    icon: "mdi:toolbox-outline",
    back_button: true,
    trigger_close: true,
    margin: "7px",
    cards: [
      { 
        type: "markdown", 
        content: "## 🛠️ Meine Tools" 
      },
      {
        type: "custom:auto-entities", 
        show_empty: false, 
        card: { 
          type: "grid",
          columns: 2,
          square: false
        }, 
        card_param: "cards", 
        sort: { 
          method: "name" 
        },
        filter: {
          include: [
            { 
              label: "tool", 
              options: { 
                type: "custom:bubble-card", 
                card_type: "button",
                button_action: {  // KORREKTUR: Ebenfalls button_action für das Pop-up!
                  action: "more-info"
                }
              } 
            },
            { 
              label: "tools", // Fallback, falls das Label in HA "tools" heißt
              options: { 
                type: "custom:bubble-card", 
                card_type: "button",
                button_action: {
                  action: "more-info"
                }
              } 
            }
          ],
          exclude: [
            { label: "no_dboard" }, 
            { label: "no-dboard" }
          ]
        }
      }
    ]
  };
}