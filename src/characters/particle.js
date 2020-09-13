import { World, Bodies } from 'matter-js';

class Particle {
  constructor(p, engine) {
    this.p = p;

    // add circle body to physical world
    this.body = Bodies.circle(100, 100, 20);
    World.add(engine.world, this.body);
  }

  draw() {
    // circle follows position of physical body
    const { position } = this.body;
    this.p.circle(position.x, position.y, 20);
  }
}

export default Particle;
