import { World, Bodies, Composite } from 'matter-js';

class Walls {
  constructor(p, engine, canvas, thickness) {
    this.p = p;
    this.thickness = thickness;

    // add four wall bodies (reference: center)
    const walls = Composite.create();
    this.wallTop = Bodies.rectangle(0, thickness / 2, canvas.width, thickness,
      { isStatic: true });
    this.wallBottom = Bodies.rectangle(0, canvas.height - thickness / 2, canvas.width, thickness,
      { isStatic: true });
    this.wallLeft = Bodies.rectangle(thickness / 2, 0, thickness, canvas.height,
      { isStatic: true });
    this.wallRight = Bodies.rectangle(canvas.width - thickness / 2, 0, thickness, canvas.height,
      { isStatic: true });
    Composite.add(walls, [this.wallTop, this.wallBottom, this.wallLeft, this.wallRight]);
    World.add(engine.world, walls);
  }

  draw() {
    // rectangles at positions of physical walls (reference: upper-left corner)
    [this.wallTop, this.wallBottom, this.wallLeft, this.wallRight].forEach((wall, iWall) => {
      const { position, bounds } = wall;
      const { min, max } = bounds;
      const width = max.x - min.x;
      const height = max.y - min.y;
      const x = position.x - (iWall >= 2 ? this.thickness / 2 : 0);
      const y = position.y - (iWall < 2 ? this.thickness / 2 : 0);
      this.p.rect(x, y, width, height);
    });
  }
}

export default Walls;
