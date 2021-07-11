import _ from 'lodash';
import p5 from 'p5';

const sketch = (p: p5) => {
  const FPS = 30;
  const CANVAS_SIZE = 900;

  const FREQUENCY = 0.01;
  const STROKE_WEIGHT = 40;
  const PURPLE = p.color(66, 32, 64);
  const TRANSPARENT_PURPLE = p.color(66, 32, 64);
  TRANSPARENT_PURPLE.setAlpha(10);
  const VIOLET = p.color(234, 122, 244);
  const BLUE = p.color(28.0, 93.0, 153.0);
  const NUM_TEETH = 6;
  const SPEED = 1;

  // let canvas: HTMLElement | null;
  // let capturerRunning = false;

  let maxTeethHeight: number;
  let firstLineY: number;
  let secondLineY: number;
  let gap: number;
  let firstRowTeeth: number[];
  let secondRowTeeth: number[];

  //@ts-ignore
  // const capturer = new CCapture({ format: 'png', framerate: FPS });

  /* 
  Moves the x coordinates of the teeth to the right
  Wrapping them around if they go off screen
  */
  function moveTeeth(rowXs: number[]): number[] {
    const newRowXs = rowXs.map((x) => x + SPEED);
    const last = newRowXs[newRowXs.length - 1];
    if (last > p.width + STROKE_WEIGHT) {
      return [-STROKE_WEIGHT, ...newRowXs.slice(0, -1)];
    }
    return newRowXs;
  }

  /*
  Draws the teeth either up or down from the base line y
  The height determined by noise relating to the start coordinate
  */
  function drawTeeth(rowXs: number[], direction: 'down' | 'up') {
    rowXs.forEach((x) => {
      const y = direction === 'down' ? firstLineY : secondLineY;
      const height =
        p.noise(x * FREQUENCY, y) * maxTeethHeight + maxTeethHeight / 2;
      if (direction === 'down') {
        p.line(x, y, x, y + height);
      } else {
        p.line(x, y - height, x, y);
      }
    });
  }

  p.setup = () => {
    // Run at start

    p.frameRate(FPS);
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p.background(PURPLE);

    firstLineY = STROKE_WEIGHT / 2;
    secondLineY = p.height - STROKE_WEIGHT / 2;
    gap = (p.width + STROKE_WEIGHT * 2) / NUM_TEETH;
    maxTeethHeight = p.height / 2 + 20;

    firstRowTeeth = _.range(0, NUM_TEETH).map((x) => x * gap);
    secondRowTeeth = _.range(0, NUM_TEETH).map((x) => x * gap - gap / 2);

    // canvas = document.getElementById('defaultCanvas0');
  };

  p.draw = () => {
    // // End frame capture
    // if (firstRowTeeth[0] === -1 && capturerRunning) {
    //   p.noLoop();
    //   console.log('finished recording');
    //   capturer.stop();
    //   capturer.save();
    //   return;
    // }

    // // Start frame capture
    // if (firstRowTeeth[0] === -1 && !capturerRunning) {
    //   console.log('start recording');
    //   capturerRunning = true;
    //   capturer.start();
    // }

    // Overlay partially transparent background every frame
    p.noStroke();
    p.fill(TRANSPARENT_PURPLE);
    p.rect(0, 0, p.width, p.height);

    // Set stroke weight and cap for base lines and teeth
    p.strokeWeight(STROKE_WEIGHT);
    p.strokeCap(p.SQUARE);

    // First Row
    p.stroke(VIOLET); // Stroke colour violet
    p.line(0, firstLineY, p.width, firstLineY); // Base line for row
    firstRowTeeth = moveTeeth(firstRowTeeth); // Move teeth to the right
    drawTeeth(firstRowTeeth, 'down'); // Draw teeth down from base line

    // Second Row
    p.stroke(BLUE); // Stroke colour blue
    p.line(0, secondLineY, p.width, secondLineY); // Base line for row
    secondRowTeeth = moveTeeth(secondRowTeeth); // Move teeth to the right
    drawTeeth(secondRowTeeth, 'up'); // Draw teeth up from base line

    // // Capture image of frame
    // if (capturerRunning) {
    //   capturer.capture(canvas);
    // }
  };
};

const P5 = new p5(sketch);
