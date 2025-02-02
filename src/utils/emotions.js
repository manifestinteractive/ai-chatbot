import { HfInference } from '@huggingface/inference';

import config from '../config';
import * as webgl from '../webgl/emotions';

const supportedEmotions = [
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

const emotions = {
  classify: async (text) => {
    if (config.hfToken && config.hfToken.startsWith('hf_')) {
      try {
        const client = new HfInference(config.hfToken);
        const output = await client.textClassification({
          model: 'SamLowe/roberta-base-go_emotions',
          inputs: text,
          provider: 'hf-inference'
        });

        return output?.[0]?.label || 'neutral';
      } catch (error) {
        console.error('Error classifying emotion:', error);
      }
    } else {
      return 'neutral';
    }
  },
  getProps: (emotion) => {
    return webgl[emotion] || webgl.neutral;
  },
  supported: supportedEmotions
};

export default emotions;
