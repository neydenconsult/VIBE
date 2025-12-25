/**
 * Scene2_Cuisine.js
 * Scène 2 : La Cuisine du restaurant
 * 
 * OBJECTIF : Créer une diversion pour accéder à la salle VIP
 * PUZZLE : Combiner Piment + Chantilly + Casserole = Bombe Culinaire
 * PNJ : Gustave (sous-chef cochon stressé)
 */

const Scene2_Cuisine = {
    
    // Configuration de la scène
    config: {
        name: 'cuisine',
        decor: 'decor_cuisine',
        felix_start: { x: 150, y: 520 },
        felix_scale: 0.35
    },
    
    // Hotspots interactifs
    hotspots: [
        {
            id: 'piment',
            x: 320,
            y: 480,
            width: 40,
            height: 60,
            condition: () => !GAME_STATE.flags.hasPiment,
            action: 'collectPiment'
        },
        {
            id: 'frigo',
            x: 950,
            y: 400,
            width: 120,
            height: 200,
            condition: () => true,
            action: 'interactFrigo'
        },
        {
            id: 'etagere_epices',
            x: 380,
            y: 280,
            width: 150,
            height: 80,
            condition: () => true,
            action: 'interactEtagere'
        },
        {
            id: 'casseroles',
            x: 550,
            y: 180,
            width: 200,
            height: 60,
            condition: () => !GAME_STATE.flags.hasCasserole,
            action: 'collectCasserole'
        },
        {
            id: 'fourneau',
            x: 550,
            y: 380,
            width: 180,
            height: 120,
            condition: () => true,
            action: 'interactFourneau'
        },
        {
            id: 'porte_vip',
            x: 780,
            y: 350,
            width: 100,
            height: 180,
            condition: () => true,
            action: 'interactPorteVIP'
        },
        {
            id: 'gustave',
            x: 650,
            y: 480,
            width: 100,
            height: 150,
            condition: () => !GAME_STATE.flags.gustavePanique,
            action: 'talkToGustave'
        },
        {
            id: 'retour_ruelle',
            x: 50,
            y: 400,
            width: 60,
            height: 200,
            condition: () => true,
            action: 'goBackRuelle'
        }
    ],
    
    // Dialogues de la scène
    dialogues: {
        
        // Introduction
        intro: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Me voilà dans la cuisine ! Quel chaos..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Des casseroles partout, de la vapeur, des cris... C'est l'enfer des cuisiniers." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La porte VIP est là-bas, mais ce cochon en tenue de chef la surveille." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Il me faut une diversion pour l'éloigner..." }
        ],
        
        // Collecte piment
        collectPiment: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Un piment rouge bien épicé ! 🌶️" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Ça pourrait servir à créer une réaction... explosive." }
        ],
        
        // Collecte casserole
        collectCasserole: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Une belle casserole en cuivre. Parfaite pour mes plans." }
        ],
        
        // Frigo - trouver la chantilly
        frigoFirst: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Un grand frigo industriel. Voyons ce qu'il y a dedans..." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "De la crème, du beurre, et... une bombe de chantilly !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Le gaz propulseur pourrait être utile..." }
        ],
        
        frigoEmpty: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "J'ai déjà pris ce dont j'avais besoin ici." }
        ],
        
        // Étagère épices
        etagere: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Des épices du monde entier. Safran, cumin, paprika..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Impressionnant, mais je n'en ai pas besoin pour l'instant." }
        ],
        
        // Fourneau
        fourneauNormal: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Les fourneaux sont en pleine activité. Ça bouillonne de partout." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Si je mettais quelque chose de... spécial là-dedans..." }
        ],
        
        fourneauWithBomb: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "C'est le moment ! Je dépose la bombe culinaire sur le feu..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Dans quelques secondes, ça va faire du bruit !" }
        ],
        
        // Porte VIP
        porteVIP_blocked: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La porte vers la salle VIP. C'est par là que je dois aller." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Mais ce Gustave ne me laissera jamais passer..." }
        ],
        
        porteVIP_accessible: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "La voie est libre ! Profitons-en !" }
        ],
        
        // Gustave - dialogues variés
        gustave_first: [
            { speaker: 'GUSTAVE', portrait: 'gustave_idle', text: "Hé toi ! Le nouveau ! Tu fais quoi là ?!" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Euh... Je suis le nouveau commis, chef !" },
            { speaker: 'GUSTAVE', portrait: 'gustave_idle', text: "Hmph. On a pas le temps pour les bleus. SERVICE DANS 10 MINUTES !" },
            { speaker: 'GUSTAVE', portrait: 'gustave_panique', text: "Et je dois surveiller cette fichue porte VIP ! Le chef Rodolfo ne veut PERSONNE là-bas !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Il a l'air très stressé... et très attaché à son poste.)" }
        ],
        
        gustave_again: [
            { speaker: 'GUSTAVE', portrait: 'gustave_panique', text: "Pas le temps de parler ! SERVICE ! STRESS ! AAAAH !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Il ne bougera pas de là sans une bonne raison...)" }
        ],
        
        gustave_withBomb: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Chef Gustave, j'ai préparé quelque chose de spécial..." },
            { speaker: 'GUSTAVE', portrait: 'gustave_idle', text: "Quoi ?! Montre-moi ça, le bleu !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Pas encore... Je dois d'abord l'activer sur le fourneau.)" }
        ],
        
        // Explosion / Diversion
        explosion: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "3... 2... 1..." },
            { speaker: 'GUSTAVE', portrait: 'gustave_panique', text: "QU'EST-CE QUE— ?! 💥" },
            { speaker: 'GUSTAVE', portrait: 'gustave_panique', text: "LA CASSEROLE EXPLOSE ! AU FEU ! À L'AIDE !" },
            { speaker: 'FELIX', portrait: 'felix_action', text: "(Parfait ! Il abandonne son poste !)" }
        ],
        
        // Retour ruelle
        retourRuelle: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Retourner dans la ruelle ? Non, j'ai du travail ici." }
        ]
    },
    
    // État local de la scène
    state: {
        gustaveTalkedOnce: false,
        bombPlaced: false,
        explosionTriggered: false
    },
    
    /**
     * Initialise la scène
     */
    create: function(gameScene) {
        this.gameScene = gameScene;
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
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
        
        // Gustave (si pas en panique)
        if (!GAME_STATE.flags.gustavePanique) {
            this.gustaveSprite = gameScene.add.image(650, 480, 'gustave_idle')
                .setScale(0.35)
                .setOrigin(0.5, 1);
            gameScene.sceneContainer.add(this.gustaveSprite);
        }
        
        // Créer les hotspots
        this.createHotspots(gameScene);
        
        // Dialogue d'introduction (première visite)
        if (!GAME_STATE.flags.introCuisineDone) {
            gameScene.time.delayedCall(500, () => {
                gameScene.dialogueSystem.show(this.dialogues.intro, () => {
                    GAME_STATE.flags.introCuisineDone = true;
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
            case 'collectPiment':
                this.collectPiment(gameScene);
                break;
            case 'collectCasserole':
                this.collectCasserole(gameScene);
                break;
            case 'interactFrigo':
                this.interactFrigo(gameScene);
                break;
            case 'interactEtagere':
                this.interactEtagere(gameScene);
                break;
            case 'interactFourneau':
                this.interactFourneau(gameScene);
                break;
            case 'interactPorteVIP':
                this.interactPorteVIP(gameScene);
                break;
            case 'talkToGustave':
                this.talkToGustave(gameScene);
                break;
            case 'goBackRuelle':
                this.goBackRuelle(gameScene);
                break;
        }
    },
    
    // === ACTIONS ===
    
    collectPiment: function(gameScene) {
        gameScene.inventorySystem.addItem('piment');
        GAME_STATE.flags.hasPiment = true;
        gameScene.dialogueSystem.show(this.dialogues.collectPiment);
        // Recharger pour masquer le hotspot
        gameScene.time.delayedCall(2000, () => gameScene.loadScene('cuisine'));
    },
    
    collectCasserole: function(gameScene) {
        gameScene.inventorySystem.addItem('casserole');
        GAME_STATE.flags.hasCasserole = true;
        gameScene.dialogueSystem.show(this.dialogues.collectCasserole);
        gameScene.time.delayedCall(2000, () => gameScene.loadScene('cuisine'));
    },
    
    interactFrigo: function(gameScene) {
        if (!GAME_STATE.flags.hasChantilly) {
            gameScene.dialogueSystem.show(this.dialogues.frigoFirst, () => {
                gameScene.inventorySystem.addItem('chantilly');
                GAME_STATE.flags.hasChantilly = true;
            });
        } else {
            gameScene.dialogueSystem.show(this.dialogues.frigoEmpty);
        }
    },
    
    interactEtagere: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.etagere);
    },
    
    interactFourneau: function(gameScene) {
        // Vérifier si on a la bombe culinaire
        if (gameScene.inventorySystem.hasItem('bombe_culinaire')) {
            gameScene.dialogueSystem.show(this.dialogues.fourneauWithBomb, () => {
                this.triggerExplosion(gameScene);
            });
        } else {
            gameScene.dialogueSystem.show(this.dialogues.fourneauNormal);
        }
    },
    
    triggerExplosion: function(gameScene) {
        // Retirer la bombe de l'inventaire
        GameUtils.removeFromInventory('bombe_culinaire');
        gameScene.inventorySystem.refresh();
        
        // Son d'explosion
        audioManager.playExplosion();
        
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Shake caméra
        gameScene.effectsManager.shakeCamera(0.02, 500);
        
        // Particules d'explosion
        gameScene.effectsManager.spawnExplosionParticles(550, 380, 25);
        
        // Fumée
        gameScene.time.delayedCall(200, () => {
            gameScene.effectsManager.spawnSmokeParticles(550, 350, 15);
        });
        
        // Flash rouge
        gameScene.effectsManager.flashScreen(0xFF4400, 0.7, 300);
        
        // Animation d'explosion
        const explosionCircle = gameScene.add.circle(550, 380, 20, 0xFF8800)
            .setDepth(2000);
        
        gameScene.tweens.add({
            targets: explosionCircle,
            scale: 5,
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => explosionCircle.destroy()
        });
        
        // Dialogue d'explosion
        gameScene.time.delayedCall(600, () => {
            gameScene.dialogueSystem.show(this.dialogues.explosion, () => {
                // Gustave part en courant
                GAME_STATE.flags.gustavePanique = true;
                GAME_STATE.flags.explosionTriggered = true;
                
                // Animation Gustave qui court
                if (this.gustaveSprite) {
                    // D'abord il tremble de peur
                    gameScene.effectsManager.shakeSprite(this.gustaveSprite, 5, 300);
                    
                    gameScene.time.delayedCall(300, () => {
                        this.gustaveSprite.setTexture('gustave_courir');
                        
                        // Animation de course
                        gameScene.tweens.add({
                            targets: this.gustaveSprite,
                            x: -100,
                            duration: 800,
                            ease: 'Power2',
                            onUpdate: () => {
                                // Petits nuages de poussière
                                if (Math.random() > 0.7) {
                                    const dust = gameScene.add.circle(
                                        this.gustaveSprite.x + 30,
                                        this.gustaveSprite.y - 20,
                                        5,
                                        0x888888,
                                        0.5
                                    ).setDepth(1000);
                                    
                                    gameScene.tweens.add({
                                        targets: dust,
                                        y: dust.y - 20,
                                        alpha: 0,
                                        scale: 2,
                                        duration: 300,
                                        onComplete: () => dust.destroy()
                                    });
                                }
                            },
                            onComplete: () => {
                                this.gustaveSprite.destroy();
                                // Recharger la scène
                                gameScene.loadScene('cuisine');
                            }
                        });
                    });
                }
            });
        });
    },
    
    interactPorteVIP: function(gameScene) {
        if (GAME_STATE.flags.gustavePanique) {
            // Gustave est parti, on peut passer !
            gameScene.dialogueSystem.show(this.dialogues.porteVIP_accessible, () => {
                gameScene.transitionToScene('vip');
            });
        } else {
            // Gustave bloque encore
            gameScene.dialogueSystem.show(this.dialogues.porteVIP_blocked);
        }
    },
    
    talkToGustave: function(gameScene) {
        if (!this.state.gustaveTalkedOnce) {
            gameScene.dialogueSystem.show(this.dialogues.gustave_first, () => {
                this.state.gustaveTalkedOnce = true;
            });
        } else if (gameScene.inventorySystem.hasItem('bombe_culinaire')) {
            gameScene.dialogueSystem.show(this.dialogues.gustave_withBomb);
        } else {
            gameScene.dialogueSystem.show(this.dialogues.gustave_again);
        }
    },
    
    goBackRuelle: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.retourRuelle);
    }
};
