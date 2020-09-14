import {
  World, Bodies, Body, Vector,
} from 'matter-js';

class Ball {
  constructor(p, engine, x, y, r) {
    this.p = p;
    this.r = r;

    // add circle body
    this.body = Bodies.circle(x, y, this.r);
    World.add(engine.world, this.body);
  }

  draw() {
    // circle at position of body
    const { position } = this.body;
    this.p.circle(position.x, position.y, this.r * 2);
  }
}

export default Ball;
