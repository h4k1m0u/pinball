import planck from 'planck-js';
import constants from '../constants';

const { THICKNESS, PX2M } = constants;

class Walls {
  constructor(p, world, canvas) {
    this.p = p;

    // add four wall bodies (reference: center of rectangle)
    const positionTop = planck.Vec2(
      PX2M * (canvas.width / 2),
      PX2M * (THICKNESS / 2),
    );
    this.wallTop = world.createBody({
      type: 'static',
    });
    this.wallTop.createFixture(
      planck.Box(
        PX2M * (canvas.width / 2),
        PX2M * (THICKNESS / 2),
        positionTop,
      ),
      {
        density: 1.0,
        friction: 0.0,
        userData: 'wall-top',
      },
    );

    const positionBottomLeft = planck.Vec2(
      PX2M * (canvas.width / 6),
      PX2M * ((canvas.height + (2 / 3) * canvas.height) / 2),
    );
    this.wallBottomLeft = world.createBody({
      type: 'static',
    });
    this.wallBottomLeft.createFixture(
      planck.Box(
        PX2M * ((canvas.width / 6) / Math.cos(Math.PI / 4)),
        PX2M * (THICKNESS / 2),
        positionBottomLeft,
        Math.PI / 4,
      ),
      {
        density: 1.0,
        friction: 0.0,
        userData: 'wall-bottom-left',
      },
    );

    const positionBottomRight = planck.Vec2(
      PX2M * ((5 / 6) * canvas.width),
      PX2M * ((canvas.height + (2 / 3) * canvas.height) / 2),
    );
    this.wallBottomRight = world.createBody({
      type: 'static',
    });
    this.wallBottomRight.createFixture(
      planck.Box(
        PX2M * ((canvas.width / 6) / Math.cos(-Math.PI / 4)),
        PX2M * (THICKNESS / 2),
        positionBottomRight,
        -Math.PI / 4,
      ),
      {
        density: 1.0,
        friction: 0.0,
        userData: 'wall-bottom-right',
      },
    );

    const positionLeft = planck.Vec2(
      PX2M * (THICKNESS / 2),
      PX2M * (canvas.height / 3),
    );
    this.wallLeft = world.createBody({
      type: 'static',
    });
    this.wallLeft.createFixture(
      planck.Box(
        PX2M * (THICKNESS / 2),
        PX2M * (canvas.height / 3),
        positionLeft,
      ),
      {
        density: 1.0,
        friction: 0.0,
        userData: 'wall-left',
      },
    );

    const positionRight = planck.Vec2(
      PX2M * (canvas.width - THICKNESS / 2),
      PX2M * (canvas.height / 3),
    );
    this.wallRight = world.createBody({
      type: 'static',
    });
    this.wallRight.createFixture(
      planck.Box(
        PX2M * (THICKNESS / 2),
        PX2M * (canvas.height / 3),
        positionRight,
      ),
      {
        density: 1.0,
        friction: 0.0,
        userData: 'wall-right',
      },
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
    ].forEach((wall, iWall) => {
      const fixtures = wall.getFixtureList();
      const [body, shape] = [fixtures.getBody(), fixtures.getShape()];
      const centroid = {
        x: (1 / PX2M) * shape.m_centroid.x,
        y: (1 / PX2M) * shape.m_centroid.y,
      };
      const vertices = shape.m_vertices.map((vertex) => ({
        x: (1 / PX2M) * vertex.x - centroid.x,
        y: (1 / PX2M) * vertex.y - centroid.y,
      }));

      if (iWall === 1 || iWall === 2) {
        // console.log('vertices ', vertices);
        // console.log('centroid ', centroid);
      }

      // convert back from meter to pixels
      this.p.push();
      this.p.translate(centroid.x, centroid.y);
      this.p.rotate(body.getAngle());
      this.p.beginShape();
      this.p.vertex(vertices[0].x, vertices[0].y);
      this.p.vertex(vertices[1].x, vertices[1].y);
      this.p.vertex(vertices[2].x, vertices[2].y);
      this.p.vertex(vertices[3].x, vertices[3].y);
      this.p.endShape(this.p.CLOSE);
      this.p.pop();
    });
  }
}

export default Walls;
