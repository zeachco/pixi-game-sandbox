import autobind from 'auto-bind-es5'
import * as PIXI from 'pixi.js';

export class Game {
    constructor() {
        autobind(this)
        this.div = document.getElementById('gamescene');

        this.renderer = PIXI.autoDetectRenderer(256, 256, {
            antialias: false,
            transparent: false
        });

        this.renderer.autoResize = true;
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.renderer.backgroundColor = 0x061639;

        this.canvas = this.renderer.view
        this.div.appendChild(this.canvas);

        this.stage = new PIXI.Container();
        this.rect = new PIXI.Graphics()
            .beginFill(0x44ddff)
            .drawRect(10, 10, 50, 100)
            .endFill()
        ;

        this.update();
        this.stage.addChild(this.rect);
        this.update();
    }

    update() {
        const now = Date.now();
        this.rect.position.x = window.innerWidth / 2 + Math.sin(now / 200) * this.stage.width/2.1
        this.rect.position.y = window.innerHeight / 2 + Math.cos(now / 200) * this.stage.height/2.1
        this.rect.rotation = now / Math.PI / 200;
        const sc = 1 + Math.cos(now / 100) * .5
        this.rect.scale.set(sc, sc)
        this.renderer.render(this.stage);
        this.animFrame = requestAnimationFrame(this.update);
    }

    destroy() {
        cancelAnimationFrame(this.animFrame);
        this.stage.removeChild(this.stage);
        this.div.removeChild(this.canvas);
    }
}

export default Game;
