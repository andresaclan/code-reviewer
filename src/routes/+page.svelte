<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { prompt } from '$lib/index';
	import { marked } from 'marked';
	import prism from 'prismjs';
	import { onMount, afterUpdate } from 'svelte';
	import 'prismjs/components/prism-java'; // Java
	import 'prismjs/components/prism-markup'; // HTML, XML
	import 'prismjs/components/prism-css'; // CSS
	import 'prismjs/components/prism-javascript'; // JavaScript
	import 'prismjs/components/prism-python'; // Python
	import 'prismjs/components/prism-java'; // Java
	import 'prismjs/components/prism-c'; // C
	import 'prismjs/components/prism-csharp'; // C#
	import 'prismjs/components/prism-cpp'; // C++
	import 'prismjs/components/prism-ruby'; // Ruby
	import 'prismjs/components/prism-go'; // Go
	import 'prismjs/components/prism-swift'; // Swift
	import 'prismjs/components/prism-typescript'; // TypeScript
	import 'prismjs/components/prism-json'; // JSON
	import 'prismjs/components/prism-rust'; // Rust
	import 'prismjs/components/prism-bash'; // Bash
	import 'prismjs/components/prism-powershell'; // PowerShell
	import IconOpenAi from '$lib/components/IconOpenAI.svelte';

	onMount(() => {
		prism.highlightAll();
	});

	afterUpdate(() => {
		prism.highlightAll();
	});

	const { messages, handleSubmit, input, setMessages, reload } = useChat({
		initialMessages: [{ role: 'system', content: prompt, id: '0' }]
	});

	// function that will reset the messages array and call the reload function
	function clearChat() {
		setMessages([{ role: 'system', content: prompt, id: '0' }]);
	}
</script>

<main class="p-4">
	<div class="grid grid-cols-1 divide-y">
		{#each $messages as message}
			<div class="flex justify-center">
				<div class="flex w-8/12">
					{#if message.role === 'user'}
						<p class="p-2 rounded-md mb-2 text-white">{message.content}</p>
					{:else if message.id === '0'}
						<p class="p-2 rounded-md mb-2 text-white">
							Welcome to the Code Reviewer Chatbot! I'm here to assist you with analyzing and
							improving your code. Please provide a code snippet, and I'll provide suggestions. Feel
							free to ask for help or provide any specific requirements you have. Let's get started!
							write a function in java that sums two numbers
						</p>
					{:else}
						<p class="p-2 rounded-md text-white max-w-3xl">
							<IconOpenAi props="inline-block w-4 h-4 mr-2" />
							{@html marked(message.content)}
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<div class="flex justify-center mt-4">
		<form class="flex" on:submit={handleSubmit}>
			<div class="flex">
				<textarea
					class="w-[500px] flex-grow border border-gray-300 bg-white text-gray-800 rounded-l-md p-2 resize-none shadow-sm"
					bind:value={$input}
					placeholder="Enter your code..."
				/>
				<button
					class="bg-green-500 hover:bg-green-600 text-white rounded-r-md px-4 py-2"
					type="submit"
				>
					Generate Review
				</button>
				<button
					class="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 ml-2"
					type="submit"
					on:click={clearChat}
				>
					Clear Chat
				</button>
			</div>
		</form>
	</div>
</main>
