/**
 * DialogueSystem - Gestion des dialogues
 */

class DialogueSystem {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.currentDialogue = [];
        this.currentIndex = 0;
        this.container = null;
        this.textObject = null;
        this.nameObject = null;
        this.portraitObject = null;
        this.onComplete = null;
        
        // Détecter mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    /**
     * Affiche une série de dialogues
     * @param {Array} dialogues - [{speaker: 'felix', portrait: 'felix_idle', text: '...'}, ...]
     * @param {Function} onComplete - Callback à la fin
     */
    show(dialogues, onComplete = null) {
        if (this.isActive) return;
        
        this.isActive = true;
        this.currentDialogue = dialogues;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        
        this.createDialogueBox();
        this.showCurrentLine();
    }
    
    createDialogueBox() {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Son d'apparition du dialogue
        audioManager.playDialogue();
        
        // Tailles adaptées mobile
        const boxHeight = this.isMobile ? 200 : 180;
        const fontSize = this.isMobile ? '22px' : '20px';
        const nameFontSize = this.isMobile ? '20px' : '18px';
        const arrowFontSize = this.isMobile ? '32px' : '24px';
        
        // Container pour tout le dialogue
        this.container = this.scene.add.container(0, HEIGHT - boxHeight - 20);
        this.container.setDepth(1000);
        
        // Fond de la boîte de dialogue
        const boxBg = this.scene.add.rectangle(WIDTH / 2, 100, WIDTH - 100, boxHeight, 0x1A2B4C, 0.95);
        boxBg.setStrokeStyle(3, 0xD4A43E);
        
        // Cadre pour le portrait
        const portraitBg = this.scene.add.circle(120, 100, 70, 0x1A2B4C);
        portraitBg.setStrokeStyle(3, 0xD4A43E);
        
        // Portrait (placeholder, sera mis à jour)
        this.portraitObject = this.scene.add.image(120, 100, 'felix_idle')
            .setDisplaySize(120, 120);
        
        // Nom du personnage
        const nameBg = this.scene.add.rectangle(400, 25, 250, 35, 0xD4A43E);
        this.nameObject = this.scene.add.text(400, 25, '', {
            fontFamily: 'Georgia, serif',
            fontSize: nameFontSize,
            color: '#1A2B4C',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Texte du dialogue
        const textX = this.isMobile ? 210 : 220;
        const wrapWidth = this.isMobile ? WIDTH - 320 : WIDTH - 350;
        this.textObject = this.scene.add.text(textX, 55, '', {
            fontFamily: 'Arial, sans-serif',
            fontSize: fontSize,
            color: '#F5E6C8',
            wordWrap: { width: wrapWidth },
            lineSpacing: this.isMobile ? 10 : 8
        });
        
        // Indicateur "continuer" - plus gros sur mobile
        this.continueArrow = this.scene.add.text(WIDTH - 80, boxHeight - 30, '▶', {
            fontFamily: 'Arial',
            fontSize: arrowFontSize,
            color: '#D4A43E'
        });
        
        // Animation de l'indicateur
        this.scene.tweens.add({
            targets: this.continueArrow,
            x: WIDTH - 70,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        
        // Ajouter tous les éléments au container
        this.container.add([boxBg, portraitBg, this.portraitObject, nameBg, this.nameObject, this.textObject, this.continueArrow]);
        
        // Zone cliquable pour avancer - plus grande sur mobile
        const clickHeight = this.isMobile ? boxHeight + 50 : boxHeight;
        const clickZone = this.scene.add.rectangle(WIDTH / 2, 100, WIDTH, clickHeight, 0x000000, 0)
            .setInteractive({ useHandCursor: true });
        this.container.add(clickZone);
        
        clickZone.on('pointerdown', () => {
            audioManager.playClick();
            this.advance();
        });
        
        // Raccourci clavier
        this.scene.input.keyboard.on('keydown-SPACE', () => this.advance());
        this.scene.input.keyboard.on('keydown-ENTER', () => this.advance());
    }
    
    showCurrentLine() {
        if (this.currentIndex >= this.currentDialogue.length) {
            this.hide();
            return;
        }
        
        const line = this.currentDialogue[this.currentIndex];
        
        // Mettre à jour le portrait
        if (line.portrait && this.scene.textures.exists(line.portrait)) {
            this.portraitObject.setTexture(line.portrait);
        }
        
        // Mettre à jour le nom
        const speakerConfig = GAME_CONFIG.DIALOGUES[line.speaker?.toUpperCase()] || { name: line.speaker, color: '#D4A43E' };
        this.nameObject.setText(speakerConfig.name);
        
        // Effet de machine à écrire pour le texte
        this.typewriterEffect(line.text);
    }
    
    typewriterEffect(text) {
        this.textObject.setText('');
        let charIndex = 0;
        
        this.typewriterTimer = this.scene.time.addEvent({
            delay: 30,
            callback: () => {
                this.textObject.setText(text.substring(0, charIndex + 1));
                charIndex++;
                
                if (charIndex >= text.length) {
                    this.typewriterTimer.remove();
                }
            },
            repeat: text.length - 1
        });
    }
    
    advance() {
        // Si le texte n'est pas fini, afficher tout
        if (this.typewriterTimer && this.typewriterTimer.getRemaining() > 0) {
            this.typewriterTimer.remove();
            this.textObject.setText(this.currentDialogue[this.currentIndex].text);
            return;
        }
        
        // Passer à la ligne suivante
        this.currentIndex++;
        this.showCurrentLine();
    }
    
    hide() {
        this.isActive = false;
        
        if (this.container) {
            this.scene.tweens.add({
                targets: this.container,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    this.container.destroy();
                    this.container = null;
                    
                    if (this.onComplete) {
                        this.onComplete();
                    }
                }
            });
        }
    }
}
