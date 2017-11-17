import './style.css';

let Game = require('./game').default
let currentGame = new Game();

if (module.hot) {
    module.hot.accept('./game', () => {
        currentGame.destroy();
        Game = require('./game').default;
        currentGame = new Game();
    })
}