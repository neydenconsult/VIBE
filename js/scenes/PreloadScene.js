/**
 * PreloadScene - Chargement des assets
 * Charge tous les graphismes, sons, etc.
 */

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    preload() {
        // Référence à la barre de chargement HTML
        const loadingFill = document.getElementById('loading-fill');
        
        // Mise à jour de la barre de progression
        this.load.on('progress', (value) => {
            if (loadingFill) {
                loadingFill.style.width = `${value * 100}%`;
            }
        });
        
        this.load.on('complete', () => {
            console.log('✅ Tous les assets chargés !');
        });
        
        // ========== DÉCORS ==========
        this.load.image('decor_ruelle', 'assets/images/decors/scene1_ruelle.png');
        this.load.image('decor_cuisine', 'assets/images/decors/scene2_cuisine.png');
        this.load.image('decor_vip', 'assets/images/decors/scene3_salle_vip.png');
        this.load.image('decor_bureau', 'assets/images/decors/scene4_bureau.png');
        this.load.image('decor_finale', 'assets/images/decors/scene5_cuisine_finale.png');
        
        // ========== PERSONNAGES - FÉLIX ==========
        this.load.image('felix_idle', 'assets/images/personnages/felix/felix_idle.png');
        this.load.image('felix_reflexion', 'assets/images/personnages/felix/felix_reflexion.png');
        this.load.image('felix_action', 'assets/images/personnages/felix/felix_action.png');
        this.load.image('felix_marche', 'assets/images/personnages/felix/felix_marche.png');
        this.load.image('felix_victoire', 'assets/images/personnages/felix/felix_victoire.png');
        
        // ========== PERSONNAGES - RODOLFO ==========
        this.load.image('rodolfo_dos', 'assets/images/personnages/rodolfo/rodolfo_dos.png');
        this.load.image('rodolfo_menacant', 'assets/images/personnages/rodolfo/rodolfo_menacant.png');
        this.load.image('rodolfo_pleure', 'assets/images/personnages/rodolfo/rodolfo_pleure.png');
        
        // ========== PERSONNAGES - GUSTAVE ==========
        this.load.image('gustave_idle', 'assets/images/personnages/gustave/gustave_idle.png');
        this.load.image('gustave_panique', 'assets/images/personnages/gustave/gustave_panique.png');
        this.load.image('gustave_courir', 'assets/images/personnages/gustave/gustave_courir.png');
        
        // ========== PERSONNAGES - MME COLVERT ==========
        this.load.image('mme_colvert_somnolente', 'assets/images/personnages/mme_colvert/mme_colvert_somnolente.png');
        this.load.image('mme_colvert_endormie', 'assets/images/personnages/mme_colvert/mme_colvert_endormie.png');
        
        // ========== PERSONNAGES - BRUNO ==========
        this.load.image('bruno_bras_croises', 'assets/images/personnages/bruno/bruno_bras_croises.png');
        this.load.image('bruno_hochement', 'assets/images/personnages/bruno/bruno_hochement.png');
        
        // ========== PERSONNAGES - SERVEURS ==========
        this.load.image('serveurs_idle', 'assets/images/personnages/serveurs/serveurs_idle.png');
        this.load.image('serveurs_courir', 'assets/images/personnages/serveurs/serveurs_courir.png');
        
        // ========== OBJETS ==========
        this.load.image('obj_toque', 'assets/images/objets/toque.png');
        this.load.image('obj_tablier', 'assets/images/objets/tablier.png');
        this.load.image('obj_deguisement', 'assets/images/objets/deguisement.png');
        this.load.image('obj_piment', 'assets/images/objets/piment.png');
        this.load.image('obj_chantilly', 'assets/images/objets/chantilly.png');
        this.load.image('obj_casserole', 'assets/images/objets/casserole.png');
        this.load.image('obj_bombe_culinaire', 'assets/images/objets/bombe_culinaire.png');
        this.load.image('obj_verre_vide', 'assets/images/objets/verre_vide.png');
        this.load.image('obj_lait_bouteille', 'assets/images/objets/lait_bouteille.png');
        this.load.image('obj_cle_doree', 'assets/images/objets/cle_doree.png');
        this.load.image('obj_verre_lait', 'assets/images/objets/verre_lait.png');
        this.load.image('obj_menu', 'assets/images/objets/menu.png');
        this.load.image('obj_loupe', 'assets/images/objets/loupe.png');
        this.load.image('obj_menu_loupe', 'assets/images/objets/menu_loupe.png');
        this.load.image('obj_sel', 'assets/images/objets/sel.png');
        this.load.image('obj_vinaigre', 'assets/images/objets/vinaigre.png');
        this.load.image('obj_bicarbonate', 'assets/images/objets/bicarbonate.png');
        this.load.image('obj_melange_instable', 'assets/images/objets/melange_instable.png');
        
        // ========== UI ==========
        this.load.image('ui_inventaire', 'assets/images/ui/ui_inventaire.png');
        this.load.image('ui_dialogue', 'assets/images/ui/ui_dialogue.png');
        this.load.image('ui_curseurs', 'assets/images/ui/ui_curseurs.png');
        this.load.image('ui_digicode', 'assets/images/ui/ui_digicode.png');
        this.load.image('ui_ecran_titre', 'assets/images/ui/ui_ecran_titre.png');
        this.load.image('ui_menu_pause', 'assets/images/ui/ui_menu_pause.png');
    }
    
    create() {
        console.log('🎮 Assets chargés, passage au titre...');
        
        // Masquer l'écran de chargement HTML
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
        
        // Passer à l'écran titre
        this.scene.start('TitleScene');
    }
}
