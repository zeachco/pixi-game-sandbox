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
        this.container = new PIXI.Container();
        this.stage.addChild(this.container);

        this.rect = PIXI.Sprite.fromImage('/car.png');
        this.rect.scale.set(.25, .25);
        this.rect.anchor.set(.35 ,.5);
        this.rect.tint = 0x2200ff
        
        this.container.addChild(this.rect);


        // this.rect.interactive = true;
        // this.rect.buttonMode = true;
        // this.rect.addListener('click', () => {
        //     console.error('click')
        // })

        // rect 2 //
        this.rect2 = PIXI.Sprite.fromImage('/car.png');
        this.rect2.tint = 0x4466ff
        this.rect2.anchor.set(.35 ,.5);
        this.rect.addChild(this.rect2);

        this.rect2.addListener('click', () => {
            console.error('click')
        })
        
        this.car =  PIXI.Sprite.fromImage('/car.png');
        this.car.tint = 0xff8800
        this.car.anchor.set(.35 ,.5);
        this.car.position.set(150, 100);
        this.car.rotation = .4
        this.rect2.addChild(this.car);

        this.progress = new PIXI
            .Graphics()
            .beginFill(0xff8800)
            .lineStyle(1, 0xffff88, .4)
            .drawRoundedRect(10, 10, 120, 6, 1)
            .endFill()
        ;

        this.container.addChild(this.progress);
        this.progress.fill = ['red', 'green', 'blue'];
        this.progress.fillGradientType = PIXI.TEXT_GRADIENT.LINEAR_HORIZONTAL;
        this.progress.fillGradientStops = [0.0, 0.3, 1.0];

        this.progress.scale.set(3, 3)

        this.update();
    }

    update() {
        const now = Date.now();
        const step = now / 2000;
        this.rect.position.x = window.innerWidth / 2 + Math.sin(step) * this.stage.width / 2.1
        this.rect.position.y = window.innerHeight / 2 + Math.cos(step) * this.stage.height / 2.1
        this.rect.rotation = now / Math.PI / 2000;
        this.rect2.position.x = Math.sin(step) * this.stage.width / 2.1
        this.rect2.position.y = Math.cos(step) * this.stage.height / 2.1
        this.rect2.rotation = now / Math.PI / 2000;
        this.car.position.x = Math.sin(step) * this.stage.width / 2.1
        this.car.position.y = Math.cos(step) * this.stage.height / 2.1
        this.car.rotation = now / Math.PI / 2000;
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
