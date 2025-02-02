document.addEventListener('DOMContentLoaded', (event) => {
  // we can move only if we are not in a browser's tab
  const isBrowser = matchMedia('(display-mode: browser)').matches;

  // Resize if a standalone app
  if (!isBrowser) {
    window.resizeTo(800, 1200);
  }

  // List of emotions we need to create UI backgrounds
  const emotions = [
    'admiration',
    'amusement',
    'anger',
    'annoyance',
    'approval',
    'caring',
    'confusion',
    'curiosity',
    'desire',
    'disappointment',
    'disapproval',
    'disgust',
    'embarrassment',
    'excitement',
    'fear',
    'gratitude',
    'grief',
    'joy',
    'love',
    'nervousness',
    'neutral',
    'optimism',
    'pride',
    'realization',
    'relief',
    'remorse',
    'sadness',
    'surprise'
  ];

  // Create UI backgrounds for each emotion
  emotions.forEach((emotion) => {
    const $div = document.createElement('div');
    $div.classList.add('gradient-bg', emotion);
    $div.innerHTML =
      '<div class="gradients-container"><div class="g1"></div><div class="g2"></div><div class="g3"></div><div class="g4"></div><div class="g5"></div></div>';
    document.body.appendChild($div);
  });
});
