import _ from 'lodash';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const sketch = (p: p5) => {
  const FPS = 30;
  // const DURATION = 10000;

  const NUM_PARTICLES = 400;
  const FREQUENCY = 0.0011;
  const AMPLITUDE = 20;
  const DAMPING = 0.1;
  const SIZE = 5;
  const STEP = 2;
  // const BLUE = p.color(200, 74, 63);
  // const PINK = p.color(340, 35, 96);
  // const APRICOT = p.color(22, 27, 100);
  const BLUE = p.color(41, 120, 160);
  const PINK = p.color(244, 159, 188);
  const APRICOT = p.color(255, 211, 186);

  let points: Particle[] = [];
  // let startMillis: number;
  // let canvas: HTMLElement | null;

  //@ts-ignore
  // const capturer = new CCapture({ format: 'png', framerate: FPS });

  function moveParticle(particle: Particle) {
    const angle =
      p.noise(particle.x * FREQUENCY, particle.y * FREQUENCY) * AMPLITUDE;

    const newVx = particle.vx + p.cos(angle) * STEP;
    const newVy = particle.vy + p.sin(angle) * STEP;

    return {
      x: particle.x + newVx,
      y: particle.y + newVy,
      vx: newVx * DAMPING,
      vy: newVy * DAMPING,
    };
  }

  p.setup = () => {
    p.frameRate(FPS);
    p.createCanvas(800, 800);
    p.background(BLUE);

    points = _.range(1, NUM_PARTICLES).map(() => {
      return {
        x: _.random(0, window.innerWidth),
        y: _.random(0, window.innerHeight),
        vx: 0,
        vy: 0,
      };
    });
    // canvas = document.getElementById('defaultCanvas0')
  };

  p.draw = () => {
    // if (startMillis == null) {
    //   startMillis = p.millis();
    //   capturer.start();
    // }
    // capturer.capture(canvas);

    // const elapsed = p.millis() - startMillis;

    // if (elapsed > DURATION) {
    //   p.noLoop();
    //   console.log('finished recording');
    //   capturer.stop();
    //   capturer.save();
    //   return;
    // }

    points = points.map(moveParticle);

    points.forEach((point, index) => {
      const amount = p.map(index, 1, NUM_PARTICLES, 0, 1);
      const color = p.lerpColor(PINK, APRICOT, amount);
      p.stroke(color);
      p.fill(color);
      p.circle(point.x, point.y, SIZE);
    });
  };
};

const P5 = new p5(sketch);
