/**
 * Scene4_Bureau.js
 * Scène 4 : Le Bureau Secret de Rodolfo
 * 
 * OBJECTIF : Ouvrir le coffre-fort et récupérer la recette secrète
 * PUZZLE : Trouver le code 4729 caché dans le menu doré avec la loupe
 * MINI-JEU : Digicode interactif
 */

const Scene4_Bureau = {
    
    // Configuration de la scène
    config: {
        name: 'bureau',
        decor: 'decor_bureau',
        felix_start: { x: 150, y: 520 },
        felix_scale: 0.3
    },
    
    // Hotspots interactifs
    hotspots: [
        {
            id: 'coffre',
            x: 380,
            y: 380,
            width: 140,
            height: 200,
            condition: () => true,
            action: 'interactCoffre'
        },
        {
            id: 'bureau_desk',
            x: 750,
            y: 450,
            width: 250,
            height: 150,
            condition: () => true,
            action: 'interactBureau'
        },
        {
            id: 'menu_dore',
            x: 650,
            y: 380,
            width: 60,
            height: 80,
            condition: () => !GAME_STATE.flags.hasMenu,
            action: 'collectMenu'
        },
        {
            id: 'tiroir',
            x: 680,
            y: 480,
            width: 100,
            height: 40,
            condition: () => !GAME_STATE.flags.hasLoupe,
            action: 'interactTiroir'
        },
        {
            id: 'etagere_trophees',
            x: 180,
            y: 350,
            width: 150,
            height: 250,
            condition: () => true,
            action: 'interactEtagere'
        },
        {
            id: 'portrait_rodolfo',
            x: 550,
            y: 220,
            width: 100,
            height: 120,
            condition: () => true,
            action: 'interactPortrait'
        },
        {
            id: 'fenetre',
            x: 950,
            y: 280,
            width: 180,
            height: 250,
            condition: () => true,
            action: 'interactFenetre'
        },
        {
            id: 'retour_vip',
            x: 50,
            y: 400,
            width: 60,
            height: 200,
            condition: () => true,
            action: 'goBackVIP'
        }
    ],
    
    // Dialogues de la scène
    dialogues: {
        
        // Introduction
        intro: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le bureau secret de Rodolfo... Exactement comme je l'imaginais." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Luxueux, prétentieux, et plein de trophées à sa propre gloire." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Ce coffre-fort doit contenir la recette du Soufflé Impérial !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Mais il me faut le code... Il doit être caché quelque part dans cette pièce." }
        ],
        
        // Coffre-fort
        coffre_locked: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Un coffre-fort massif avec un digicode à 4 chiffres." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Je dois trouver le code quelque part..." }
        ],
        
        coffre_no_code: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Je ne connais pas encore le code. Il doit être caché quelque part." }
        ],
        
        coffre_has_code: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "4-7-2-9... Le code du menu secret !" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Voyons si ça fonctionne..." }
        ],
        
        coffre_open: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Le coffre s'ouvre ! *clic*" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La recette secrète du Soufflé Impérial au Fromage Fantôme !" },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Maintenant je sais exactement comment saboter ce plat..." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Direction la cuisine pour la confrontation finale !" }
        ],
        
        coffre_already_open: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le coffre est déjà ouvert. J'ai ce qu'il me faut." }
        ],
        
        // Bureau
        bureau_desk: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le bureau de Rodolfo. Des papiers, des factures, des critiques élogieuses..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Et ce menu doré qui brille. Il a l'air spécial." }
        ],
        
        // Menu doré
        collect_menu: [
            { speaker: 'FELIX', portrait: 'felix_action', text: "Un menu doré avec le sceau de Rodolfo." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Il y a quelque chose d'écrit en tout petit... Je n'arrive pas à lire." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Il me faudrait une loupe ou quelque chose pour agrandir." }
        ],
        
        // Tiroir - loupe
        tiroir_loupe: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Un tiroir entrouvert... Voyons ce qu'il y a dedans." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Une loupe en laiton ! Parfait pour examiner les détails." }
        ],
        
        tiroir_empty: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Le tiroir est vide maintenant." }
        ],
        
        // Examiner menu avec loupe
        menu_with_loupe: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Examinons ce menu avec la loupe..." },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Il y a des chiffres microscopiques gravés dans l'or !" },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "4... 7... 2... 9. C'est le code du coffre !" },
            { speaker: 'FELIX', portrait: 'felix_action', text: "Rodolfo cache son code dans son propre menu. Quel ego !" }
        ],
        
        // Étagère trophées
        etagere: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Des trophées culinaires par dizaines. 'Meilleur Chef', 'Étoile d'Or'..." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Tous décernés à Rodolfo Ratoni. Ce rat a du talent, je dois l'admettre." },
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Dommage qu'il l'utilise pour des plats illégaux." }
        ],
        
        // Portrait
        portrait: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Encore un portrait de Rodolfo. Celui-ci est plus sobre." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Quoique... il porte quand même une couronne de lauriers." }
        ],
        
        // Fenêtre
        fenetre: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "La nuit est tombée sur la ville. Les étoiles brillent." },
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Je dois me dépêcher. Le service VIP va bientôt commencer." }
        ],
        
        // Retour VIP
        retour_vip: [
            { speaker: 'FELIX', portrait: 'felix_reflexion', text: "Je n'ai pas encore trouvé ce que je cherche ici." }
        ],
        
        retour_vip_done: [
            { speaker: 'FELIX', portrait: 'felix_idle', text: "Non, je dois aller directement à la cuisine maintenant !" }
        ]
    },
    
    // État local de la scène
    state: {
        digicodeOpen: false,
        enteredCode: '',
        codeFound: false
    },
    
    /**
     * Initialise la scène
     */
    create: function(gameScene) {
        this.gameScene = gameScene;
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Reset état local
        this.state = {
            digicodeOpen: false,
            enteredCode: '',
            codeFound: GAME_STATE.flags.hasCode
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
        
        // Créer les hotspots
        this.createHotspots(gameScene);
        
        // Dialogue d'introduction (première visite)
        if (!GAME_STATE.flags.introBureauDone) {
            gameScene.time.delayedCall(500, () => {
                gameScene.dialogueSystem.show(this.dialogues.intro, () => {
                    GAME_STATE.flags.introBureauDone = true;
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
            case 'interactCoffre':
                this.interactCoffre(gameScene);
                break;
            case 'interactBureau':
                this.interactBureau(gameScene);
                break;
            case 'collectMenu':
                this.collectMenu(gameScene);
                break;
            case 'interactTiroir':
                this.interactTiroir(gameScene);
                break;
            case 'interactEtagere':
                this.interactEtagere(gameScene);
                break;
            case 'interactPortrait':
                this.interactPortrait(gameScene);
                break;
            case 'interactFenetre':
                this.interactFenetre(gameScene);
                break;
            case 'goBackVIP':
                this.goBackVIP(gameScene);
                break;
        }
    },
    
    // === ACTIONS ===
    
    interactCoffre: function(gameScene) {
        if (GAME_STATE.flags.coffreOuvert) {
            gameScene.dialogueSystem.show(this.dialogues.coffre_already_open);
        }
        else if (GAME_STATE.flags.hasCode) {
            // On connaît le code, ouvrir le digicode
            gameScene.dialogueSystem.show(this.dialogues.coffre_has_code, () => {
                this.openDigicode(gameScene);
            });
        }
        else {
            gameScene.dialogueSystem.show(this.dialogues.coffre_no_code);
        }
    },
    
    openDigicode: function(gameScene) {
        this.state.digicodeOpen = true;
        this.state.enteredCode = '';
        
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Détecter mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Overlay sombre
        this.digicodeOverlay = gameScene.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, 0x000000, 0.7)
            .setDepth(1500)
            .setInteractive();
        
        // Container du digicode
        this.digicodeContainer = gameScene.add.container(WIDTH/2, HEIGHT/2).setDepth(1600);
        
        // Tailles adaptées mobile
        const buttonSize = isMobile ? 75 : 60;  // Boutons plus grands
        const gap = isMobile ? 12 : 10;
        const digiWidth = isMobile ? 360 : 300;
        const digiHeight = isMobile ? 500 : 420;
        const fontSize = isMobile ? '42px' : '36px';
        const btnFontSize = isMobile ? '28px' : '24px';
        
        // Fond du digicode
        const digiBg = gameScene.add.rectangle(0, 0, digiWidth, digiHeight, 0xD4A43E)
            .setStrokeStyle(4, 0x8B6914);
        
        // Écran d'affichage
        const screenWidth = isMobile ? 300 : 250;
        const screen = gameScene.add.rectangle(0, -150, screenWidth, 60, 0x1a1a2e)
            .setStrokeStyle(2, 0x0f0f1a);
        
        // Texte du code entré
        this.codeDisplay = gameScene.add.text(0, -150, '----', {
            fontFamily: 'Courier New, monospace',
            fontSize: fontSize,
            color: '#33ff33',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Créer les boutons
        const startY = isMobile ? -50 : -60;
        
        const buttons = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['C', '0', '✓']
        ];
        
        buttons.forEach((row, rowIndex) => {
            row.forEach((label, colIndex) => {
                const x = (colIndex - 1) * (buttonSize + gap);
                const y = startY + rowIndex * (buttonSize + gap);
                
                // Couleur du bouton
                let btnColor = 0x1A2B4C;
                if (label === 'C') btnColor = 0x8B0000;
                if (label === '✓') btnColor = 0x006400;
                
                const btn = gameScene.add.rectangle(x, y, buttonSize, buttonSize, btnColor)
                    .setStrokeStyle(2, 0xD4A43E)
                    .setInteractive({ useHandCursor: true });
                
                const btnText = gameScene.add.text(x, y, label, {
                    fontFamily: 'Arial',
                    fontSize: btnFontSize,
                    color: '#FFFFFF',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
                
                // Hover effect
                btn.on('pointerover', () => btn.setFillStyle(0x3a4b6c));
                btn.on('pointerout', () => btn.setFillStyle(btnColor));
                
                // Click avec feedback
                btn.on('pointerdown', () => {
                    // Animation de pression
                    gameScene.tweens.add({
                        targets: [btn, btnText],
                        scaleX: 0.9,
                        scaleY: 0.9,
                        duration: 50,
                        yoyo: true
                    });
                    this.handleDigicodeInput(label, gameScene);
                });
                
                this.digicodeContainer.add([btn, btnText]);
            });
        });
        
        // Bouton fermer - plus grand sur mobile
        const closeBtnSize = isMobile ? '32px' : '24px';
        const closeBtnX = isMobile ? 160 : 130;
        const closeBtn = gameScene.add.text(closeBtnX, -190, '✕', {
            fontFamily: 'Arial',
            fontSize: closeBtnSize,
            color: '#FF6666'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
        
        closeBtn.on('pointerdown', () => {
            audioManager.playClick();
            this.closeDigicode(gameScene);
        });
        
        this.digicodeContainer.add([digiBg, screen, this.codeDisplay, closeBtn]);
    },
    
    handleDigicodeInput: function(input, gameScene) {
        if (input === 'C') {
            // Clear
            this.state.enteredCode = '';
            audioManager.playError();
        }
        else if (input === '✓') {
            // Valider
            if (this.state.enteredCode === GAME_STATE.safeCode) {
                // Code correct !
                audioManager.playSuccess();
                this.closeDigicode(gameScene);
                this.openSafe(gameScene);
            } else {
                // Code incorrect
                audioManager.playError();
                this.codeDisplay.setColor('#ff3333');
                gameScene.time.delayedCall(500, () => {
                    this.codeDisplay.setColor('#33ff33');
                    this.state.enteredCode = '';
                    this.updateCodeDisplay();
                });
            }
        }
        else {
            // Chiffre
            if (this.state.enteredCode.length < 4) {
                this.state.enteredCode += input;
                audioManager.playDigicodeKey(true);
            }
        }
        
        this.updateCodeDisplay();
    },
    
    updateCodeDisplay: function() {
        let display = this.state.enteredCode.padEnd(4, '-');
        this.codeDisplay.setText(display);
    },
    
    closeDigicode: function(gameScene) {
        this.state.digicodeOpen = false;
        
        if (this.digicodeOverlay) {
            this.digicodeOverlay.destroy();
        }
        if (this.digicodeContainer) {
            this.digicodeContainer.destroy();
        }
    },
    
    openSafe: function(gameScene) {
        GAME_STATE.flags.coffreOuvert = true;
        
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Shake léger d'ouverture
        gameScene.effectsManager.shakeCamera(0.005, 200);
        
        // Flash vert de succès
        gameScene.effectsManager.flashScreen(0x00FF00, 0.3, 300);
        
        // Particules dorées sortant du coffre
        gameScene.effectsManager.spawnStarParticles(380, 380, 15);
        gameScene.effectsManager.spawnCollectParticles(380, 350, 20);
        
        // Texte flottant
        gameScene.effectsManager.showFloatingText(380, 300, '🔓 Ouvert !', '#00FF00');
        
        // Dialogue de succès
        gameScene.time.delayedCall(600, () => {
            gameScene.dialogueSystem.show(this.dialogues.coffre_open, () => {
                // Transition vers la scène finale
                gameScene.transitionToScene('finale');
            });
        });
    },
    
    interactBureau: function(gameScene) {
        // Vérifier si on a menu + loupe pour combiner
        if (gameScene.inventorySystem.hasItem('menu_loupe') && !GAME_STATE.flags.hasCode) {
            gameScene.dialogueSystem.show(this.dialogues.menu_with_loupe, () => {
                GAME_STATE.flags.hasCode = true;
                this.state.codeFound = true;
                // Retirer menu_loupe, on garde l'info
                GameUtils.removeFromInventory('menu_loupe');
                gameScene.inventorySystem.refresh();
            });
        } else {
            gameScene.dialogueSystem.show(this.dialogues.bureau_desk);
        }
    },
    
    collectMenu: function(gameScene) {
        gameScene.inventorySystem.addItem('menu');
        GAME_STATE.flags.hasMenu = true;
        gameScene.dialogueSystem.show(this.dialogues.collect_menu, () => {
            gameScene.loadScene('bureau');
        });
    },
    
    interactTiroir: function(gameScene) {
        if (!GAME_STATE.flags.hasLoupe) {
            gameScene.dialogueSystem.show(this.dialogues.tiroir_loupe, () => {
                gameScene.inventorySystem.addItem('loupe');
                GAME_STATE.flags.hasLoupe = true;
                gameScene.loadScene('bureau');
            });
        } else {
            gameScene.dialogueSystem.show(this.dialogues.tiroir_empty);
        }
    },
    
    interactEtagere: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.etagere);
    },
    
    interactPortrait: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.portrait);
    },
    
    interactFenetre: function(gameScene) {
        gameScene.dialogueSystem.show(this.dialogues.fenetre);
    },
    
    goBackVIP: function(gameScene) {
        if (GAME_STATE.flags.coffreOuvert) {
            gameScene.dialogueSystem.show(this.dialogues.retour_vip_done);
        } else {
            gameScene.dialogueSystem.show(this.dialogues.retour_vip);
        }
    }
};
