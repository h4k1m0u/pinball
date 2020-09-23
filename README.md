# Credit
Inspired by:
- [Planck.js example]
- [The coding train tutorial]
- [Pinball with matter.js]

[Planck.js example]: https://github.com/shakiba/planck.js/blob/master/example/Pinball.js
[The coding train tutorial]: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
[Pinball with matter.js]: https://codersblock.com/blog/javascript-physics-with-matter-js/

# Install requirements
```bash
npm install
```

# Building with gulp

```bash
gulp build
gulp watch
```

# Physics
Planck.js was chosen in favour of matter.js, because of the tunneling happening during the collision between flipper & ball with the latter.

## Torque
Twisting force that causes the rotation (rotational equivalent of linear force).

```
$ \tau = f \cdot r \cdot sin \theta $
```

where:
- `\tau`: torque.
- `f`: force.
- `r`: lever.
- `\theta`: angle between the force and the lever.

## Speed and acceleration

```
$ v = v_0 + a \cdot t $
```

with:
- `v`: speed.
- `v_0`: initial speed.
- `a`: accelration.
- `t`: time.

## Force
```
$ f = m \cdot a $
```

where:
- `f`: force.
- `m`: mass (in kg), a measure of inertia that affects how quick speed can change (i.e. acceleration).
- `a`: acceleration (e.g. gravity).

## Power
```
$ p = \tau \cdot \omega $
```

where:
- `p`: power.
- `\tau`: torque.
- `\omega`: angular speed.
