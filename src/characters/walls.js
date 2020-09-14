import { World, Bodies, Composite } from 'matter-js';

class Walls {
  constructor(p, engine, canvas, thickness) {
    this.p = p;
    this.thickness = thickness;

    // add four wall bodies (reference: center of rectangle)
    const walls = Composite.create();
    this.wallTop = Bodies.rectangle(
      canvas.width / 2,
      thickness / 2,
      canvas.width,
      thickness,
      { isStatic: true },
    );
    this.wallBottom = Bodies.rectangle(
      canvas.width / 2,
      canvas.height - thickness / 2,
      canvas.width,
      thickness,
      { isStatic: true },
    );
    this.wallLeft = Bodies.rectangle(
      thickness / 2,
      canvas.height / 2,
      thickness,
      canvas.height,
      { isStatic: true },
    );
    this.wallRight = Bodies.rectangle(
      canvas.width - thickness / 2,
      canvas.height / 2,
      thickness,
      canvas.height,
      { isStatic: true },
    );

    Composite.add(walls, [this.wallTop, this.wallBottom, this.wallLeft, this.wallRight]);
    World.add(engine.world, walls);
  }

  draw() {
    // rectangles at positions of physical walls
    [this.wallTop, this.wallBottom, this.wallLeft, this.wallRight].forEach((wall, iWall) => {
      const { position, bounds } = wall;
      const { min, max } = bounds;
      const width = max.x - min.x;
      const height = max.y - min.y;
      this.p.rect(position.x, position.y, width, height);
    });
  }
}

export default Walls;
