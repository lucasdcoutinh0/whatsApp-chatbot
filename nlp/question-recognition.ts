// @ts-ignore
import { NlpManager } from 'node-nlp';

const manager = new NlpManager({ languages: ['en'] });

(async () => {
  await manager.addCorpus('nlp/corpus-en.json');
  await manager.train();
  manager.save();
})();

export async function recognizeTextType(text: string): Promise<string> {
  const response = await manager.process(text);
  const { classifications } = response;
  const threshold = 0.6;
  const topClassification = classifications[0];
  if (topClassification.score >= threshold) {
    return topClassification.intent;
  } else {
    return 'other';
  }
}
