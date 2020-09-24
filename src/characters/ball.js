import planck from 'planck-js';
import constants from '../constants';

const { THICKNESS, PX2M } = constants;

class Ball {
  constructor(p, world, x, y, r) {
    this.p = p;
    this.r = r;

    // bouncing circle body with initial speed
    this.body = world.createDynamicBody({
      position: planck.Vec2(PX2M * x, PX2M * y),
      bullet: true,
    });
    this.body.createFixture(
      planck.Circle(PX2M * this.r),
      {
        density: 1.0,
        restitution: 0.1,
      },
    );
  }

  draw() {
    // convert back from meter to pixels
    const positionMeter = this.body.getPosition();
    const positionPixel = {
      x: (1 / PX2M) * positionMeter.x,
      y: (1 / PX2M) * positionMeter.y,
    };

    // circle at position of body
    this.p.push();
    this.p.fill('#f00');
    this.p.circle(positionPixel.x, positionPixel.y, this.r * 2);
    this.p.pop();
  }
}

export default Ball;
