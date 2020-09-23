import planck from 'planck-js';

class Ball {
  constructor(p, world, x, y, r) {
    this.p = p;
    this.r = r;

    // bouncing circle body with initial speed
    this.body = world.createDynamicBody({
      position: planck.Vec2(x, y),
      bullet: true,
    });
    this.body.createFixture(
      planck.Circle(this.r),
      1e-3,
    );
  }

  draw() {
    // circle at position of body
    const position = this.body.getPosition();
    this.p.push();
    this.p.fill('#f00');
    this.p.circle(position.x, position.y, this.r * 2);
    this.p.pop();
  }
}

export default Ball;
