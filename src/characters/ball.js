import {
  World, Bodies, Body, Vector,
} from 'matter-js';

class Ball {
  constructor(p, engine, x, y, r) {
    this.p = p;
    this.r = r;

    // circle body with never-ending elastic bouncing
    this.body = Bodies.circle(x, y, this.r, {
      friction: 0.2,
      restitution: 1.0,
      frictionAir: 0.0,
    });
    World.add(engine.world, this.body);
  }

  draw() {
    // circle at position of body
    const { position } = this.body;
    this.p.push();
    this.p.fill('#f00');
    this.p.circle(position.x, position.y, this.r * 2);
    this.p.pop();
  }
}

export default Ball;
