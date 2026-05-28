// ====================================================================
// TOOLS BUILDER (Hausmodus Original & Werkzeuge Fix)
// Pfad: utils/tools-builder.js
// Version: 1.2.4 (?v=76)
// ====================================================================

export function createHouseModeCard() {
  // Unverändert gelassen wie im Original
  return {
    type: "tile",
    entity: "input_select.hausmodus",
    vertical: false,
    features_position: "bottom"
  };
}

export function createToolsSummaryCard() {
  // Das Jinja2-Template wurde repariert, sodass die Variable 'tools' korrekt innerhalb des logischen Blocks ausgegeben wird
  const countTemplate = "{% set ignored = label_entities('no_dboard') + label_entities('no-dboard') %}{% set tools = label_entities('tool') | reject('in', ignored) | list | count %}{{ tools }} aktiv";
  
  return {
    type: "custom:mushroom-template-card",
    primary: "Tools",
    secondary: countTemplate,
    icon: "mdi:toolbox",
    icon_color: "blue",
    layout: "horizontal",
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