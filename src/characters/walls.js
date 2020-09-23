import planck from 'planck-js';

class Walls {
  constructor(p, world, canvas, thickness) {
    this.p = p;
    this.thickness = thickness;

    // add four wall bodies (reference: center of rectangle)
    this.wallTop = world.createBody();
    this.wallTop.createFixture(
      planck.Box(
        canvas.width / 2,
        thickness / 2,
        planck.Vec2(canvas.width / 2, thickness / 2),
      ),
      0.0,
    );

    this.wallBottomLeft = world.createBody();
    this.wallBottomLeft.createFixture(
      planck.Box(
        canvas.width / 6,
        thickness / 2,
        planck.Vec2(canvas.width / 6, canvas.height - thickness / 2),
      ),
      0.0,
    );

    this.wallBottomRight = world.createBody();
    this.wallBottomRight.createFixture(
      planck.Box(
        canvas.width / 6,
        thickness / 2,
        planck.Vec2((5 / 6) * canvas.width, canvas.height - thickness / 2),
      ),
      0.0,
    );

    this.wallLeft = world.createBody();
    this.wallLeft.createFixture(
      planck.Box(
        thickness / 2,
        canvas.height / 2,
        planck.Vec2(thickness / 2, canvas.height / 2),
      ),
      0.0,
    );

    this.wallRight = world.createBody();
    this.wallRight.createFixture(
      planck.Box(
        thickness / 2,
        canvas.height / 2,
        planck.Vec2(canvas.width - thickness / 2, canvas.height / 2),
      ),
      0.0,
    );
  }

  draw() {
    // rectangles at positions of physical walls
    [
      this.wallTop,
      this.wallBottomLeft,
      this.wallBottomRight,
      this.wallLeft,
      this.wallRight,
    ].forEach((wall) => {
      const shape = wall.getFixtureList().getShape();
      const vertices = shape.m_vertices;
      const centroid = shape.m_centroid;

      // this.p.translate(centroid.x, centroid.y);
      this.p.beginShape();
      this.p.vertex(vertices[0].x, vertices[0].y);
      this.p.vertex(vertices[1].x, vertices[1].y);
      this.p.vertex(vertices[2].x, vertices[2].y);
      this.p.vertex(vertices[3].x, vertices[3].y);
      this.p.vertex(vertices[0].x, vertices[0].y);
      this.p.endShape(this.p.CLOSE);
    });
  }
}

export default Walls;
