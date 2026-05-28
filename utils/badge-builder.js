// ====================================================================
// BADGE BUILDER
// ====================================================================

export function createLabelBadges(hass) {
  const allEntities = Object.values(hass.entities || {});

  const badgeEntities = allEntities.filter(e => {
    if (!e.labels) return false;
    
    // Prüfen, ob es ein Badge ist
    const isBadge = e.labels.some(label => label.toLowerCase() === "badge");
    // Prüfen, ob es versteckt werden soll (mit Bindestrich oder Unterstrich)
    const isHidden = e.labels.some(label => label.toLowerCase() === "no-dboard" || label.toLowerCase() === "no_dboard");
    
    return isBadge && !isHidden;
  });

  return badgeEntities.map(entity => {
    return { type: "entity", entity: entity.entity_id, show_name: true, show_state: true, show_icon: true };
  });
}