// ====================================================================
// TOOLS BUILDER (Hausmodus Select & Werkzeuge)
// Pfad: utils/tools-builder.js
// Version: 1.2.6 (?v=78)
// ====================================================================

export function createHouseModeCard() {
  // Mushroom Select Card für direkte Inline-Auswahl ohne Pop-up.
  // Passt sich durch das runde Design optimal an die Bubble Cards an.
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
  // KORREKTUR: tap_action statt button_action, damit das Pop-up lädt!
  return {
    type: "custom:bubble-card",
    card_type: "button",
    name: "Tools & Skripte",
    icon: "mdi:toolbox",
    tap_action: { 
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
                tap_action: {  // KORREKTUR: Verhindert den .turn_off Fehler bei Auto-Entities
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