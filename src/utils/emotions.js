const webgl = {
  angry: {
    colors: {
      fg: '#e97070',
      bg: '#3d0a0a'
    },
    camera: {
      intensity: 0.5,
      maxPitch: 0.7,
      maxRoll: 2.0,
      maxYaw: 0.05,
      pitchFrequency: 1,
      rollFrequency: 2,
      yawFrequency: 1
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 7.5
    },
    particles: {
      aperture: 3,
      blending: 2,
      color: { r: 233, g: 112, b: 112, a: 1 },
      curl: 0.35,
      focus: 4.5,
      fov: 30,
      size: 512,
      speed: 75
    }
  },
  bored: {
    colors: {
      fg: '#e6d1e6',
      bg: '#2e2159'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 0,
      blending: 5,
      color: { r: 182, g: 161, b: 222, a: 1 },
      curl: 0.3,
      focus: 4.5,
      fov: 300,
      size: 512,
      speed: 1
    }
  },
  happy: {
    colors: {
      fg: '#ffe948',
      bg: '#2a494c'
    },
    camera: {
      intensity: 1,
      maxPitch: 1,
      maxRoll: 1,
      maxYaw: 1,
      pitchFrequency: 1,
      rollFrequency: 1,
      yawFrequency: 1
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 1.5
    },
    particles: {
      aperture: 0.3,
      blending: 1,
      color: { r: 255, g: 233, b: 72, a: 1 },
      curl: 0.25,
      focus: 4,
      fov: 100,
      size: 350,
      speed: 5
    }
  },
  jealous: {
    colors: {
      fg: '#bd71a0',
      bg: '#2d1d3f'
    },
    camera: {
      intensity: 2,
      maxPitch: 2,
      maxRoll: 2,
      maxYaw: 2,
      pitchFrequency: 2,
      rollFrequency: 2,
      yawFrequency: 2
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 5
    },
    particles: {
      aperture: 2,
      blending: 2,
      color: { r: 189, g: 113, b: 160, a: 1 },
      curl: 0.35,
      focus: 5,
      fov: 25,
      size: 350,
      speed: 50
    }
  },
  love: {
    colors: {
      fg: '#f9ff89',
      bg: '#4e2a5b'
    },
    camera: {
      intensity: 2,
      maxPitch: 2,
      maxRoll: 2,
      maxYaw: 2,
      pitchFrequency: 2,
      rollFrequency: 2,
      yawFrequency: 2
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 3
    },
    particles: {
      aperture: 0,
      blending: 2,
      color: { r: 249, g: 255, b: 137, a: 1 },
      curl: 0.25,
      focus: 4.3,
      fov: 210,
      size: 512,
      speed: 3
    }
  },
  neutral: {
    colors: {
      fg: '#FFFFFF',
      bg: '#000000'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 1,
      blending: 1,
      color: { r: 255, g: 255, b: 255, a: 1 },
      curl: 0.3,
      focus: 5,
      fov: 200,
      size: 512,
      speed: 1
    }
  },
  relaxed: {
    colors: {
      fg: '#d1e89a',
      bg: '#4d7bac'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.15
    },
    particles: {
      aperture: 1,
      blending: 2,
      color: { r: 209, g: 232, b: 154, a: 1 },
      curl: 0.3,
      focus: 5,
      fov: 200,
      size: 350,
      speed: 1
    }
  },
  sad: {
    colors: {
      fg: '#8ebbec',
      bg: '#112650'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 4.5,
      blending: 5,
      color: { r: 142, g: 187, b: 236, a: 1 },
      curl: 0.3,
      focus: 4.95,
      fov: 195,
      size: 512,
      speed: 9
    }
  },
  serious: {
    colors: {
      fg: '#ffc091',
      bg: '#244c7f'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 1,
      blending: 2,
      color: { r: 255, g: 192, b: 145, a: 1 },
      curl: 0.2,
      focus: 4,
      fov: 50,
      size: 400,
      speed: 1
    }
  },
  shy: {
    colors: {
      fg: '#ccdef0',
      bg: '#032c49'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 1.4,
      blending: 1,
      color: { r: 204, g: 222, b: 240, a: 1 },
      curl: 0.36,
      focus: 3.73,
      fov: 145,
      size: 412,
      speed: 0.1
    }
  },
  sleep: {
    colors: {
      fg: '#f1e7ff',
      bg: '#113545'
    },
    camera: {
      intensity: 3,
      maxPitch: 3,
      maxRoll: 3,
      maxYaw: 3,
      pitchFrequency: 3,
      rollFrequency: 3,
      yawFrequency: 3
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 1.5,
      blending: 1,
      color: { r: 241, g: 231, b: 255, a: 1 },
      curl: 0.5,
      focus: 3.5,
      fov: 145,
      size: 400,
      speed: 0.1
    }
  },
  surprised: {
    colors: {
      fg: '#c3effb',
      bg: '#006185'
    },
    camera: {
      intensity: 5,
      maxPitch: 5,
      maxRoll: 5,
      maxYaw: 5,
      pitchFrequency: 5,
      rollFrequency: 5,
      yawFrequency: 5
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 5
    },
    particles: {
      aperture: 1.5,
      blending: 5,
      color: { r: 195, g: 239, b: 251, a: 1 },
      curl: 0.35,
      focus: 4.75,
      fov: 60,
      size: 425,
      speed: 50
    }
  },
  suspicious: {
    colors: {
      fg: '#9171ce',
      bg: '#2f166a'
    },
    camera: {
      intensity: 0,
      maxPitch: 0,
      maxRoll: 0,
      maxYaw: 0,
      pitchFrequency: 0,
      rollFrequency: 0,
      yawFrequency: 0
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 0.05
    },
    particles: {
      aperture: 0,
      blending: 2,
      color: { r: 145, g: 113, b: 206, a: 1 },
      curl: 0.5,
      focus: 4.8,
      fov: 95,
      size: 485,
      speed: 0.5
    }
  },
  victory: {
    colors: {
      fg: '#fe9e5b',
      bg: '#0c2446'
    },
    camera: {
      intensity: 4,
      maxPitch: 4,
      maxRoll: 4,
      maxYaw: 4,
      pitchFrequency: 4,
      rollFrequency: 4,
      yawFrequency: 4
    },
    orbit: {
      autoRotate: true,
      autoRotateSpeed: 4
    },
    particles: {
      aperture: 0.1,
      blending: 2,
      color: { r: 254, g: 158, b: 91, a: 1 },
      curl: 0.25,
      focus: 5,
      fov: 85,
      size: 512,
      speed: 4
    }
  }
};

