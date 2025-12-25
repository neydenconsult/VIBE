/**
 * Agent Renard : Opération Fromage
 * Configuration globale du jeu
 */

const GAME_CONFIG = {
    // Dimensions
    WIDTH: 1280,
    HEIGHT: 720,
    
    // Couleurs
    COLORS: {
        NAVY: 0x1A2B4C,
        GOLD: 0xD4A43E,
        CREAM: 0xF5E6C8,
        RED: 0xB84C3A
    },
    
    // Scènes du jeu
    SCENES: {
        RUELLE: 'scene1_ruelle',
        CUISINE: 'scene2_cuisine',
        VIP: 'scene3_salle_vip',
        BUREAU: 'scene4_bureau',
        FINALE: 'scene5_cuisine_finale'
    },
    
    // Dialogues
    DIALOGUES: {
        FELIX: {
            name: 'Félix',
            color: '#D4A43E'
        },
        RODOLFO: {
            name: 'Rodolfo',
            color: '#B84C3A'
        },
        GUSTAVE: {
            name: 'Gustave',
            color: '#F5E6C8'
        },
        MME_COLVERT: {
            name: 'Mme Colvert',
            color: '#D4A0A0'
        },
        BRUNO: {
            name: 'Bruno',
            color: '#3D3D3D'
        }
    },
    
    // Inventaire
    INVENTORY: {
        MAX_SLOTS: 7,
        SLOT_SIZE: 80
    }
};

// État global du jeu
const GAME_STATE = {
    currentScene: null,
    inventory: [],
    flags: {
        // Scène 1
        introRuelleDone: false,
        hasToque: false,
        hasTableur: false,
        hasDeguisement: false,
        
        // Scène 2
        introCuisineDone: false,
        hasPiment: false,
        hasChantilly: false,
        hasCasserole: false,
        hasBombeCulinaire: false,
        gustavePanique: false,
        explosionTriggered: false,
        
        // Scène 3
        introVIPDone: false,
        hasVerreVide: false,
        hasLait: false,
        hasCle: false,
        mmeColvertEndormie: false,
        brunoPasse: false,
        
        // Scène 4
        introBureauDone: false,
        hasMenu: false,
        hasLoupe: false,
        hasCode: false,
        coffreOuvert: false,
        
        // Scène 5
        introFinaleDone: false,
        hasSel: false,
        hasVinaigre: false,
        hasBicarbonate: false,
        hasMelangeInstable: false,
        souffleDetruit: false
    },
    
    // Code du coffre-fort
    safeCode: '4729',
    enteredCode: ''
};

// Fonctions utilitaires
const GameUtils = {
    // Ajouter un objet à l'inventaire
    addToInventory: function(item) {
        if (GAME_STATE.inventory.length < GAME_CONFIG.INVENTORY.MAX_SLOTS) {
            GAME_STATE.inventory.push(item);
            return true;
        }
        return false;
    },
    
    // Retirer un objet de l'inventaire
    removeFromInventory: function(item) {
        const index = GAME_STATE.inventory.indexOf(item);
        if (index > -1) {
            GAME_STATE.inventory.splice(index, 1);
            return true;
        }
        return false;
    },
    
    // Vérifier si un objet est dans l'inventaire
    hasItem: function(item) {
        return GAME_STATE.inventory.includes(item);
    },
    
    // Combiner deux objets
    combineItems: function(item1, item2) {
        const combinations = {
            'toque+tablier': 'deguisement',
            'tablier+toque': 'deguisement',
            'piment+chantilly': 'bombe_culinaire',
            'chantilly+piment': 'bombe_culinaire',
            'casserole+piment+chantilly': 'bombe_culinaire',
            'verre_vide+lait_bouteille': 'verre_lait',
            'lait_bouteille+verre_vide': 'verre_lait',
            'menu+loupe': 'menu_loupe',
            'loupe+menu': 'menu_loupe',
            'sel+vinaigre+bicarbonate': 'melange_instable'
        };
        
        const key = `${item1}+${item2}`;
        return combinations[key] || null;
    }
};
