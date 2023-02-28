import { NlpManager } from 'node-nlp';

const manager = new NlpManager({ languages: ['en'] });

// Define the training data
manager.addDocument('en', 'Do you like pizza?', 'question.likePizza');
manager.addDocument('en', 'What is your name?', 'question.myName');
manager.addDocument('en', 'What time is it?', 'question.time');

// Train the model
(async () => {
  await manager.train();
  manager.save();
})();

// Define a function to recognize questions
async function recognizeQuestion(text: string): Promise<boolean> {
  const response = await manager.process('en', text);
  const intent = response.intent[0].value;
  return intent.startsWith('question.');
}