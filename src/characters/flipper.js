import planck from 'planck-js';

class Flipper {
  constructor(p, world, wallLeft, wallRight, canvas) {
    const wallThickness = 10;
    this.p = p;
    this.w = canvas.width / 6;
    this.h = 10;

    this.xLeft = canvas.width / 2 - this.w / 2;
    this.yLeft = canvas.height - wallThickness - this.h / 2;
    this.xRight = canvas.width / 2 + this.w / 2;
    this.yRight = canvas.height - wallThickness - this.h / 2;

    // rectangular body for left-flipper
    this.bodyLeft = world.createDynamicBody({
      position: planck.Vec2(this.xLeft, this.yLeft),
    });
    this.bodyLeft.createFixture(
      planck.Box(
        this.w / 2,
        this.h / 2,
      ),
      1e-3,
    );

    // rectangular body for right-flipper
    this.bodyRight = world.createDynamicBody({
      position: planck.Vec2(this.xRight, this.yRight),
    });
    this.bodyRight.createFixture(
      planck.Box(
        this.w / 2,
        this.h / 2,
      ),
      1e-3,
    );

    // hinge joint at end of left-flipper
    const optionsLeft = {
      enableMotor: true,
      motorSpeed: 0.0,
      maxMotorTorque: 1e5,
      enableLimit: true,
      lowerAngle: -30 * (Math.PI / 180.0),
      upperAngle: 0 * (Math.PI / 180.0),
    };
    this.centerRotationLeft = planck.Vec2(this.xLeft - this.w / 2, this.yLeft);
    this.jointLeft = planck.RevoluteJoint(optionsLeft, wallLeft, this.bodyLeft,
      this.centerRotationLeft);
    world.createJoint(this.jointLeft);

    // hinge joint at end of right-flipper
    const optionsRight = {
      enableMotor: true,
      motorSpeed: 0.0,
      maxMotorTorque: 1e5,
      enableLimit: true,
      lowerAngle: 0 * (Math.PI / 180.0),
      upperAngle: 30 * (Math.PI / 180.0),
    };
    this.centerRotationRight = planck.Vec2(this.xRight + this.w / 2, this.yRight);
    this.jointRight = planck.RevoluteJoint(optionsRight, wallRight, this.bodyRight,
      this.centerRotationRight);
    world.createJoint(this.jointRight);
  }

  draw() {
    // rectangles at positions & angles of bodies
    this.p.push();
    this.p.fill('#00f');
    this.p.translate(this.centerRotationLeft.x, this.centerRotationLeft.y);
    this.p.rotate(this.bodyLeft.getAngle());
    this.p.rect(this.w / 2, 0, this.w, this.h);
    this.p.pop();

    this.p.push();
    this.p.fill('#00f');
    this.p.translate(this.centerRotationRight.x, this.centerRotationRight.y);
    this.p.rotate(this.bodyRight.getAngle());
    this.p.rect(-this.w / 2, 0, this.w, this.h);
    this.p.pop();
  }

  rotateLeft() {
    // sets motor speed in radians/second
    this.jointLeft.setMotorSpeed(-2.0);
  }

  resetLeft() {
    // reset angle on arrow keys release
    this.jointLeft.setMotorSpeed(1.0);
  }

  rotateRight() {
    this.jointRight.setMotorSpeed(2.0);
  }

  resetRight() {
    this.jointRight.setMotorSpeed(-1.0);
  }
}

export default Flipper;
