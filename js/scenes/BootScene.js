/**
 * BootScene - Initialisation du jeu
 * Première scène chargée, prépare les systèmes de base
 */

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    
    preload() {
        // Rien à charger ici, on passe directement au PreloadScene
    }
    
    create() {
        console.log('🦊 Agent Renard - Initialisation...');
        
        // Configuration du jeu
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        // Passer à la scène de préchargement
        this.scene.start('PreloadScene');
    }
}
