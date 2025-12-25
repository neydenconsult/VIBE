/**
 * Scene5_Finale.js
 * Scène 5 : La Confrontation Finale
 * 
 * OBJECTIF : Saboter le Soufflé Impérial et vaincre Rodolfo
 * PUZZLE : Créer un mélange instable (sel + vinaigre + bicarbonate) et le verser dans le soufflé
 * BOSS : Rodolfo Ratoni
 */

const Scene5_Finale = {
    
    // Configuration de la scène
    config: {
        name: 'finale',
        decor: 'decor_finale',
        felix_start: { x: 150, y: 520 },
        felix_scale: 0.3
    },
    
    // Hotspots interactifs
    hotspots: [
        {
            id: 'souffle',
            x: 550,
            y: 380,
            width: 180,
            height: 150,
            condition: () => true,
            action: 'interactSouffle'
        },
        {
            id: 'etagere_ingredients',
            x: 280,
            y: 300,
            width: 150,
            height: 200,
            condition: () => true,
            action: 'interactEtagere'
        },
        {
            id: 'sel',
            x: 250,
            y: 350,
            width: 50,
            height: 70,
            condition: () => !GAME_STATE.flags.hasSel,
            action: 'collectSel'
        },
        {
            id: 'vinaigre',
            x: 320,
            y: 340,
            width: 40,
            height: 80,
            condition: () => !GAME_STATE.flags.hasVinaigre,
            action: 'collectVinaigre'
        },
        {
            id: 'bicarbonate',
            x: 380,
            y: 360,
            width: 50,
            height: 60,
            condition: () => !GAME_STATE.flags.hasBicarbonate,
            action: 'collectBicarbonate'
        },
        {
            id: 'rodolfo',
            x: 900,
            y: 450,
            width: 150,
            height: 200,
            condition: () => !GAME_STATE.flags.souffleDetruit,
            action: 'interactRodolfo'
        },
        {
            id: 'sortie',
            x: 780,
            y: 350,
            width: 80,
            height: 150,
            condition: () => GAME_STATE.flags.souffleDetruit,
            action: 'finishGame'
        }
    ],
    
    // Dialogues de la scène
    dialogues: {
        
        // Introduction
        intro: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La cuisine... en mode confrontation finale." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Rodolfo est là, surveillant son précieux Soufflé Impérial." },
            { speaker: 'RODOLFO', portrait: 'rodolfo_dos', text: "Mon chef-d'œuvre... Bientôt les critiques goûteront à la perfection !" },
            { speaker: 'FELIX', portrait: 'felix_action', text: "(Je dois saboter ce soufflé avant qu'il ne soit servi !)" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Un mélange de sel, vinaigre et bicarbonate devrait créer une réaction... explosive.)" }
        ],
        
        // Rodolfo - dialogues
        rodolfo_working: [
            { speaker: 'RODOLFO', portrait: 'rodolfo_dos', text: "Hmm ? Qui ose me déranger pendant la création ?!" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Euh... Je vérifie les ingrédients, chef !" },
            { speaker: 'RODOLFO', portrait: 'rodolfo_menacant', text: "Tu n'as pas intérêt à t'approcher de MON soufflé, le bleu !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Il est vraiment sur ses gardes... Je dois agir vite.)" }
        ],
        
        rodolfo_suspicious: [
            { speaker: 'RODOLFO', portrait: 'rodolfo_menacant', text: "Je t'ai à l'œil, le nouveau. Un faux pas et tu es FINI !" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "(Charmant personnage...)" }
        ],
        
        // Ingrédients
        collect_sel: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Du gros sel de mer. Premier ingrédient de ma potion." }
        ],
        
        collect_vinaigre: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Du vinaigre balsamique explosif. Ça va faire des bulles !" }
        ],
        
        collect_bicarbonate: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Bicarbonate de soude. L'ingrédient clé de ma réaction chimique." }
        ],
        
        etagere: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Une étagère pleine d'ingrédients. Tout ce qu'il faut pour créer le chaos." }
        ],
        
        // Soufflé
        souffle_no_mixture: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le fameux Soufflé Impérial au Fromage Fantôme..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "L'odeur est... indescriptible. Je dois le saboter !" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Il me faut un mélange instable pour le faire exploser." }
        ],
        
        souffle_with_mixture: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "C'est le moment ! Je verse le mélange instable dans le soufflé..." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Et maintenant... on recule !" }
        ],
        
        // Explosion du soufflé
        explosion: [
            { speaker: 'RODOLFO', portrait: 'rodolfo_menacant', text: "Qu'est-ce que— MON SOUFFLÉ !!!" },
            { speaker: 'FELIX', portrait: 'felix_action', text: "BOOM ! 💥" },
            { speaker: 'RODOLFO', portrait: 'rodolfo_pleure', text: "NOOOoooon ! Mon chef-d'œuvre ! Des mois de préparation ! RUINÉ !" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Désolé Rodolfo, mais le Fromage Fantôme est illégal pour une bonne raison." },
            { speaker: 'RODOLFO', portrait: 'rodolfo_pleure', text: "*sanglots* Ma réputation... Mon restaurant... Tout est fini !" },
            { speaker: 'FELIX', portrait: 'felix_victoire', text: "Mission accomplie ! Le Soufflé Impérial ne sera jamais servi." }
        ],
        
        // Fin du jeu
        victory: [
            { speaker: 'FELIX', portrait: 'felix_victoire', text: "Opération Fromage : SUCCÈS ! 🧀" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Les critiques culinaires sont saufs, et Rodolfo devra répondre de ses crimes." },
            { speaker: 'FELIX', portrait: 'felix_victoire', text: "Agent Renard, terminé. À la prochaine mission !" }
        ],
        
        // Sortie bloquée
        sortie_blocked: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Je ne peux pas partir maintenant ! Le soufflé est toujours intact." }
        ]
    },
    
    // État local de la scène
    state: {
        rodolfoTalkedOnce: false,
        explosionTriggered: false
    },
    
    /**
     * Initialise la scène
     */
    create: function(gameScene) {
        this.gameScene = gameScene;
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Reset état local
        this.state = {
            rodolfoTalkedOnce: false,
            explosionTriggered: false
        };
        
        // Décor
        const decor = gameScene.add.image(WIDTH / 2, HEIGHT / 2, this.config.decor)
            .setDisplaySize(WIDTH, HEIGHT);
        gameScene.sceneContainer.add(decor);
        
        // Félix
        gameScene.felix = gameScene.add.image(
            this.config.felix_start.x, 
            this.config.felix_start.y, 
            'felix_idle'
        )
        .setScale(this.config.felix_scale)
        .setOrigin(0.5, 1);
        gameScene.sceneContainer.add(gameScene.felix);
        
        // Rodolfo (si soufflé pas encore détruit)
        if (!GAME_STATE.flags.souffleDetruit) {
            this.rodolfoSprite = gameScene.add.image(900, 500, 'rodolfo_dos')
                .setScale(0.35)
                .setOrigin(0.5, 1);
            gameScene.sceneContainer.add(this.rodolfoSprite);
        } else {
            // Rodolfo pleure dans un coin
            this.rodolfoSprite = gameScene.add.image(1100, 550, 'rodolfo_pleure')
                .setScale(0.3)
                .setOrigin(0.5, 1);
            gameScene.sceneContainer.add(this.rodolfoSprite);
        }
        
        // Créer les hotspots
        this.createHotspots(gameScene);
        
        // Dialogue d'introduction (première visite)
        if (!GAME_STATE.flags.introFinaleDone) {
            gameScene.time.delayedCall(500, () => {
                gameScene.dialogueSystem.show(this.dialogues.intro, () => {
                    GAME_STATE.flags.introFinaleDone = true;
                });
            });
        }
    },
    
    /**
     * Crée tous les hotspots de la scène
     */
    createHotspots: function(gameScene) {
        this.hotspots.forEach(hotspot => {
            if (hotspot.condition()) {
                gameScene.createHotspot(
                    hotspot.x, 
                    hotspot.y, 
                    hotspot.width, 
                    hotspot.height, 
                    hotspot.id,
                    () => this.handleAction(hotspot.action, gameScene)
                );
            }
        });
    },
    
    /**
     * Gère les actions des hotspots
     */
    handleAction: function(action, gameScene) {
        switch(action) {
            case 'interactSouffle':
                this.interactSouffle(gameScene);
                break;
            case 'interactEtagere':
                this.interactEtagere(gameScene);
                break;
            case 'collectSel':
                this.collectSel(gameScene);
                break;
            case 'collectVinaigre':
                this.collectVinaigre(gameScene);
                break;
            case 'collectBicarbonate':
                this.collectBicarbonate(gameScene);
                break;
            case 'interactRodolfo':
                this.interactRodolfo(gameScene);
                break;
            case 'finishGame':
                this.finishGame(gameScene);
                break;
        }
    },
    
    // === ACTIONS ===
    
    collectSel: function(gameScene) {
        gameScene.inventorySystem.addItem('sel');
        GAME_STATE.flags.hasSel = true;
        gameScene.dialogueSystem.show(this.dialogues.collect_sel, () => {
            this.checkMixture(gameScene);
        });
    },
    
    collectVinaigre: function(gameScene) {
        gameScene.inventorySystem.addItem('vinaigre');
        GAME_STATE.flags.hasVinaigre = true;
        gameScene.dialogueSystem.show(this.dialogues.collect_vinaigre, () => {
            this.checkMixture(gameScene);
        });
    },
    
    collectBicarbonate: function(gameScene) {
        gameScene.inventorySystem.addItem('bicarbonate');
        GAME_STATE.flags.hasBicarbonate = true;
        gameScene.dialogueSystem.show(this.dialogues.collect_bicarbonate, () => {
            this.checkMixture(gameScene);
        });
    },
    
    checkMixture: function(gameScene) {
        // Vérifier si on a les 3 ingrédients
        if (GAME_STATE.flags.hasSel && GAME_STATE.flags.hasVinaigre && GAME_STATE.flags.hasBicarbonate) {
            // Créer automatiquement le mélange
            gameScene.time.delayedCall(500, () => {
                GameUtils.removeFromInventory('sel');
                GameUtils.removeFromInventory('vinaigre');
                GameUtils.removeFromInventory('bicarbonate');
                gameScene.inventorySystem.addItem('melange_instable');
                GAME_STATE.flags.hasMelangeInstable = true;
                gameScene.inventorySystem.refresh();
                
                gameScene.dialogueSystem.show([
                    { speaker: 'FELIX', portrait: 'felix_action', text: "Sel + Vinaigre + Bicarbonate = Mélange Instable ! 🧪" },
                    { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Attention, ça mousse ! Il faut vite l'utiliser sur le soufflé !" }
                ]);
            });
        }
    },
    
    interactEtagere: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.etagere);
    },
    
    interactSouffle: function(gameScene) {
        if (GAME_STATE.flags.souffleDetruit) {
            gameScene.dialogueSystem.show([
                { speaker: 'FELIX', portrait: 'felix_idle', text: "Les restes du Soufflé Impérial. Plus qu'un tas de mousse puante." }
            ]);
        }
        else if (gameScene.inventorySystem.hasItem('melange_instable')) {
            // On a le mélange ! Sabotage !
            gameScene.dialogueSystem.show(this.dialogues.souffle_with_mixture, () => {
                this.triggerExplosion(gameScene);
            });
        }
        else {
            gameScene.dialogueSystem.show(this.dialogues.souffle_no_mixture);
        }
    },
    
    triggerExplosion: function(gameScene) {
        // Retirer le mélange de l'inventaire
        GameUtils.removeFromInventory('melange_instable');
        gameScene.inventorySystem.refresh();
        
        // Son d'explosion
        audioManager.playExplosion();
        
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // === EXPLOSION ÉPIQUE ===
        
        // Shake caméra intense
        gameScene.effectsManager.shakeCamera(0.03, 800);
        
        // Multiple vagues de particules
        gameScene.effectsManager.spawnExplosionParticles(550, 380, 30);
        
        gameScene.time.delayedCall(100, () => {
            gameScene.effectsManager.spawnExplosionParticles(520, 350, 20);
        });
        
        gameScene.time.delayedCall(200, () => {
            gameScene.effectsManager.spawnExplosionParticles(580, 400, 20);
        });
        
        // Fumée intense
        gameScene.time.delayedCall(300, () => {
            gameScene.effectsManager.spawnSmokeParticles(550, 350, 20);
        });
        
        // Bulles de mousse (réaction chimique)
        for (let i = 0; i < 5; i++) {
            gameScene.time.delayedCall(i * 100, () => {
                gameScene.effectsManager.spawnBubbles(
                    550 + (Math.random() - 0.5) * 100,
                    380,
                    6
                );
            });
        }
        
        // Flash orange intense
        gameScene.effectsManager.flashScreen(0xFF8800, 0.8, 400);
        
        // Cercles d'onde de choc multiples
        for (let i = 0; i < 3; i++) {
            gameScene.time.delayedCall(i * 150, () => {
                const wave = gameScene.add.circle(550, 380, 20, 0xFFFFFF, 0)
                    .setStrokeStyle(3 - i, 0xFFAA00)
                    .setDepth(2000);
                
                gameScene.tweens.add({
                    targets: wave,
                    scale: 10 - i * 2,
                    alpha: 0,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => wave.destroy()
                });
            });
        }
        
        // Dialogue d'explosion
        gameScene.time.delayedCall(900, () => {
            // Changer la pose de Rodolfo
            if (this.rodolfoSprite) {
                this.rodolfoSprite.setTexture('rodolfo_menacant');
            }
            
            gameScene.dialogueSystem.show(this.dialogues.explosion, () => {
                GAME_STATE.flags.souffleDetruit = true;
                this.state.explosionTriggered = true;
                
                // Rodolfo pleure
                if (this.rodolfoSprite) {
                    this.rodolfoSprite.setTexture('rodolfo_pleure');
                    
                    // Animation de secouement (pleurs)
                    gameScene.effectsManager.shakeSprite(this.rodolfoSprite, 3, 1000);
                    
                    // Larmes qui tombent
                    const tearInterval = gameScene.time.addEvent({
                        delay: 300,
                        callback: () => {
                            const tear = gameScene.add.circle(
                                this.rodolfoSprite.x + (Math.random() - 0.5) * 20,
                                this.rodolfoSprite.y - 80,
                                4,
                                0x4444FF,
                                0.8
                            ).setDepth(1500);
                            
                            gameScene.tweens.add({
                                targets: tear,
                                y: tear.y + 60,
                                alpha: 0,
                                duration: 500,
                                onComplete: () => tear.destroy()
                            });
                        },
                        repeat: 5
                    });
                    
                    // Il recule
                    gameScene.tweens.add({
                        targets: this.rodolfoSprite,
                        x: 1100,
                        duration: 1500,
                        ease: 'Power2'
                    });
                }
                
                // Félix fait sa pose de victoire
                gameScene.felix.setTexture('felix_victoire');
                
                // Recharger pour afficher le hotspot de sortie
                gameScene.time.delayedCall(2000, () => {
                    gameScene.loadScene('finale');
                });
            });
        });
    },
    
    interactRodolfo: function(gameScene) {
        if (!this.state.rodolfoTalkedOnce) {
            // Rodolfo se retourne
            if (this.rodolfoSprite) {
                this.rodolfoSprite.setTexture('rodolfo_menacant');
            }
            gameScene.dialogueSystem.show(this.dialogues.rodolfo_working, () => {
                this.state.rodolfoTalkedOnce = true;
                // Rodolfo retourne à son travail
                if (this.rodolfoSprite) {
                    this.rodolfoSprite.setTexture('rodolfo_dos');
                }
            });
        } else {
            if (this.rodolfoSprite) {
                this.rodolfoSprite.setTexture('rodolfo_menacant');
            }
            gameScene.dialogueSystem.show(this.dialogues.rodolfo_suspicious, () => {
                if (this.rodolfoSprite) {
                    this.rodolfoSprite.setTexture('rodolfo_dos');
                }
            });
        }
    },
    
    finishGame: function(gameScene) {
        if (!GAME_STATE.flags.souffleDetruit) {
            gameScene.dialogueSystem.show(this.dialogues.sortie_blocked);
            return;
        }
        
        // Son de victoire
        audioManager.playSuccess();
        
        // Dialogue de victoire
        gameScene.dialogueSystem.show(this.dialogues.victory, () => {
            // Écran de fin
            this.showEndScreen(gameScene);
        });
    },
    
    showEndScreen: function(gameScene) {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Arrêter la musique
        audioManager.stopMusic();
        
        // Overlay noir
        const overlay = gameScene.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, 0x000000, 0)
            .setDepth(3000);
        
        gameScene.tweens.add({
            targets: overlay,
            alpha: 1,
            duration: 1500,
            onComplete: () => {
                // === CONFETTIS DE VICTOIRE ===
                const confettiColors = [0xD4A43E, 0xF5E6C8, 0xFF6B6B, 0x4ECDC4, 0xFFE66D, 0x95E1D3];
                
                // Lancer des confettis en continu
                const confettiInterval = gameScene.time.addEvent({
                    delay: 50,
                    callback: () => {
                        for (let i = 0; i < 3; i++) {
                            const x = Math.random() * WIDTH;
                            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                            const size = 5 + Math.random() * 8;
                            
                            const confetti = gameScene.add.rectangle(x, -20, size, size * 2, color)
                                .setDepth(3002)
                                .setRotation(Math.random() * Math.PI);
                            
                            gameScene.tweens.add({
                                targets: confetti,
                                y: HEIGHT + 50,
                                x: x + (Math.random() - 0.5) * 200,
                                rotation: confetti.rotation + Math.PI * 4,
                                duration: 2000 + Math.random() * 1000,
                                ease: 'Linear',
                                onComplete: () => confetti.destroy()
                            });
                        }
                    },
                    repeat: 60
                });
                
                // Texte de fin
                const titleText = gameScene.add.text(WIDTH/2, HEIGHT/3, '🦊 MISSION ACCOMPLIE', {
                    fontFamily: 'Georgia, serif',
                    fontSize: '48px',
                    color: '#D4A43E',
                    fontStyle: 'bold'
                }).setOrigin(0.5).setDepth(3001).setAlpha(0);
                
                const subtitleText = gameScene.add.text(WIDTH/2, HEIGHT/2, 'Agent Renard : Opération Fromage', {
                    fontFamily: 'Georgia, serif',
                    fontSize: '32px',
                    color: '#F5E6C8'
                }).setOrigin(0.5).setDepth(3001).setAlpha(0);
                
                const thanksText = gameScene.add.text(WIDTH/2, HEIGHT/2 + 80, 'Merci d\'avoir joué !', {
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '24px',
                    color: '#FFFFFF'
                }).setOrigin(0.5).setDepth(3001).setAlpha(0);
                
                // Animations d'apparition
                gameScene.tweens.add({
                    targets: titleText,
                    alpha: 1,
                    y: HEIGHT/3 - 20,
                    duration: 800,
                    ease: 'Back.easeOut'
                });
                
                gameScene.tweens.add({
                    targets: subtitleText,
                    alpha: 1,
                    delay: 300,
                    duration: 600,
                    ease: 'Power2'
                });
                
                gameScene.tweens.add({
                    targets: thanksText,
                    alpha: 1,
                    delay: 600,
                    duration: 600,
                    ease: 'Power2'
                });
                
                // Bouton rejouer
                const replayBtn = gameScene.add.text(WIDTH/2, HEIGHT - 100, '[ REJOUER ]', {
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '28px',
                    color: '#D4A43E'
                })
                .setOrigin(0.5)
                .setDepth(3001)
                .setAlpha(0)
                .setInteractive({ useHandCursor: true });
                
                gameScene.tweens.add({
                    targets: replayBtn,
                    alpha: 1,
                    delay: 1000,
                    duration: 600
                });
                
                // Animation de pulsation du bouton
                gameScene.tweens.add({
                    targets: replayBtn,
                    scale: { from: 1, to: 1.1 },
                    delay: 1500,
                    duration: 500,
                    yoyo: true,
                    repeat: -1
                });
                
                replayBtn.on('pointerover', () => replayBtn.setColor('#F5E6C8'));
                replayBtn.on('pointerout', () => replayBtn.setColor('#D4A43E'));
                replayBtn.on('pointerdown', () => {
                    audioManager.playClick();
                    // Reset complet du jeu
                    this.resetGame();
                    gameScene.scene.start('TitleScene');
                });
            }
        });
    },
    
    resetGame: function() {
        // Reset tous les flags
        for (let key in GAME_STATE.flags) {
            GAME_STATE.flags[key] = false;
        }
        // Reset inventaire
        GAME_STATE.inventory = [];
        GAME_STATE.enteredCode = '';
    }
};
