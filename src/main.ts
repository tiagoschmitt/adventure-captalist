
requirejs.config({
    map: {
        '*': {
            'pixi.js': '../lib/pixi',
            'gsap': '../lib/gsap.min',
            'PixiPlugin': '../lib/gsap.min/PixiPlugin'
        }
    }
});

require(["pixi.js", "gsap", "PixiPlugin"], function() {
    require(["com/adventurecapitalist/adventureCapitalist"], function(adventureCapitalist: any) {
        new adventureCapitalist.AdventureCapitalist();
    });
});