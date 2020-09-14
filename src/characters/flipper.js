import {
  World, Body, Bodies, Constraint, Vector,
} from 'matter-js';

class Flipper {
  constructor(p, engine, canvas) {
    const wallThickness = 20;
    this.p = p;
    this.w = 100;
    this.h = 10;
    this.x = canvas.width / 2;
    this.y = canvas.height - wallThickness - this.h / 2;
    this.canvas = canvas;

    // angle & center of rotation
    this.angle = 0;
    this.centerRotation = Vector.create(this.x - this.w / 2, this.y);

    // rectangular body
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, { isStatic: true });
    World.add(engine.world, this.body);
  }

  rotate(deltaAngle) {
    // ccw rotation of body around rotation point
    this.angle += deltaAngle;
    Body.rotate(this.body, deltaAngle, this.centerRotation);
  }

  rotateLeft(deltaAngle) {
    if (this.angle + deltaAngle > -Math.PI / 2) {
      this.rotate(deltaAngle);
    } else {
      this.rotate(-Math.PI / 2 - this.angle);
    }
  }

  rotateRight(deltaAngle) {
    if (this.angle - deltaAngle < 0) {
      this.rotate(-deltaAngle);
    } else {
      this.rotate(-this.angle);
    }
  }

  draw() {
    // rectangle at position & angle of body
    this.p.translate(this.centerRotation.x, this.centerRotation.y);
    this.p.rotate(this.angle);
    this.p.rect(this.w / 2, 0, this.w, this.h);
  }
}

export default Flipper;
