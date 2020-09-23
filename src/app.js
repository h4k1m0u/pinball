// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import p5 from 'p5';
import planck from 'planck-js';
import Walls from './characters/walls';
import Ball from './characters/ball';
import Flipper from './characters/flipper';

const FPS = 60;
const canvas = {
  width: 480,
  height: 480,
};

let world = null;
let [ball, walls, flipper] = [null, null, null];
let [ball1, ball2] = [null, null];

// p5 in instance mode using closures
const sketch = (p) => {
  p.setup = () => {
    // draw rect bodies from center
    p.createCanvas(canvas.width, canvas.height);
    p.rectMode(p.CENTER);
    p.angleMode(p.RADIANS);
    p.frameRate(FPS);

    // set gravity
    world = new planck.World({
      gravity: planck.Vec2(0, 10),
    });

    // four boundary walls bodies
    walls = new Walls(p, world, canvas, 10);

    // ball & flipper bodies
    ball = new Ball(p, world, canvas.width / 2, 100, 3);
    ball1 = new Ball(p, world, 100, 100, 10);
    ball2 = new Ball(p, world, 400, 100, 10);
    flipper = new Flipper(p, world, walls.wallBottomLeft, walls.wallBottomRight, canvas);
    // constructor(p, world, wallLeft, wallRight, canvas) {
  };

  p.draw = () => {
    // run physical engine
    world.step(1 / FPS);

    // draw characters on canvas
    p.background('#000');
    walls.draw();
    ball.draw();
    ball1.draw();
    ball2.draw();

    flipper.draw();

    // rotate flippers using arrow keys
    if (p.keyIsDown(p.LEFT_ARROW)) {
      flipper.rotateLeft();
    } else {
      flipper.resetLeft();
    }

    if (p.keyIsDown(p.RIGHT_ARROW)) {
      flipper.rotateRight();
    } else {
      flipper.resetRight();
    }
  };
};

const myp5 = new p5(sketch);
