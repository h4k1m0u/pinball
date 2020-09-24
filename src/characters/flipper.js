import planck from 'planck-js';
import constants from '../constants';

const { THICKNESS, PX2M } = constants;

class Flipper {
  constructor(p, world, wallLeft, wallRight, canvas, options) {
    this.p = p;
    this.w = options.width;
    this.h = options.height;

    this.xLeft = canvas.width / 2 - this.w / 2 - THICKNESS;
    this.yLeft = canvas.height - THICKNESS - this.h / 2;
    this.xRight = canvas.width / 2 + this.w / 2 + THICKNESS;
    this.yRight = canvas.height - THICKNESS - this.h / 2;

    // rectangular body for left-flipper
    this.bodyLeft = world.createDynamicBody({
      position: planck.Vec2(PX2M * this.xLeft, PX2M * this.yLeft),
    });
    this.bodyLeft.createFixture(
      planck.Box(
        PX2M * (this.w / 2),
        PX2M * (this.h / 2),
      ),
      1.0,
    );

    // rectangular body for right-flipper
    this.bodyRight = world.createDynamicBody({
      position: planck.Vec2(PX2M * this.xRight, PX2M * this.yRight),
    });
    this.bodyRight.createFixture(
      planck.Box(
        PX2M * (this.w / 2),
        PX2M * (this.h / 2),
      ),
      1.0,
    );

    // hinge joint at end of left-flipper
    const optionsLeft = {
      enableMotor: true,
      motorSpeed: 0.0,
      maxMotorTorque: 10,
      enableLimit: true,
      lowerAngle: -20 * (Math.PI / 180.0),
      upperAngle: 5 * (Math.PI / 180.0),
    };
    this.centerRotationLeft = planck.Vec2(
      PX2M * (this.xLeft - this.w / 2),
      PX2M * this.yLeft,
    );
    this.jointLeft = planck.RevoluteJoint(optionsLeft, wallLeft, this.bodyLeft,
      this.centerRotationLeft);
    world.createJoint(this.jointLeft);

    // hinge joint at end of right-flipper
    const optionsRight = {
      enableMotor: true,
      motorSpeed: 0.0,
      maxMotorTorque: 10,
      enableLimit: true,
      lowerAngle: -5 * (Math.PI / 180.0),
      upperAngle: 20 * (Math.PI / 180.0),
    };
    this.centerRotationRight = planck.Vec2(
      PX2M * (this.xRight + this.w / 2),
      PX2M * this.yRight,
    );
    this.jointRight = planck.RevoluteJoint(optionsRight, wallRight, this.bodyRight,
      this.centerRotationRight);
    world.createJoint(this.jointRight);
  }

  draw() {
    // rectangles at positions & angles of bodies (convert meters to pixels)
    this.p.push();
    this.p.fill('#00f');
    this.p.translate(
      (1 / PX2M) * this.centerRotationLeft.x,
      (1 / PX2M) * this.centerRotationLeft.y,
    );
    this.p.rotate(this.bodyLeft.getAngle());
    this.p.rect(this.w / 2, 0, this.w, this.h);
    this.p.pop();

    this.p.push();
    this.p.fill('#00f');
    this.p.translate(
      (1 / PX2M) * this.centerRotationRight.x,
      (1 / PX2M) * this.centerRotationRight.y,
    );
    this.p.rotate(this.bodyRight.getAngle());
    this.p.rect(-this.w / 2, 0, this.w, this.h);
    this.p.pop();
  }

  rotateLeft() {
    // sets motor speed in radians/second
    this.jointLeft.setMotorSpeed(-20.0);
  }

  resetLeft() {
    // reset angle on arrow keys release
    this.jointLeft.setMotorSpeed(20.0);
  }

  rotateRight() {
    this.jointRight.setMotorSpeed(20.0);
  }

  resetRight() {
    this.jointRight.setMotorSpeed(-20.0);
  }
}

export default Flipper;
