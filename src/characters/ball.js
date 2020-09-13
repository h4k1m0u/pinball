import { World, Bodies } from 'matter-js';

class Ball {
  constructor(p, engine, dims) {
    this.p = p;
    this.x = dims.x;
    this.y = dims.y;
    this.r = dims.r;

    // add circle body
    this.body = Bodies.circle(this.x, this.y, this.r);
    World.add(engine.world, this.body);
  }

  draw() {
    // circle at position of body
    const { position } = this.body;
    this.p.circle(position.x, position.y, this.r * 2);
  }
}

export default Ball;
