import type { RequestHandler } from './$types';
import type { Message } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OPENAI_KEY } from '$env/static/private';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openAiConfig = new Configuration({
	apiKey: OPENAI_KEY
});

const openai = new OpenAIApi(openAiConfig);

export const config = {
	runtime: 'edge'
};

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	try {
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			stream: true,
			messages: messages.map((message: Message) => ({
				content: message.content,
				role: message.role
			}))
		});

		const stream = OpenAIStream(response);
		return new StreamingTextResponse(stream);
	} catch (err) {
		console.log(err);
		throw new Error(`Something went wrong... ${err}`);
	}
};
