// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import p5 from 'p5';
import planck from 'planck-js';
import Walls from './characters/walls';
import Ball from './characters/ball';
import Flipper from './characters/flipper';

const FPS = 60;
const THICKNESS = 10;
const canvas = {
  width: 480,
  height: 480,
};

let world = null;
let [walls, flipper] = [null, null];
const balls = [];

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
    walls = new Walls(p, world, canvas);
    flipper = new Flipper(p, world, walls.wallBottomLeft, walls.wallBottomRight, canvas,
      {
        width: canvas.width / 6,
        height: 10,
      });
  };

  p.draw = () => {
    // run physical engine
    world.step(1 / FPS);

    // draw characters on canvas
    p.background('#000');
    walls.draw();
    flipper.draw();

    // multiple ball at random position
    if (p.frameCount % (FPS * 2) === 0) {
      const x = p.int(p.random(canvas.width / 2 - 100, canvas.width / 2 + 100));
      balls.push(new Ball(p, world, x, 10, 5));
    }

    if (balls.length > 0) {
      balls.forEach((b) => {
        b.draw();
      });
    }

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
