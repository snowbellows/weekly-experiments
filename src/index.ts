import _ from 'lodash';
import p5 from 'p5';

const FPS = 30;
const DURATION = 30000;

const AMPLITUDE = 0.7;
const FREQUENCY = 30.0;
const SPHERE_SIZE = 300;

// let startMillis: number;
// let canvas: HTMLElement | null;

const sketch = (p: p5) => {
  let shader: p5.Shader;

  //@ts-ignore
  // let capturer = new CCapture({ format: 'png', framerate: FPS });

  p.preload = () => {
    shader = p.loadShader('texture.vert', 'texture.frag');
  };

  p.setup = () => {
    p.createCanvas(800, 800, p.WEBGL);
    p.noStroke();
    p.frameRate(FPS);

    // canvas = document.getElementById('defaultCanvas0');
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

    p.background(255);

    p.push();
    p.shader(shader);

    shader.setUniform('uFrameCount', p.frameCount);
    shader.setUniform('uAmplitude', AMPLITUDE);
    shader.setUniform('uFrequency', FREQUENCY);

    p.rotateZ(p.frameCount * 0.005);
    p.rotateX(p.frameCount * 0.005);
    p.rotateY(p.frameCount * 0.005);

    p.sphere(SPHERE_SIZE);
    p.pop();
  };
};

const P5 = new p5(sketch);
