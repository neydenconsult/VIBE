/**
 * TitleScene - Écran titre du jeu
 */

class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }
    
    create() {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Image de fond (écran titre)
        this.add.image(WIDTH / 2, HEIGHT / 2, 'ui_ecran_titre')
            .setDisplaySize(WIDTH, HEIGHT);
        
        // Zone cliquable pour "JOUER"
        const playButton = this.add.rectangle(WIDTH / 2, HEIGHT - 100, 200, 60, 0x000000, 0)
            .setInteractive({ useHandCursor: true });
        
        // Effet hover
        playButton.on('pointerover', () => {
            this.tweens.add({
                targets: playButton,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 100
            });
        });
        
        playButton.on('pointerout', () => {
            this.tweens.add({
                targets: playButton,
                scaleX: 1,
                scaleY: 1,
                duration: 100
            });
        });
        
        // Lancer le jeu au clic
        playButton.on('pointerdown', () => {
            // Initialiser l'audio au premier clic (requis par navigateurs)
            audioManager.init();
            audioManager.playClick();
            
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('GameScene', { scene: 'ruelle' });
            });
        });
        
        // Animation de pulsation sur le bouton
        this.tweens.add({
            targets: playButton,
            alpha: { from: 0.8, to: 1 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });
        
        // Bouton Mute (coin supérieur droit)
        this.muteButton = this.add.text(WIDTH - 60, 30, '🔊', {
            fontFamily: 'Arial',
            fontSize: '32px'
        })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
        
        this.muteButton.on('pointerdown', () => {
            audioManager.init();
            audioManager.toggleMute();
            this.muteButton.setText(audioManager.masterGain?.gain.value > 0 ? '🔊' : '🔇');
        });
        
        // Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        console.log('🎬 Écran titre affiché');
    }
}
