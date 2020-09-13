// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1
import { Engine, World } from 'matter-js';
import p5 from 'p5';
import Particle from './characters/particle';

const physics = {};
let particle = null;

// p5 in instance mode using closures
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(480, 480);

    // initialize physical engine
    physics.engine = Engine.create();
    particle = new Particle(p, physics.engine);
  };

  p.draw = () => {
    p.background('#000');

    // draw particle on canvas
    particle.draw();
    Engine.update(physics.engine);
  };
};

const myp5 = new p5(sketch);
