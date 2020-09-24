import planck from 'planck-js';
import constants from '../constants';

const { PX2M } = constants;

class Bumper {
  constructor(p, world, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.r = 25;
    this.color = '#0f0';

    // static bumper
    this.body = world.createBody({
      type: 'static',
      position: planck.Vec2(PX2M * x, PX2M * y),
    });
    this.body.createFixture(
      planck.Circle(PX2M * this.r),
      {
        density: 1.0,
        friction: 0.0,
        userData: 'bumper',
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
    this.p.fill(this.color);
    this.p.circle(positionPixel.x, positionPixel.y, this.r * 2);
    this.p.pop();
  }

  collide() {
    // change bumper color when hit by ball
    this.color = '#f00';
  }
}

export default Bumper;
