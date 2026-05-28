// ====================================================================
// FabiDB.js - v78 (Zentraler Dashboard-Architekt - Clean ohne Keller)
// Pfad: FabiDB.js
// Version: 1.0.78 (?v=78)
// ====================================================================

// --- Core & Tools ---
import { createLabelBadges } from './utils/badge-builder.js?v=78';
import { createHouseModeCard, createToolsSummaryCard, createToolsPopup } from './utils/tools-builder.js?v=78'; 

// --- SYSTEMS (Gewerke aus dem systems/ Ordner) ---
import { createLightsSummaryCard, createLightsPopup } from './utils/systems/lights-builder.js?v=78';
import { createCoversSummaryCard, createCoversPopup } from './utils/systems/covers-builder.js?v=78';
import { createSecuritySummaryCard, createSecurityPopup } from './utils/systems/security-builder.js?v=78';
import { createBatteriesSummaryCard, createBatteriesPopup } from './utils/systems/batteries-builder.js?v=78';
import { createMediaSummaryCard, createMediaView } from './utils/systems/media-builder.js?v=78';
import { createMotionSummaryCard, createMotionView } from './utils/systems/motion-builder.js?v=78'; 

// Die korrekte, modulare Trennung laut Ordnerstruktur:
import { createHeaterSummaryCard, createHeaterView } from './utils/systems/heater-builder.js?v=78'; 
import { createHeatingSummaryCard, createHeatingView } from './utils/systems/heating-builder.js?v=78'; 

// --- Diagnoseboards (aus dem diagnoseboards/ Ordner) ---
import { createWpCockpitSummaryCard, createWpCockpitView } from './utils/diagnoseboards/wp-cockpit-builder.js?v=78';
import { createTankCockpitSummaryCard, createTankCockpitView } from './utils/diagnoseboards/tank-cockpit-builder.js?v=78';
import { createSolarCockpitSummaryCard, createSolarCockpitView } from './utils/diagnoseboards/solar-cockpit-builder.js?v=78';
import { createPvCockpitSummaryCard, createPvCockpitView } from './utils/diagnoseboards/pv-cockpit-builder.js?v=78';
import { createGridCockpitSummaryCard, createGridCockpitView } from './utils/diagnoseboards/grid-cockpit-builder.js?v=78'; 

// --- Räume Importe (aus dem rooms/ Ordner) ---
import { createEgWohnenSummaryCard, createEgBadSummaryCard, createEgWohnenView, createEgBadView } from './utils/rooms/eg-builder.js?v=78';

class FabiDBStrategy {
  static async generate(config, hass) {
    console.log("🚀 FabiDB (v78 - Clean ohne Keller) startet!");

    const myBadges = createLabelBadges(hass);
    const lightsPopup = createLightsPopup();
    const coversPopup = createCoversPopup();
    const securityPopup = createSecurityPopup();
    const batteriesPopup = createBatteriesPopup();
    const toolsPopup = createToolsPopup();

    const heaterView = createHeaterView(); 
    const heatingView = createHeatingView(); 
    const motionView = createMotionView(); 
    const wpCockpitView = createWpCockpitView(); 
    const tankCockpitView = createTankCockpitView(); 
    const solarCockpitView = createSolarCockpitView(); 
    const pvCockpitView = createPvCockpitView(); 
    const gridView = createGridCockpitView(); 
    const egWohnenView = createEgWohnenView(); 
    const egBadView = createEgBadView();       
    const mediaView = createMediaView();

    const overviewBlock = { 
      type: "vertical-stack", 
      cards: [ 
        { type: "custom:mushroom-title-card", title: "Übersicht" }, 
        { type: "horizontal-stack", cards: [createHouseModeCard(), createToolsSummaryCard()] }, 
        { type: "horizontal-stack", cards: [createLightsSummaryCard(), createCoversSummaryCard()] }, 
        { type: "horizontal-stack", cards: [createSecuritySummaryCard(), createBatteriesSummaryCard()] } 
      ] 
    };

    const roomsBlock = { 
      type: "vertical-stack", 
      cards: [ 
        { type: "custom:mushroom-title-card", title: "Räume & Systeme" }, 
        { type: "horizontal-stack", cards: [createEgWohnenSummaryCard(), createEgBadSummaryCard()] }, 
        { type: "horizontal-stack", cards: [createMediaSummaryCard(), createHeaterSummaryCard()] }, 
        { type: "horizontal-stack", cards: [createMotionSummaryCard(), createHeatingSummaryCard()] } 
      ] 
    };

    const diagBlock = { 
      type: "vertical-stack", 
      cards: [ 
        { type: "custom:mushroom-title-card", title: "Diagnose & Steuerung" }, 
        createGridCockpitSummaryCard(), 
        createPvCockpitSummaryCard(), 
        createWpCockpitSummaryCard(), 
        createTankCockpitSummaryCard(), 
        createSolarCockpitSummaryCard() 
      ]
    };

    return {
      title: "FabiDB", 
      views: [
        { 
          title: "Übersicht", 
          path: "home", 
          badges: myBadges, 
          cards: [
            overviewBlock, 
            roomsBlock, 
            diagBlock, 
            lightsPopup, 
            coversPopup, 
            securityPopup, 
            batteriesPopup, 
            toolsPopup
          ] 
        },
        heaterView, 
        heatingView, 
        motionView, 
        wpCockpitView, 
        tankCockpitView, 
        solarCockpitView, 
        pvCockpitView, 
        gridView, 
        egWohnenView, 
        egBadView,
        mediaView
      ]
    };
  }
}
customElements.define("ll-strategy-dashboard-fabi-db", FabiDBStrategy);