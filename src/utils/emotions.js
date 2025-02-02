import { HfInference } from '@huggingface/inference';

import config from '../config';
import webgl from './webgl';

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
    if (config.useEmotion) {
      try {
        const client = new HfInference(config.hfToken);
        const output = await client.textClassification({
          model: 'SamLowe/roberta-base-go_emotions',
          inputs: text,
          provider: 'hf-inference'
        });

        return output?.[0]?.[0]?.label || 'neutral';
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
