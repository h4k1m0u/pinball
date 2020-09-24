// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import p5 from 'p5';
import planck from 'planck-js';
import Walls from './characters/walls';
import Ball from './characters/ball';
import Flipper from './characters/flipper';
import Bumper from './characters/bumper';

const FPS = 60;
const THICKNESS = 10;
const canvas = {
  width: 480,
  height: 480,
};

let world = null;
let [ball, walls, flipper] = [null, null];
let bumpers = [];
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
    flipper = new Flipper(p, world, walls.wallBottomLeft, walls.wallBottomRight, canvas);

    // multiple balls at random position
    ball = new Ball(p, world, 200, 10);

    // top & bottom rows of bumers
    bumpers = [
      // top row
      new Bumper(p, world, 100, 100),
      new Bumper(p, world, 240, 100),
      new Bumper(p, world, 380, 100),

      new Bumper(p, world, 170, 180),
      new Bumper(p, world, 310, 180),
    ];

    // collision between balls and bumpers
    world.on('post-solve', (contact) => {
      const fA = contact.getFixtureA();
      const fB = contact.getFixtureB();
      const labelA = fA.getUserData();
      const labelB = fB.getUserData();

      // blink bumper color on next 'step' (frame)
      if ((labelA === 'bumper' && labelB === 'ball') || (labelA === 'ball' && labelB === 'bumper')) {
        bumpers.forEach((bumper) => {
          bumper.color = '#f00';
        });
      } else {
        bumpers.forEach((bumper) => {
          bumper.color = '#0f0';
        });
      }
    });
  };

  p.draw = () => {
    // run physical engine
    world.step(1 / FPS);

    // draw characters on canvas
    p.background('#000');
    walls.draw();
    flipper.draw();
    // ball.draw();

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

    // bumpers
    bumpers.forEach((bumper) => {
      bumper.draw();
    });

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
