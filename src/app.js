// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import {
  Engine, World, Bodies, Constraint, Render, Vector,
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
let render = null;
let [ball, walls] = [null, null];

let flipper = null;

// p5 in instance mode using closures
const sketch = (p) => {
  p.setup = () => {
    // matterjs draw rect bodies from center
    p.createCanvas(canvas.width, canvas.height);
    p.rectMode(p.CENTER);
    p.angleMode(p.RADIANS);

    // disable gravity
    engine = Engine.create();
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1;

    // rendering bodies in separate canvas
    render = Render.create({
      element: document.body,
      engine,
      options: {
        width: 480,
        height: 480,
      },
    });

    // four boundary walls bodies
    walls = new Walls(p, engine, canvas, 20);

    // ball & flipper bodies
    ball = new Ball(p, engine, 280, 100, 10);
    flipper = new Flipper(p, engine, canvas);
  };

  p.draw = () => {
    p.background('#000');

    // draw characters on canvas
    walls.draw();
    ball.draw();
    flipper.draw();

    // run physical engine
    Engine.update(engine);

    // visualize bodies in separate canvas
    Render.run(render);

    // rotate flippers using arrow keys inside 1st quadrant
    if (p.keyIsDown(p.LEFT_ARROW)) {
      flipper.rotateLeft();
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      flipper.rotateRight();
    }
  };
};

const myp5 = new p5(sketch);
