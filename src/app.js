// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import {
  Engine, World, Bodies, Constraint,
} from 'matter-js';
import p5 from 'p5';
import Walls from './characters/walls';
import Ball from './characters/ball';
import Flipper from './characters/flipper';

const canvas = {
  width: 480,
  height: 480,
};

let engine = null;
let [ball, walls] = [null, null];

// p5 in instance mode using closures
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(canvas.width, canvas.height);

    // initialize physical engine
    engine = Engine.create();
    ball = new Ball(p, engine, {
      x: 200, y: 200, r: 20,
    });

    // four walls
    walls = new Walls(p, engine, canvas, 10);
    engine.world.gravity.x = 0;
    engine.world.gravity.y = -1;
  };

  p.draw = () => {
    p.background('#000');

    // draw ball on canvas
    walls.draw();
    ball.draw();
    Engine.update(engine);
  };
};

const myp5 = new p5(sketch);
