/**
 * GameScene - Scène de jeu principale
 * Gère les 5 scènes du jeu
 */

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    
    init(data) {
        this.currentSceneKey = data.scene || 'ruelle';
    }
    
    create() {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Systèmes
        this.dialogueSystem = new DialogueSystem(this);
        this.inventorySystem = new InventorySystem(this);
        this.effectsManager = new EffectsManager(this);
        this.inventorySystem.create();
        
        // Bouton Mute (coin supérieur droit)
        this.muteButton = this.add.text(WIDTH - 60, 30, '🔊', {
            fontFamily: 'Arial',
            fontSize: '28px'
        })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5)
        .setDepth(2000)
        .setScrollFactor(0);
        
        this.muteButton.on('pointerdown', () => {
            audioManager.toggleMute();
            this.muteButton.setText(audioManager.masterGain?.gain.value > 0 ? '🔊' : '🔇');
        });
        
        // Charger la scène appropriée
        this.loadScene(this.currentSceneKey);
        
        // Fade in
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        console.log(`🎮 Scène chargée: ${this.currentSceneKey}`);
    }
    
    loadScene(sceneKey) {
        // Nettoyer la scène précédente
        this.clearScene();
        
        // Démarrer la musique d'ambiance
        audioManager.startMusic(sceneKey);
        
        switch(sceneKey) {
            case 'ruelle':
                this.createRuelleScene();
                break;
            case 'cuisine':
                this.createCuisineScene();
                break;
            case 'vip':
                this.createVIPScene();
                break;
            case 'bureau':
                this.createBureauScene();
                break;
            case 'finale':
                this.createFinaleScene();
                break;
        }
        
        this.currentSceneKey = sceneKey;
    }
    
    clearScene() {
        // Détruire les éléments de la scène précédente
        if (this.sceneContainer) {
            this.sceneContainer.destroy();
        }
        this.sceneContainer = this.add.container(0, 0);
    }
    
    // =============================================
    // SCÈNE 1 : LA RUELLE
    // =============================================
    createRuelleScene() {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Décor
        const decor = this.add.image(WIDTH / 2, HEIGHT / 2, 'decor_ruelle')
            .setDisplaySize(WIDTH, HEIGHT);
        this.sceneContainer.add(decor);
        
        // Félix
        this.felix = this.add.image(200, HEIGHT - 250, 'felix_idle')
            .setScale(0.5)
            .setOrigin(0.5, 1);
        this.sceneContainer.add(this.felix);
        
        // Dialogue d'introduction
        if (!GAME_STATE.flags.introRuelleDone) {
            this.time.delayedCall(500, () => {
                this.dialogueSystem.show([
                    { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Voilà donc le fameux restaurant 'Le Palais du Rat'..." },
                    { speaker: 'FELIX', portrait: 'felix_idle', text: "D'après mes sources, le chef Rodolfo Ratoni y prépare un plat interdit : le Soufflé Impérial au Fromage Fantôme." },
                    { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Ce fromage est si rare et si puant qu'il est illégal de le cuisiner en zone urbaine !" },
                    { speaker: 'FELIX', portrait: 'felix_action', text: "Je dois m'infiltrer et saboter ce plat avant qu'il ne soit servi aux critiques culinaires." },
                    { speaker: 'FELIX', portrait: 'felix_idle', text: "Mais d'abord... il me faut un déguisement. Voyons ce que je peux trouver ici." }
                ], () => {
                    GAME_STATE.flags.introRuelleDone = true;
                });
            });
        }
        
        // === OBJETS INTERACTIFS ===
        
        // Toque sur la corde à linge
        if (!GAME_STATE.flags.hasToque) {
            this.createHotspot(490, 200, 80, 80, 'toque', () => {
                this.collectItem('toque', "Une toque de chef ! Parfait pour me fondre dans le décor.");
                GAME_STATE.flags.hasToque = true;
            });
        }
        
        // Tablier sur la corde à linge
        if (!GAME_STATE.flags.hasTableur) {
            this.createHotspot(600, 220, 60, 100, 'tablier', () => {
                this.collectItem('tablier', "Un tablier blanc. Avec la toque, je ressemblerai à un vrai cuisinier !");
                GAME_STATE.flags.hasTableur = true;
            });
        }
        
        // Porte du restaurant
        this.createHotspot(520, 420, 80, 150, 'porte', () => {
            if (this.inventorySystem.hasItem('deguisement')) {
                this.dialogueSystem.show([
                    { speaker: 'FELIX', portrait: 'felix_action', text: "Avec ce déguisement, je devrais pouvoir entrer..." }
                ], () => {
                    this.transitionToScene('cuisine');
                });
            } else if (this.inventorySystem.hasItem('toque') && this.inventorySystem.hasItem('tablier')) {
                this.dialogueSystem.show([
                    { speaker: 'FELIX', portrait: 'felix_reflexion', text: "J'ai la toque et le tablier. Je devrais les combiner pour créer un déguisement complet !" }
                ]);
            } else {
                this.dialogueSystem.show([
                    { speaker: 'FELIX', portrait: 'felix_idle', text: "Je ne peux pas entrer comme ça. Il me faut un déguisement de cuisinier." }
                ]);
            }
        });
        
        // Poubelles (indice/ambiance)
        this.createHotspot(150, 450, 100, 80, 'poubelles', () => {
            this.dialogueSystem.show([
                { speaker: 'FELIX', portrait: 'felix_idle', text: "Des poubelles pleines de restes de nourriture. L'odeur est... intéressante." }
            ]);
        });
        
        // Chat sur les caisses
        this.createHotspot(680, 400, 60, 60, 'chat', () => {
            this.dialogueSystem.show([
                { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Un chat noir me fixe d'un air suspicieux. Il garde le territoire, on dirait." }
            ]);
        });
    }
    
    // =============================================
    // FONCTIONS UTILITAIRES
    // =============================================
    
    createHotspot(x, y, width, height, name, onClick) {
        // Détecter si on est sur mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Agrandir les zones tactiles sur mobile (minimum 60px)
        const minTouchSize = isMobile ? 60 : 40;
        const touchWidth = Math.max(width, minTouchSize);
        const touchHeight = Math.max(height, minTouchSize);
        
        // Bonus de taille pour mobile (+30%)
        const mobileBonus = isMobile ? 1.3 : 1;
        const finalWidth = touchWidth * mobileBonus;
        const finalHeight = touchHeight * mobileBonus;
        
        const hotspot = this.add.rectangle(x, y, finalWidth, finalHeight, 0xFFFF00, 0)
            .setInteractive({ useHandCursor: true });
        
        // Debug : afficher les hitbox en mode dev
        // hotspot.setFillStyle(0xFFFF00, 0.3);
        
        hotspot.on('pointerover', () => {
            // Changer le curseur
            this.input.setDefaultCursor('pointer');
            
            // Highlight visuel sur desktop
            if (!isMobile) {
                this.effectsManager.highlightObject(x, y, finalWidth, finalHeight, 500);
            }
        });
        
        hotspot.on('pointerout', () => {
            this.input.setDefaultCursor('default');
        });
        
        hotspot.on('pointerdown', () => {
            // Feedback visuel au touch
            if (isMobile) {
                this.effectsManager.pulseObject(hotspot, 1.1, 150);
            }
            
            // Son de clic
            audioManager.playClick();
            
            // Vérifier si un item est sélectionné dans l'inventaire
            const selectedItem = this.inventorySystem.getSelectedItem();
            if (selectedItem) {
                this.useItemOn(selectedItem, name);
            } else {
                onClick();
            }
        });
        
        this.sceneContainer.add(hotspot);
        return hotspot;
    }
    
    collectItem(itemKey, message, x = null, y = null) {
        // Position par défaut au centre si non spécifiée
        const posX = x || GAME_CONFIG.WIDTH / 2;
        const posY = y || GAME_CONFIG.HEIGHT / 2;
        
        // Effets visuels
        this.effectsManager.spawnCollectParticles(posX, posY, 15);
        this.effectsManager.flashScreen(0xD4A43E, 0.2, 150);
        this.effectsManager.showFloatingText(posX, posY - 50, '+1');
        
        // Ajouter à l'inventaire
        this.inventorySystem.addItem(itemKey);
        
        // Dialogue de collecte
        this.dialogueSystem.show([
            { speaker: 'FELIX', portrait: 'felix_action', text: message }
        ]);
        
        // Masquer l'objet dans le décor (en rechargeant la scène)
        // Pour l'instant on utilise les flags
    }
    
    useItemOn(item, target) {
        // Logique d'utilisation d'item sur un hotspot
        console.log(`🔧 Utiliser ${item} sur ${target}`);
        
        // Désélectionner l'item
        this.inventorySystem.deselectItem();
        
        // Logique spécifique par combinaison
        // À implémenter selon les puzzles
    }
    
    transitionToScene(sceneKey) {
        // Son de porte
        audioManager.playDoor();
        
        // Choisir une transition aléatoire pour plus de variété
        const transitions = ['fade', 'wipe', 'iris'];
        const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
        
        switch(randomTransition) {
            case 'wipe':
                this.effectsManager.wipeTransition(() => {
                    this.loadScene(sceneKey);
                }, 'left', 500);
                break;
            case 'iris':
                this.effectsManager.irisTransition(() => {
                    this.loadScene(sceneKey);
                }, 600);
                break;
            default:
                this.effectsManager.fadeTransition(() => {
                    this.loadScene(sceneKey);
                }, 400);
        }
    }
    
    // =============================================
    // SCÈNE 2 : LA CUISINE
    // =============================================
    createCuisineScene() {
        // Utiliser le module Scene2_Cuisine
        Scene2_Cuisine.create(this);
    }
    
    // =============================================
    // SCÈNE 3 : SALLE VIP
    // =============================================
    createVIPScene() {
        // Utiliser le module Scene3_VIP
        Scene3_VIP.create(this);
    }
    
    // =============================================
    // SCÈNE 4 : BUREAU
    // =============================================
    createBureauScene() {
        // Utiliser le module Scene4_Bureau
        Scene4_Bureau.create(this);
    }
    
    // =============================================
    // SCÈNE 5 : FINALE
    // =============================================
    createFinaleScene() {
        // Utiliser le module Scene5_Finale
        Scene5_Finale.create(this);
    }
}
