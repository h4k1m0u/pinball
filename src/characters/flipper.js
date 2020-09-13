import { World, Bodies, Constraint } from 'matter-js';

class Flipper {
  constructor(p, engine, dims) {
    this.p = p;
    this.x = dims.x;
    this.y = dims.y;
    this.w = dims.w;
    this.h = dims.h;

    // revolute joint
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h);
    const constraintFlipper = Constraint.create({
      pointA: { x: 200, y: 200 },
      bodyB: this.body,
      length: 0,
    });
    World.add(engine.world, [this.body, constraintFlipper]);
  }

  draw() {
    // circle follows position of physical body
    const { position } = this.body;
    this.p.rect(position.x, position.y, this.w, this.h);
  }
}

export default Flipper;
