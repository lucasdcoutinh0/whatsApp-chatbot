import { getTextCompletion } from "./getTextCompletion";
import { OpenAIApi } from "openai";

jest.mock("openai");


describe("getTextCompletion", () => {
    test('should return a text completion', async () => {
       const data = {
         prompt: "test prompt",
         temperature: 0.5,
         max_tokens: 10,
         top_p: 1,
         frequency_penalty: 0,
         presence_penalty: 0,
       };
        const mockResponse = { data: { choices: [{ text: "test completion" }] } };
        (OpenAIApi.prototype.createCompletion as jest.Mock).mockResolvedValue(mockResponse);
        const textCompletion = await getTextCompletion(data);
        expect(textCompletion).toBe("test completion");
    });
    test('should return undefined if an error occurs', async () => {
        const data = {
            prompt: "invalid prompt",
            temperature: 0.5,
            max_tokens: 10,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };
        const mockError = new Error("Invalid API key");
        (OpenAIApi.prototype.createCompletion as jest.Mock).mockRejectedValue(mockError);
        const textCompletion = await getTextCompletion(data);
        expect(textCompletion).toBeUndefined();
    }
    );
});