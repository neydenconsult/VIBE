/**
 * Scene3_VIP.js
 * Scène 3 : La Salle VIP du restaurant
 * 
 * OBJECTIF : Récupérer la clé du bureau de Rodolfo
 * PUZZLE : Servir du lait chaud à Mme Colvert pour l'endormir, puis prendre sa clé
 * PNJ : Mme Colvert (canard VIP), Bruno (gorille videur)
 */

const Scene3_VIP = {
    
    // Configuration de la scène
    config: {
        name: 'vip',
        decor: 'decor_vip',
        felix_start: { x: 100, y: 520 },
        felix_scale: 0.3
    },
    
    // Hotspots interactifs
    hotspots: [
        {
            id: 'mme_colvert',
            x: 700,
            y: 420,
            width: 120,
            height: 180,
            condition: () => true,
            action: 'interactMmeColvert'
        },
        {
            id: 'bar',
            x: 180,
            y: 350,
            width: 150,
            height: 200,
            condition: () => true,
            action: 'interactBar'
        },
        {
            id: 'aquarium',
            x: 1050,
            y: 450,
            width: 150,
            height: 180,
            condition: () => true,
            action: 'interactAquarium'
        },
        {
            id: 'tableau_rodolfo',
            x: 850,
            y: 250,
            width: 180,
            height: 220,
            condition: () => true,
            action: 'interactTableau'
        },
        {
            id: 'porte_bureau',
            x: 480,
            y: 350,
            width: 100,
            height: 180,
            condition: () => true,
            action: 'interactPorteBureau'
        },
        {
            id: 'bruno',
            x: 550,
            y: 480,
            width: 120,
            height: 180,
            condition: () => !GAME_STATE.flags.brunoPasse,
            action: 'talkToBruno'
        },
        {
            id: 'lustre',
            x: 400,
            y: 120,
            width: 150,
            height: 100,
            condition: () => true,
            action: 'interactLustre'
        },
        {
            id: 'retour_cuisine',
            x: 50,
            y: 400,
            width: 60,
            height: 200,
            condition: () => true,
            action: 'goBackCuisine'
        }
    ],
    
    // Dialogues de la scène
    dialogues: {
        
        // Introduction
        intro: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La salle VIP... Impressionnant." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Chandeliers, nappes blanches, aquarium à homards... Le luxe à l'état pur." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Cette dame canard là-bas a l'air... somnolente. Et elle porte une clé autour du cou !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Et ce gorille en costume garde la porte du fond. Ce doit être le bureau de Rodolfo." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Il me faut cette clé. Mais comment l'obtenir sans réveiller toute la salle ?" }
        ],
        
        // Mme Colvert - plusieurs états
        colvert_awake: [
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_somnolente', text: "*bâillement* Hmm ? Qu'est-ce que c'est ?" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Bonsoir Madame. Puis-je vous servir quelque chose ?" },
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_somnolente', text: "Oh... un serveur. *bâillement* J'attends mon dessert depuis une éternité..." },
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_somnolente', text: "Ce dîner m'a épuisée. Je boirais bien... un lait chaud." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Un lait chaud ? Parfait pour l'endormir complètement !)" }
        ],
        
        colvert_awake_again: [
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_somnolente', text: "*bâillement* Ce lait chaud... vous l'avez ?" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Je dois lui apporter un verre de lait chaud.)" }
        ],
        
        colvert_serve_milk: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Voici votre lait chaud, Madame." },
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_somnolente', text: "Ah, enfin... *boit lentement* Mmm... délicieux..." },
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_somnolente', text: "Je me sens... si... fatiguée..." },
            { speaker: 'MME_COLVERT', portrait: 'mme_colvert_endormie', text: "Zzz... Zzz..." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Parfait ! Elle dort profondément. Et cette clé autour de son cou..." }
        ],
        
        colvert_asleep: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Elle dort comme un bébé. La clé dorée brille sur son collier..." }
        ],
        
        colvert_take_key: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "*délicatement* Je vais juste... emprunter... cette clé..." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Et voilà ! Une magnifique clé dorée." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Elle doit ouvrir le bureau de Rodolfo. Mais il y a encore ce gorille..." }
        ],
        
        // Bar
        bar_first: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Un bar bien fourni. Champagnes, vins, spiritueux..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Tiens, une bouteille de 'Lait de Nuit'... C'est du lait chaud aromatisé." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Et voilà un verre vide. Ça pourrait servir." }
        ],
        
        bar_again: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le bar. J'ai déjà ce qu'il me faut." }
        ],
        
        // Aquarium
        aquarium: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Un aquarium rempli de homards vivants. Ils ont l'air... inquiets." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Pauvres bêtes. Au moins, ce soir, ce n'est pas moi qui serai au menu." }
        ],
        
        // Tableau de Rodolfo
        tableau: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Un portrait géant de Rodolfo... déguisé en empereur romain ?!" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Quelle modestie... 'Rodolfo Magnus, Imperator Culinarius'." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Ce type a vraiment un ego surdimensionné." }
        ],
        
        // Lustre
        lustre: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Un magnifique lustre en cristal. Il doit valoir une fortune." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Mieux vaut ne pas le faire tomber..." }
        ],
        
        // Bruno - dialogues variés
        bruno_first: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Bonsoir, je dois accéder au bureau pour..." },
            { speaker: 'BRUNO', portrait: 'bruno_bras_croises', text: "..." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "...pour livrer un message urgent au chef Rodolfo ?" },
            { speaker: 'BRUNO', portrait: 'bruno_bras_croises', text: "...Non." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Pas très bavard, celui-là. Et pas très coopératif non plus.)" }
        ],
        
        bruno_again: [
            { speaker: 'BRUNO', portrait: 'bruno_bras_croises', text: "...Non." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "(Il ne bougera pas sans une bonne raison...)" }
        ],
        
        bruno_with_key: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "J'ai la clé du bureau. Laissez-moi passer." },
            { speaker: 'BRUNO', portrait: 'bruno_bras_croises', text: "..." },
            { speaker: 'BRUNO', portrait: 'bruno_hochement', text: "*hoche la tête*" },
            { speaker: 'FELIX', portrait: 'felix_action', text: "(Il me laisse passer ! La clé fait autorité.)" }
        ],
        
        // Porte du bureau
        porte_locked: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La porte du bureau de Rodolfo. Fermée à clé, évidemment." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Et ce gorille ne me laissera jamais approcher sans la clé." }
        ],
        
        porte_has_key_but_bruno: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "J'ai la clé, mais le gorille bloque le passage." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Je devrais lui montrer que j'ai l'autorisation d'entrer." }
        ],
        
        porte_unlocked: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "La clé tourne dans la serrure... *clic*" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le bureau secret de Rodolfo m'attend !" }
        ],
        
        // Retour cuisine
        retour_cuisine: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Retourner à la cuisine ? Non, j'ai du travail ici." }
        ]
    },
    
    // État local de la scène
    state: {
        colvertTalkedOnce: false,
        brunoTalkedOnce: false,
        brunoConvinced: false
    },
    
    /**
     * Initialise la scène
     */
    create: function(gameScene) {
        this.gameScene = gameScene;
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Reset état local
        this.state = {
            colvertTalkedOnce: false,
            brunoTalkedOnce: false,
            brunoConvinced: false
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
        
        // Mme Colvert
        const colvertTexture = GAME_STATE.flags.mmeColvertEndormie ? 'mme_colvert_endormie' : 'mme_colvert_somnolente';
        this.colvertSprite = gameScene.add.image(720, 450, colvertTexture)
            .setScale(0.35)
            .setOrigin(0.5, 1);
        gameScene.sceneContainer.add(this.colvertSprite);
        
        // Bruno (si pas encore passé)
        if (!GAME_STATE.flags.brunoPasse) {
            this.brunoSprite = gameScene.add.image(550, 520, 'bruno_bras_croises')
                .setScale(0.35)
                .setOrigin(0.5, 1);
            gameScene.sceneContainer.add(this.brunoSprite);
        }
        
        // Créer les hotspots
        this.createHotspots(gameScene);
        
        // Dialogue d'introduction (première visite)
        if (!GAME_STATE.flags.introVIPDone) {
            gameScene.time.delayedCall(500, () => {
                gameScene.dialogueSystem.show(this.dialogues.intro, () => {
                    GAME_STATE.flags.introVIPDone = true;
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
            case 'interactMmeColvert':
                this.interactMmeColvert(gameScene);
                break;
            case 'interactBar':
                this.interactBar(gameScene);
                break;
            case 'interactAquarium':
                this.interactAquarium(gameScene);
                break;
            case 'interactTableau':
                this.interactTableau(gameScene);
                break;
            case 'interactPorteBureau':
                this.interactPorteBureau(gameScene);
                break;
            case 'talkToBruno':
                this.talkToBruno(gameScene);
                break;
            case 'interactLustre':
                this.interactLustre(gameScene);
                break;
            case 'goBackCuisine':
                this.goBackCuisine(gameScene);
                break;
        }
    },
    
    // === ACTIONS ===
    
    interactMmeColvert: function(gameScene) {
        // Vérifier si on a le verre de lait pour lui servir
        if (gameScene.inventorySystem.hasItem('verre_lait') && !GAME_STATE.flags.mmeColvertEndormie) {
            // Servir le lait
            GameUtils.removeFromInventory('verre_lait');
            gameScene.inventorySystem.refresh();
            
            // Effet de bulles de lait
            gameScene.effectsManager.spawnBubbles(720, 400, 10);
            
            gameScene.dialogueSystem.show(this.dialogues.colvert_serve_milk, () => {
                // Elle s'endort avec effet
                GAME_STATE.flags.mmeColvertEndormie = true;
                
                // Animation de fermeture des yeux
                gameScene.tweens.add({
                    targets: this.colvertSprite,
                    y: this.colvertSprite.y + 10,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        this.colvertSprite.setTexture('mme_colvert_endormie');
                        
                        // Petits "Zzz" qui flottent
                        for (let i = 0; i < 3; i++) {
                            gameScene.time.delayedCall(i * 400, () => {
                                gameScene.effectsManager.showFloatingText(
                                    720 + (Math.random() - 0.5) * 30,
                                    380,
                                    'Zzz',
                                    '#AAAAFF'
                                );
                            });
                        }
                    }
                });
            });
        }
        else if (GAME_STATE.flags.mmeColvertEndormie && !GAME_STATE.flags.hasCle) {
            // Elle dort, on peut prendre la clé
            gameScene.dialogueSystem.show(this.dialogues.colvert_take_key, () => {
                // Effet de brillance sur la clé
                gameScene.effectsManager.spawnStarParticles(720, 420, 10);
                gameScene.effectsManager.flashScreen(0xD4A43E, 0.3, 200);
                gameScene.effectsManager.showFloatingText(720, 380, '🔑 Clé dorée !', '#FFD700');
                
                gameScene.inventorySystem.addItem('cle_doree');
                GAME_STATE.flags.hasCle = true;
            });
        }
        else if (GAME_STATE.flags.mmeColvertEndormie && GAME_STATE.flags.hasCle) {
            // Elle dort et on a déjà la clé
            gameScene.dialogueSystem.show(this.dialogues.colvert_asleep);
        }
        else if (!this.state.colvertTalkedOnce) {
            // Premier dialogue
            gameScene.dialogueSystem.show(this.dialogues.colvert_awake, () => {
                this.state.colvertTalkedOnce = true;
            });
        }
        else {
            // Elle attend toujours son lait
            gameScene.dialogueSystem.show(this.dialogues.colvert_awake_again);
        }
    },
    
    interactBar: function(gameScene) {
        if (!GAME_STATE.flags.hasVerreVide && !GAME_STATE.flags.hasLait) {
            gameScene.dialogueSystem.show(this.dialogues.bar_first, () => {
                // Obtenir le verre vide et la bouteille de lait
                gameScene.inventorySystem.addItem('verre_vide');
                GAME_STATE.flags.hasVerreVide = true;
                
                gameScene.time.delayedCall(500, () => {
                    gameScene.inventorySystem.addItem('lait_bouteille');
                    GAME_STATE.flags.hasLait = true;
                });
            });
        } else {
            gameScene.dialogueSystem.show(this.dialogues.bar_again);
        }
    },
    
    interactAquarium: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.aquarium);
    },
    
    interactTableau: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.tableau);
    },
    
    interactLustre: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.lustre);
    },
    
    talkToBruno: function(gameScene) {
        if (GAME_STATE.flags.hasCle && !this.state.brunoConvinced) {
            // On a la clé, Bruno nous laisse passer
            gameScene.dialogueSystem.show(this.dialogues.bruno_with_key, () => {
                this.state.brunoConvinced = true;
                GAME_STATE.flags.brunoPasse = true;
                
                // Bruno fait un pas de côté
                if (this.brunoSprite) {
                    this.brunoSprite.setTexture('bruno_hochement');
                    gameScene.tweens.add({
                        targets: this.brunoSprite,
                        x: 650,
                        duration: 800,
                        ease: 'Power2'
                    });
                }
            });
        }
        else if (!this.state.brunoTalkedOnce) {
            gameScene.dialogueSystem.show(this.dialogues.bruno_first, () => {
                this.state.brunoTalkedOnce = true;
            });
        }
        else {
            gameScene.dialogueSystem.show(this.dialogues.bruno_again);
        }
    },
    
    interactPorteBureau: function(gameScene) {
        if (!GAME_STATE.flags.hasCle) {
            // Pas de clé
            gameScene.dialogueSystem.show(this.dialogues.porte_locked);
        }
        else if (!GAME_STATE.flags.brunoPasse) {
            // Clé mais Bruno bloque
            gameScene.dialogueSystem.show(this.dialogues.porte_has_key_but_bruno);
        }
        else {
            // Clé + Bruno écarté = on peut entrer
            gameScene.dialogueSystem.show(this.dialogues.porte_unlocked, () => {
                gameScene.transitionToScene('bureau');
            });
        }
    },
    
    goBackCuisine: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.retour_cuisine);
    }
};
