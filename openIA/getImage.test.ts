import { getImage } from './getImage';
import { OpenAIApi } from 'openai';

jest.mock('openai');

describe('getImage', () => {
  test('should return an image url', async () => {
    const prompt = 'test prompt';
    const mockResponse = { data: { data: [{ url: 'https://example.com/image.jpg' }] } };
    (OpenAIApi.prototype.createImage as jest.Mock).mockResolvedValue(mockResponse);
    const imageUrl = await getImage(prompt);
    expect(imageUrl).toBe('https://example.com/image.jpg');
  });

  test('should return undefined if an error occurs', async () => {
    const prompt = 'invalid prompt';
    const mockError = new Error('Invalid API key');
    (OpenAIApi.prototype.createImage as jest.Mock).mockRejectedValue(mockError);
    const imageUrl = await getImage(prompt);
    expect(imageUrl).toBeUndefined();
  });
});
