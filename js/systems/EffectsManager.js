/**
 * EffectsManager.js
 * Gestion des effets visuels et animations
 */

class EffectsManager {
    constructor(scene) {
        this.scene = scene;
    }
    
    // ==========================================
    // TRANSITIONS DE SCÈNE
    // ==========================================
    
    /**
     * Transition en fondu noir
     */
    fadeTransition(callback, duration = 500) {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        const overlay = this.scene.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, 0x000000, 0)
            .setDepth(5000);
        
        this.scene.tweens.add({
            targets: overlay,
            alpha: 1,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                if (callback) callback();
                this.scene.tweens.add({
                    targets: overlay,
                    alpha: 0,
                    duration: duration,
                    ease: 'Power2',
                    onComplete: () => overlay.destroy()
                });
            }
        });
    }
    
    /**
     * Transition en balayage horizontal
     */
    wipeTransition(callback, direction = 'left', duration = 600) {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        const startX = direction === 'left' ? WIDTH + WIDTH/2 : -WIDTH/2;
        const endX = WIDTH/2;
        
        const overlay = this.scene.add.rectangle(startX, HEIGHT/2, WIDTH, HEIGHT, 0x1A2B4C)
            .setDepth(5000);
        
        this.scene.tweens.add({
            targets: overlay,
            x: endX,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                if (callback) callback();
                this.scene.tweens.add({
                    targets: overlay,
                    x: direction === 'left' ? -WIDTH/2 : WIDTH + WIDTH/2,
                    duration: duration,
                    ease: 'Power2',
                    onComplete: () => overlay.destroy()
                });
            }
        });
    }
    
    /**
     * Transition circulaire (iris)
     */
    irisTransition(callback, duration = 800) {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        // Créer un masque circulaire avec graphics
        const graphics = this.scene.add.graphics().setDepth(5000);
        
        let radius = Math.max(WIDTH, HEIGHT);
        const centerX = WIDTH / 2;
        const centerY = HEIGHT / 2;
        
        // Animation de fermeture
        this.scene.tweens.addCounter({
            from: radius,
            to: 0,
            duration: duration / 2,
            ease: 'Power2',
            onUpdate: (tween) => {
                const value = tween.getValue();
                graphics.clear();
                graphics.fillStyle(0x000000, 1);
                graphics.fillRect(0, 0, WIDTH, HEIGHT);
                graphics.fillStyle(0x000000, 0);
                graphics.beginPath();
                graphics.arc(centerX, centerY, value, 0, Math.PI * 2);
                graphics.closePath();
                graphics.fillPath();
            },
            onComplete: () => {
                if (callback) callback();
                
                // Animation d'ouverture
                this.scene.tweens.addCounter({
                    from: 0,
                    to: radius,
                    duration: duration / 2,
                    ease: 'Power2',
                    onUpdate: (tween) => {
                        const value = tween.getValue();
                        graphics.clear();
                        graphics.fillStyle(0x000000, 1);
                        graphics.fillRect(0, 0, WIDTH, HEIGHT);
                        graphics.fillStyle(0x000000, 0);
                        graphics.beginPath();
                        graphics.arc(centerX, centerY, value, 0, Math.PI * 2);
                        graphics.closePath();
                        graphics.fillPath();
                    },
                    onComplete: () => graphics.destroy()
                });
            }
        });
    }
    
    // ==========================================
    // EFFETS DE PARTICULES
    // ==========================================
    
    /**
     * Particules dorées (collecte d'objet)
     */
    spawnCollectParticles(x, y, count = 12) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const speed = 100 + Math.random() * 50;
            const size = 4 + Math.random() * 4;
            
            const particle = this.scene.add.circle(x, y, size, 0xD4A43E)
                .setDepth(1000)
                .setAlpha(1);
            
            this.scene.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed - 50,
                alpha: 0,
                scale: 0,
                duration: 600 + Math.random() * 200,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }
    }
    
    /**
     * Étoiles scintillantes (combinaison)
     */
    spawnStarParticles(x, y, count = 8) {
        const colors = [0xD4A43E, 0xF5E6C8, 0xFFFFFF];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const distance = 50 + Math.random() * 80;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Étoile (forme de croix)
            const star = this.scene.add.star(x, y, 4, 3, 8, color)
                .setDepth(1000)
                .setAlpha(0)
                .setScale(0);
            
            this.scene.tweens.add({
                targets: star,
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                alpha: 1,
                scale: 1,
                rotation: Math.PI * 2,
                duration: 400,
                ease: 'Back.easeOut',
                onComplete: () => {
                    this.scene.tweens.add({
                        targets: star,
                        alpha: 0,
                        scale: 0,
                        duration: 300,
                        onComplete: () => star.destroy()
                    });
                }
            });
        }
    }
    
    /**
     * Particules de feu/explosion
     */
    spawnExplosionParticles(x, y, count = 20) {
        const colors = [0xFF4400, 0xFF8800, 0xFFCC00, 0xFF0000];
        
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 80 + Math.random() * 150;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 5 + Math.random() * 10;
            
            const particle = this.scene.add.circle(x, y, size, color)
                .setDepth(2000)
                .setAlpha(1);
            
            this.scene.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed + 30, // Gravité légère
                alpha: 0,
                scale: 0.2,
                duration: 500 + Math.random() * 300,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }
        
        // Cercle d'onde de choc
        const shockwave = this.scene.add.circle(x, y, 10, 0xFFFFFF, 0)
            .setStrokeStyle(4, 0xFFAA00)
            .setDepth(1999);
        
        this.scene.tweens.add({
            targets: shockwave,
            scale: 8,
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => shockwave.destroy()
        });
    }
    
    /**
     * Particules de fumée
     */
    spawnSmokeParticles(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const offsetX = (Math.random() - 0.5) * 40;
            const size = 15 + Math.random() * 20;
            const delay = i * 50;
            
            const smoke = this.scene.add.circle(x + offsetX, y, size, 0x666666)
                .setDepth(1500)
                .setAlpha(0.6);
            
            this.scene.tweens.add({
                targets: smoke,
                y: y - 100 - Math.random() * 50,
                x: x + offsetX + (Math.random() - 0.5) * 60,
                alpha: 0,
                scale: 2,
                duration: 1000 + Math.random() * 500,
                delay: delay,
                ease: 'Power1',
                onComplete: () => smoke.destroy()
            });
        }
    }
    
    /**
     * Bulles (lait, eau)
     */
    spawnBubbles(x, y, count = 8) {
        for (let i = 0; i < count; i++) {
            const offsetX = (Math.random() - 0.5) * 30;
            const size = 3 + Math.random() * 6;
            const delay = i * 100;
            
            const bubble = this.scene.add.circle(x + offsetX, y, size, 0xFFFFFF, 0.7)
                .setStrokeStyle(1, 0xCCCCCC)
                .setDepth(1500);
            
            this.scene.tweens.add({
                targets: bubble,
                y: y - 60 - Math.random() * 40,
                x: x + offsetX + (Math.random() - 0.5) * 30,
                alpha: 0,
                duration: 800 + Math.random() * 400,
                delay: delay,
                ease: 'Power1',
                onComplete: () => bubble.destroy()
            });
        }
    }
    
    // ==========================================
    // EFFETS D'INTERFACE
    // ==========================================
    
    /**
     * Flash lumineux
     */
    flashScreen(color = 0xFFFFFF, alpha = 0.5, duration = 200) {
        const { WIDTH, HEIGHT } = GAME_CONFIG;
        
        const flash = this.scene.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, color, alpha)
            .setDepth(4000);
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: duration,
            ease: 'Power2',
            onComplete: () => flash.destroy()
        });
    }
    
    /**
     * Shake de caméra
     */
    shakeCamera(intensity = 0.01, duration = 200) {
        this.scene.cameras.main.shake(duration, intensity);
    }
    
    /**
     * Texte flottant (+1, etc.)
     */
    showFloatingText(x, y, text, color = '#D4A43E') {
        const floatText = this.scene.add.text(x, y, text, {
            fontFamily: 'Georgia, serif',
            fontSize: '24px',
            color: color,
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        })
        .setOrigin(0.5)
        .setDepth(2000);
        
        this.scene.tweens.add({
            targets: floatText,
            y: y - 60,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => floatText.destroy()
        });
    }
    
    /**
     * Effet de pulsation sur un objet
     */
    pulseObject(gameObject, scale = 1.2, duration = 300) {
        this.scene.tweens.add({
            targets: gameObject,
            scaleX: scale,
            scaleY: scale,
            duration: duration / 2,
            ease: 'Power2',
            yoyo: true
        });
    }
    
    /**
     * Highlight/Glow sur un objet
     */
    highlightObject(x, y, width, height, duration = 1000) {
        const glow = this.scene.add.rectangle(x, y, width + 10, height + 10, 0xD4A43E, 0)
            .setStrokeStyle(3, 0xD4A43E)
            .setDepth(500);
        
        this.scene.tweens.add({
            targets: glow,
            alpha: { from: 0.8, to: 0 },
            scale: { from: 1, to: 1.3 },
            duration: duration,
            ease: 'Power2',
            onComplete: () => glow.destroy()
        });
    }
    
    // ==========================================
    // ANIMATIONS DE PERSONNAGES
    // ==========================================
    
    /**
     * Fait rebondir un sprite (idle animation)
     */
    idleBounce(sprite, intensity = 5) {
        this.scene.tweens.add({
            targets: sprite,
            y: sprite.y - intensity,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    /**
     * Animation de marche (balancement)
     */
    walkAnimation(sprite) {
        this.scene.tweens.add({
            targets: sprite,
            angle: { from: -3, to: 3 },
            duration: 200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    /**
     * Arrête les animations d'un sprite
     */
    stopAnimations(sprite) {
        this.scene.tweens.killTweensOf(sprite);
    }
    
    /**
     * Animation d'entrée (depuis le bas)
     */
    enterFromBottom(sprite, finalY, duration = 500) {
        const startY = sprite.y + 100;
        sprite.setY(startY);
        sprite.setAlpha(0);
        
        this.scene.tweens.add({
            targets: sprite,
            y: finalY,
            alpha: 1,
            duration: duration,
            ease: 'Back.easeOut'
        });
    }
    
    /**
     * Animation de sortie (vers la gauche)
     */
    exitToLeft(sprite, duration = 500, callback = null) {
        this.scene.tweens.add({
            targets: sprite,
            x: -100,
            alpha: 0,
            duration: duration,
            ease: 'Power2',
            onComplete: () => {
                if (callback) callback();
            }
        });
    }
    
    /**
     * Animation de tremblement (peur/panique)
     */
    shakeSprite(sprite, intensity = 3, duration = 500) {
        const originalX = sprite.x;
        
        this.scene.tweens.add({
            targets: sprite,
            x: { from: originalX - intensity, to: originalX + intensity },
            duration: 50,
            ease: 'Linear',
            yoyo: true,
            repeat: duration / 100,
            onComplete: () => sprite.setX(originalX)
        });
    }
}
