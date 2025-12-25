/**
 * InventorySystem - Gestion de l'inventaire
 */

class InventorySystem {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.slots = [];
        this.selectedItem = null;
        this.isVisible = true;
        
        // Détecter mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    create() {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        let { MAX_SLOTS, SLOT_SIZE } = GAME_CONFIG.INVENTORY;
        
        // Sur mobile, slots plus grands
        if (this.isMobile) {
            SLOT_SIZE = 90; // +12.5%
        }
        
        this.slotSize = SLOT_SIZE;
        
        // Container principal - plus haut sur mobile pour éviter la zone de navigation
        const yOffset = this.isMobile ? 70 : 60;
        this.container = this.scene.add.container(WIDTH / 2, HEIGHT - yOffset);
        this.container.setDepth(900);
        
        // Fond de l'inventaire (mallette)
        const invWidth = (MAX_SLOTS * SLOT_SIZE) + 80;
        const invHeight = SLOT_SIZE + (this.isMobile ? 50 : 40);
        const invBg = this.scene.add.rectangle(0, 0, invWidth, invHeight, 0x1A2B4C, 0.9);
        invBg.setStrokeStyle(3, 0xD4A43E);
        this.container.add(invBg);
        
        // Poignée décorative
        const handle = this.scene.add.rectangle(0, -SLOT_SIZE / 2 - 15, 80, 12, 0x2a2a2a);
        handle.setStrokeStyle(2, 0xD4A43E);
        this.container.add(handle);
        
        // Créer les slots
        const startX = -(MAX_SLOTS * SLOT_SIZE) / 2 + SLOT_SIZE / 2;
        
        for (let i = 0; i < MAX_SLOTS; i++) {
            const slotX = startX + (i * SLOT_SIZE);
            
            // Fond du slot
            const slotBg = this.scene.add.rectangle(slotX, 0, SLOT_SIZE - 10, SLOT_SIZE - 10, 0x0a1525);
            slotBg.setStrokeStyle(2, 0xD4A43E);
            
            // Image de l'item (vide au début)
            const itemImage = this.scene.add.image(slotX, 0, '')
                .setDisplaySize(SLOT_SIZE - 20, SLOT_SIZE - 20)
                .setVisible(false);
            
            // Zone interactive - plus grande sur mobile
            const hitSize = this.isMobile ? SLOT_SIZE : SLOT_SIZE - 10;
            const hitArea = this.scene.add.rectangle(slotX, 0, hitSize, hitSize, 0x000000, 0)
                .setInteractive({ useHandCursor: true });
            
            hitArea.on('pointerdown', () => {
                // Feedback audio
                audioManager.playClick();
                this.onSlotClick(i);
            });
            hitArea.on('pointerover', () => {
                slotBg.setStrokeStyle(3, 0xF5E6C8);
            });
            hitArea.on('pointerout', () => {
                slotBg.setStrokeStyle(2, 0xD4A43E);
            });
            
            this.container.add([slotBg, itemImage, hitArea]);
            
            this.slots.push({
                background: slotBg,
                image: itemImage,
                hitArea: hitArea,
                item: null
            });
        }
        
        // Refresh initial
        this.refresh();
    }
    
    refresh() {
        // Mettre à jour l'affichage selon GAME_STATE.inventory
        this.slots.forEach((slot, index) => {
            const item = GAME_STATE.inventory[index] || null;
            slot.item = item;
            
            if (item) {
                const textureKey = `obj_${item}`;
                if (this.scene.textures.exists(textureKey)) {
                    slot.image.setTexture(textureKey);
                    slot.image.setVisible(true);
                }
            } else {
                slot.image.setVisible(false);
            }
        });
    }
    
    onSlotClick(slotIndex) {
        const slot = this.slots[slotIndex];
        
        if (!slot.item) {
            // Slot vide - désélectionner
            this.deselectItem();
            return;
        }
        
        if (this.selectedItem === null) {
            // Sélectionner cet item
            this.selectItem(slotIndex);
        } else if (this.selectedItem === slotIndex) {
            // Désélectionner
            this.deselectItem();
        } else {
            // Essayer de combiner
            this.tryCombine(this.selectedItem, slotIndex);
        }
    }
    
    selectItem(slotIndex) {
        this.selectedItem = slotIndex;
        const slot = this.slots[slotIndex];
        
        // Effet visuel de sélection
        slot.background.setFillStyle(0x2a4060);
        
        // Mettre le curseur en mode "item sélectionné"
        this.scene.input.setDefaultCursor('grab');
        
        console.log(`📦 Item sélectionné: ${slot.item}`);
    }
    
    deselectItem() {
        if (this.selectedItem !== null) {
            const slot = this.slots[this.selectedItem];
            slot.background.setFillStyle(0x0a1525);
        }
        
        this.selectedItem = null;
        this.scene.input.setDefaultCursor('default');
    }
    
    tryCombine(index1, index2) {
        const item1 = this.slots[index1].item;
        const item2 = this.slots[index2].item;
        
        const result = GameUtils.combineItems(item1, item2);
        
        if (result) {
            // Combinaison réussie !
            console.log(`✨ Combinaison: ${item1} + ${item2} = ${result}`);
            
            // Retirer les items originaux
            GameUtils.removeFromInventory(item1);
            GameUtils.removeFromInventory(item2);
            
            // Ajouter le nouvel item
            GameUtils.addToInventory(result);
            
            // Effet visuel
            this.showCombineEffect();
            
            // Son de combinaison
            audioManager.playCombine();
            
            // Refresh
            this.refresh();
            this.deselectItem();
            
            return true;
        } else {
            // Combinaison impossible
            console.log(`❌ Impossible de combiner ${item1} et ${item2}`);
            this.deselectItem();
            
            return false;
        }
    }
    
    showCombineEffect() {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Flash doré
        const flash = this.scene.add.rectangle(
            WIDTH / 2,
            HEIGHT / 2,
            WIDTH,
            HEIGHT,
            0xD4A43E,
            0.3
        ).setDepth(2000);
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 300,
            onComplete: () => flash.destroy()
        });
        
        // Particules étoiles si effectsManager disponible
        if (this.scene.effectsManager) {
            this.scene.effectsManager.spawnStarParticles(WIDTH / 2, HEIGHT - 60, 12);
            this.scene.effectsManager.showFloatingText(WIDTH / 2, HEIGHT - 100, '✨ Combiné !', '#F5E6C8');
        }
    }
    
    addItem(itemKey) {
        if (GameUtils.addToInventory(itemKey)) {
            this.refresh();
            
            // Son de collecte
            audioManager.playCollect();
            
            // Animation de collecte
            this.showCollectEffect();
            
            return true;
        }
        return false;
    }
    
    showCollectEffect() {
        // Son de collecte (si disponible)
        // Animation '+1' style
    }
    
    hasItem(itemKey) {
        return GameUtils.hasItem(itemKey);
    }
    
    getSelectedItem() {
        if (this.selectedItem !== null) {
            return this.slots[this.selectedItem].item;
        }
        return null;
    }
    
    toggle() {
        this.isVisible = !this.isVisible;
        this.container.setVisible(this.isVisible);
    }
}
