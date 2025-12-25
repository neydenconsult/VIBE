/**
 * Agent Renard : Opération Fromage
 * Point d'entrée du jeu
 */

// Détection mobile
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Configuration Phaser
const phaserConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    backgroundColor: '#1A2B4C',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        expandParent: true
    },
    input: {
        activePointers: isMobileDevice ? 3 : 1, // Support multi-touch sur mobile
        touch: {
            capture: true
        }
    },
    render: {
        antialias: !isMobileDevice, // Désactiver antialiasing sur mobile pour perf
        pixelArt: false,
        roundPixels: true
    },
    scene: [
        BootScene,
        PreloadScene,
        TitleScene,
        GameScene
    ]
};

// Lancer le jeu
const game = new Phaser.Game(phaserConfig);

console.log('🦊 Agent Renard : Opération Fromage');
console.log('📦 Version 1.1 - Mobile Ready');
console.log('🎮 Moteur: Phaser 3.60');
console.log('📱 Mobile:', isMobileDevice ? 'Oui' : 'Non');
