import autobind from 'auto-bind-es5'
import * as THREE from 'three';
import Mousetrap from 'mousetrap';

export class Game {
    constructor() {
        autobind(this)
        this.div = document.getElementById('gamescene');

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.div.appendChild(this.renderer.domElement);

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add(this.cube);
        
        this.camera.position.z = 5;


        Mousetrap.bind('up', this.accelerate)

        this.update();
    }

    accelerate() {
        console.log('accelerate!')
        this.cube.translate.z += 1
    }

    update() {
        const now = Date.now();
        this.cube.position.x = Math.sin(now / 200)
        this.cube.position.y = Math.cos(now / 200)
        this.cube.rotation.z = now / Math.PI / 200;
        this.animFrame = requestAnimationFrame(this.update);
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        cancelAnimationFrame(this.animFrame);
        this.div.removeChild(this.renderer.domElement);
    }
}

export default Game;
