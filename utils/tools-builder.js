// ====================================================================
// TOOLS BUILDER (Hausmodus & Werkzeuge - Bubble Card Redesign)
// Pfad: utils/tools-builder.js
// Version: 1.2.5 (?v=77)
// ====================================================================

export function createHouseModeCard() {
  // Umstellung auf Bubble Card für einheitliches, rundes Design
  return {
    type: "custom:bubble-card",
    card_type: "button",
    entity: "input_select.hausmodus",
    name: "Hausmodus",
    icon: "mdi:home-automation",
    show_state: true,
    button_action: {
      action: "more-info" // Öffnet den nativen Auswahldialog von HA
    }
  };
}

export function createToolsSummaryCard() {
  // Umstellung auf Bubble Card. 
  // Hinweis: Das Jinja-Template für den Zähler wurde entfernt, 
  // da Bubble Card dies nicht nativ als Untertitel unterstützt.
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
  // Entspricht bereits dem Bubble Card v3.2+ Standard (kein vertical-stack)
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