// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import p5 from 'p5';
import planck from 'planck-js';
import Walls from './characters/walls';
import Ball from './characters/ball';
import Flipper from './characters/flipper';
import Bumper from './characters/bumper';

const FPS = 60;
const canvas = {
  width: 480,
  height: 480,
};

let world = null;
let [ball, walls, flipper] = [null, null, null];
let bumpers = [];

let score = 0;
let elementScore = null;
let isPaused = false;

// p5 in instance mode using closures
const sketch = (p) => {
  p.setup = () => {
    // draw rect bodies from center
    p.createCanvas(canvas.width, canvas.height + 20);
    p.rectMode(p.CENTER);
    p.angleMode(p.RADIANS);
    p.frameRate(FPS);

    // score html element below canvas
    elementScore = p.createDiv('<b>Score:</b> 0');

    // set gravity
    world = new planck.World({
      gravity: planck.Vec2(0, 10),
    });

    // four boundary walls bodies
    walls = new Walls(p, world, canvas);
    flipper = new Flipper(p, world, walls.wallBottomLeft, walls.wallBottomRight, canvas);
    ball = new Ball(p, world, 200, 10);

    // top & bottom rows of bumers
    bumpers = [
      // top row
      new Bumper(p, world, 100, 100, 'bumper-0'),
      new Bumper(p, world, 240, 100, 'bumper-1'),
      new Bumper(p, world, 380, 100, 'bumper-2'),

      new Bumper(p, world, 170, 180, 'bumper-3'),
      new Bumper(p, world, 310, 180, 'bumper-4'),
    ];

    // collision between ball and bumpers
    world.on('post-solve', (contact) => {
      const [fixtureA, fixtureB] = [contact.getFixtureA(), contact.getFixtureB()];
      const [labelA, labelB] = [fixtureA.getUserData(), fixtureB.getUserData()];
      const fixtureBall = (labelA === 'ball' && fixtureA) || (labelB === 'ball' && fixtureB);
      const fixtureBumper = (labelA.startsWith('bumper') && fixtureA) || (labelB.startsWith('bumper') && fixtureB);

      if (fixtureBall && fixtureBumper) {
        const labelBumper = fixtureBumper.getUserData();
        const iBumper = labelBumper.slice(7);
        const bumper = bumpers[p.int(iBumper)];

        // flash bumpers color on collision & update score
        bumper.color = '#f00';
        setTimeout(() => {
          bumper.color = '#0f0';

          score += 1;
          elementScore.html(`<b>Score:</b> ${score}`);
        }, 100);

        // limit ball speed
        ball.limitSpeed();
      }
    });
  };

  p.draw = () => {
    if (isPaused) {
      return;
    }

    // run physical engine
    world.step(1 / FPS);

    // draw characters on canvas
    p.background('#000');
    walls.draw();
    flipper.draw();
    ball.draw();

    // bumpers
    bumpers.forEach((bumper) => {
      bumper.draw();
    });

    // rotate flippers with arrow keys (key press below needs multiple presses)
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

  p.keyPressed = () => {
    // pause game
    switch (p.keyCode) {
      case p.ENTER:
        isPaused = !isPaused;
        break;
      default:
        break;
    }
  };
};

const myp5 = new p5(sketch);
