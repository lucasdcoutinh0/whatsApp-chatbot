// @ts-ignore
import { NlpManager } from 'node-nlp';

const manager = new NlpManager({ languages: ['en'] });

manager.addDocument('en', 'Do you like pizza?', 'question');
manager.addDocument('en', 'What time is it?', 'question');
manager.addDocument('en', 'How old are you?', 'question');
manager.addDocument('en', 'When is your party?', 'question');
manager.addDocument('en', 'Is it a party?', 'question');
manager.addDocument('en', 'Hi', 'greetings');
manager.addDocument('en', 'Hey', 'greetings');
manager.addDocument('en', 'Hello', 'greetings');
manager.addDocument('en', 'Please turn off the light', 'command');
manager.addDocument('en', 'I am happy today', 'emotion');
// ...

// Train the model and save it to a file
(async () => {
  await manager.train();
  manager.save();
})();

/**
 * Recognize the type of the given text.
 * @param text - The input text to classify.
 * @returns 'question' if the text is a question, 'greeting' if it's a greeting,
 *          'command' if it's a command, 'emotion' if it's an emotion,
 *          or 'other' if it's none of the above.
 */

export async function recognizeTextType(text: string): Promise<string> {
  const response = await manager.process(text);
  const { classifications } = response;
  const threshold = 0.7; // Adjust this value to set the minimum score for classification
  const topClassification = classifications[0];
  if (topClassification.score >= threshold) {
    return topClassification.intent;
  } else {
    return 'other';
  }
}
