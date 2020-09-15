import {
  World, Body, Bodies, Constraint, Vector,
} from 'matter-js';

class Flipper {
  constructor(p, engine, canvas) {
    const wallThickness = 20;
    this.p = p;
    this.w = 250;
    this.h = 20;
    this.x = canvas.width / 2;
    this.y = canvas.height - wallThickness - this.h / 2;

    // center of rotation & min/max/step angles
    this.centerRotation = Vector.create(this.x - this.w / 2, this.y);
    this.minAngle = this.p.radians(-40);
    this.maxAngle = 0;
    this.stepAngle = this.p.radians(-20);

    // rectangular body for flipper
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h);
    World.add(engine.world, this.body);

    // constrain both end points of flipper on rotation
    this.constrain(engine.world);
  }

  rotate() {
    // ccw rotation of body around rotation point
    Body.rotate(this.body, this.stepAngle, this.centerRotation);
  }

  rotateLeft() {
    if (Math.round(this.p.degrees(this.body.angle)) === 0
        && this.body.angle + this.stepAngle > this.minAngle) {
      this.rotate(this.stepAngle);
    }
  }

  rotateRight() {
    if (this.body.angle - this.stepAngle < this.maxAngle) {
      this.rotate(-this.stepAngle);
    }
  }

  draw() {
    // rectangle at position & angle of body
    this.p.translate(this.centerRotation.x, this.centerRotation.y);
    this.p.rotate(this.body.angle);
    this.p.rect(this.w / 2, 0, this.w, this.h);
  }

  constrain(world) {
    // rigid constraint on flipper hinge (joint)
    const restHinge = Vector.create(this.x - this.w / 2, this.y);
    const elasticHinge = Constraint.create({
      bodyA: this.body,
      pointA: Vector.create(-this.w / 2, 0),
      pointB: restHinge,
      length: 0,
    });
    World.add(world, elasticHinge);

    // elastic constraint on flipper end
    const restEnd = Vector.create(this.x + this.w / 2, this.y);
    const elasticEnd = Constraint.create({
      bodyA: this.body,
      pointA: Vector.create(this.w / 2, 0),
      pointB: restEnd,
      length: 0,
      stiffness: 1e-3,
      damping: 0.05,
    });
    World.add(world, [elasticHinge, elasticEnd]);
  }
}

export default Flipper;
