/**
 * AudioManager.js
 * Gestion de l'audio du jeu avec Web Audio API
 * Sons procéduraux (pas besoin de fichiers externes)
 */

class AudioManager {
    constructor() {
        this.context = null;
        this.masterVolume = 0.5;
        this.sfxVolume = 0.7;
        this.musicVolume = 0.3;
        this.currentMusic = null;
        this.musicPlaying = false;
        this.initialized = false;
    }
    
    /**
     * Initialise le contexte audio (doit être appelé après interaction utilisateur)
     */
    init() {
        if (this.initialized) return;
        
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.connect(this.context.destination);
            this.masterGain.gain.value = this.masterVolume;
            
            this.initialized = true;
            console.log('🔊 AudioManager initialisé');
        } catch (e) {
            console.warn('⚠️ Web Audio API non supportée');
        }
    }
    
    /**
     * Joue un son de clic UI
     */
    playClick() {
        if (!this.initialized) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.value = 800;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.context.currentTime);
        gain.gain.exponentialDecayTo(0.01, this.context.currentTime + 0.1);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);
    }
    
    /**
     * Son de collecte d'objet
     */
    playCollect() {
        if (!this.initialized) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        // Arpège ascendant
        osc.frequency.setValueAtTime(400, this.context.currentTime);
        osc.frequency.linearRampToValueAtTime(800, this.context.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(1200, this.context.currentTime + 0.2);
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.4, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.3);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.3);
    }
    
    /**
     * Son de combinaison réussie
     */
    playCombine() {
        if (!this.initialized) return;
        
        // Accord majeur
        const frequencies = [523, 659, 784]; // Do-Mi-Sol
        
        frequencies.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.frequency.value = freq;
            osc.type = 'sine';
            
            const startTime = this.context.currentTime + i * 0.05;
            gain.gain.setValueAtTime(this.sfxVolume * 0.3, startTime);
            gain.gain.linearRampToValueAtTime(0.01, startTime + 0.4);
            
            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
    }
    
    /**
     * Son d'explosion
     */
    playExplosion() {
        if (!this.initialized) return;
        
        // Bruit blanc avec enveloppe
        const bufferSize = this.context.sampleRate * 0.5;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
        }
        
        const noise = this.context.createBufferSource();
        noise.buffer = buffer;
        
        // Filtre passe-bas pour son plus sourd
        const filter = this.context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, this.context.currentTime);
        filter.frequency.linearRampToValueAtTime(100, this.context.currentTime + 0.3);
        
        const gain = this.context.createGain();
        gain.gain.setValueAtTime(this.sfxVolume * 0.8, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.5);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        noise.start(this.context.currentTime);
        
        // Basse fréquence pour impact
        const bass = this.context.createOscillator();
        const bassGain = this.context.createGain();
        
        bass.frequency.setValueAtTime(150, this.context.currentTime);
        bass.frequency.linearRampToValueAtTime(30, this.context.currentTime + 0.3);
        bass.type = 'sine';
        
        bassGain.gain.setValueAtTime(this.sfxVolume * 0.5, this.context.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.3);
        
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        
        bass.start(this.context.currentTime);
        bass.stop(this.context.currentTime + 0.4);
    }
    
    /**
     * Son de porte / transition
     */
    playDoor() {
        if (!this.initialized) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.setValueAtTime(200, this.context.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.context.currentTime + 0.2);
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.3);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.3);
    }
    
    /**
     * Son de dialogue qui apparaît
     */
    playDialogue() {
        if (!this.initialized) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.value = 600;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.15, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.05);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.05);
    }
    
    /**
     * Son de digicode - touche
     */
    playDigicodeKey(correct = true) {
        if (!this.initialized) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.value = correct ? 523 : 200;
        osc.type = 'square';
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.2, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.1);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.1);
    }
    
    /**
     * Son de succès (coffre ouvert, victoire)
     */
    playSuccess() {
        if (!this.initialized) return;
        
        // Fanfare simple
        const notes = [523, 659, 784, 1047]; // Do-Mi-Sol-Do
        
        notes.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.frequency.value = freq;
            osc.type = 'triangle';
            
            const startTime = this.context.currentTime + i * 0.15;
            gain.gain.setValueAtTime(this.sfxVolume * 0.4, startTime);
            gain.gain.linearRampToValueAtTime(0.01, startTime + 0.3);
            
            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }
    
    /**
     * Son d'erreur
     */
    playError() {
        if (!this.initialized) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.setValueAtTime(300, this.context.currentTime);
        osc.frequency.linearRampToValueAtTime(150, this.context.currentTime + 0.2);
        osc.type = 'sawtooth';
        
        gain.gain.setValueAtTime(this.sfxVolume * 0.3, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.3);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.3);
    }
    
    /**
     * Démarre la musique d'ambiance pour une scène
     */
    startMusic(sceneKey) {
        if (!this.initialized) return;
        
        // Arrêter la musique précédente
        this.stopMusic();
        
        // Paramètres par scène
        const musicParams = {
            'ruelle': { baseFreq: 110, tempo: 0.5, mood: 'mysterious' },
            'cuisine': { baseFreq: 130, tempo: 0.7, mood: 'hectic' },
            'vip': { baseFreq: 100, tempo: 0.4, mood: 'elegant' },
            'bureau': { baseFreq: 90, tempo: 0.3, mood: 'tense' },
            'finale': { baseFreq: 150, tempo: 0.8, mood: 'dramatic' }
        };
        
        const params = musicParams[sceneKey] || musicParams['ruelle'];
        
        this.musicPlaying = true;
        this.playAmbientLoop(params);
    }
    
    /**
     * Boucle d'ambiance générative
     */
    playAmbientLoop(params) {
        if (!this.musicPlaying || !this.initialized) return;
        
        const { baseFreq, tempo, mood } = params;
        
        // Note basse de fond
        const bass = this.context.createOscillator();
        const bassGain = this.context.createGain();
        
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        
        bass.frequency.value = baseFreq;
        bass.type = 'sine';
        
        bassGain.gain.setValueAtTime(this.musicVolume * 0.2, this.context.currentTime);
        bassGain.gain.linearRampToValueAtTime(this.musicVolume * 0.1, this.context.currentTime + 2);
        bassGain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 4);
        
        bass.start(this.context.currentTime);
        bass.stop(this.context.currentTime + 4);
        
        // Notes d'ambiance aléatoires
        const scale = [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875]; // Gamme mineure
        
        for (let i = 0; i < 3; i++) {
            const delay = 0.5 + Math.random() * 2;
            const noteFreq = baseFreq * 2 * scale[Math.floor(Math.random() * scale.length)];
            
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.frequency.value = noteFreq;
            osc.type = 'sine';
            
            const startTime = this.context.currentTime + delay;
            gain.gain.setValueAtTime(0.01, startTime);
            gain.gain.linearRampToValueAtTime(this.musicVolume * 0.15, startTime + 0.1);
            gain.gain.linearRampToValueAtTime(0.01, startTime + 1.5);
            
            osc.start(startTime);
            osc.stop(startTime + 1.5);
        }
        
        // Boucler
        setTimeout(() => {
            if (this.musicPlaying) {
                this.playAmbientLoop(params);
            }
        }, 3500);
    }
    
    /**
     * Arrête la musique
     */
    stopMusic() {
        this.musicPlaying = false;
    }
    
    /**
     * Change le volume master
     */
    setMasterVolume(value) {
        this.masterVolume = Math.max(0, Math.min(1, value));
        if (this.masterGain) {
            this.masterGain.gain.value = this.masterVolume;
        }
    }
    
    /**
     * Mute/Unmute
     */
    toggleMute() {
        if (this.masterGain) {
            if (this.masterGain.gain.value > 0) {
                this.previousVolume = this.masterGain.gain.value;
                this.masterGain.gain.value = 0;
            } else {
                this.masterGain.gain.value = this.previousVolume || this.masterVolume;
            }
        }
    }
}

// Instance globale
const audioManager = new AudioManager();