const supportedEmotions = [
  'angry',
  'bored',
  'happy',
  'jealous',
  'love',
  'neutral',
  'relaxed',
  'sad',
  'serious',
  'shy',
  'sleep',
  'surprised',
  'suspicious',
  'victory'
];

const emotions = {
  getProps: (emotion) => {
    return webgl[emotion] || webgl.neutral;
  },
  parse: (message) => {
    // Initial Content
    let content = message;
    let emotion = 'neutral';

    // Regular expressions to match emotions depending on where they appear
    const regexAny = new RegExp(`@(${supportedEmotions.join('|')})`, 'gi');
    const regexStart = new RegExp(`^@(${supportedEmotions.join('|')})\n?\n?`, 'gi');

    // Match the emotion at the start of the message or anywhere in the message
    const matchStart = content.match(regexStart);
    const matchAny = content.match(regexAny);
    const matchUnsupported = content.match(/^@[a-z]+\n?\n?/gi);

    // If a match is found at start, remove it from the content
    if (matchStart) {
      // Strip the emotion from the message
      emotion = matchStart[0].replace('@', '').trim();
      content = content.replace(matchStart[0], '');
    }

    // If a match is found anywhere else, replace the tag with the emotion
    if (matchAny) {
      emotion = matchStart[0].replace('@', '').replace('\n', '').trim();
      content = content.replace(matchStart[0], emotion);
    }

    // If an unsupported emotion is found, strip it from the message
    if (matchUnsupported) {
      const unsupported = matchUnsupported[0].replace('@', '').replace('\n', '').trim();
      content = content.replace(matchUnsupported[0], '');

      if (unsupported) {
        console.log(`Unsupported emotion: ${unsupported}`);
      }

      // TODO: Handle unsupported emotions
    }

    return { content, emotion };
  },
  supported: supportedEmotions
};

export default emotions;
