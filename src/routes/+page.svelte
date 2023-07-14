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
	import IconUser from '$lib/components/IconUser.svelte';
	import IconNewChat from '$lib/components/IconNewChat.svelte';
	import IconSendMessage from '$lib/components/IconSendMessage.svelte';
	import ChatFooter from '$lib/components/ChatFooter.svelte';
	import IconStop from '$lib/components/IconStop.svelte';
	import IconRegenerate from '$lib/components/IconRegenerate.svelte';

	marked.use({
		headerIds: false,
		mangle: false
	});

	onMount(() => {
		prism.highlightAll();
	});

	afterUpdate(() => {
		prism.highlightAll();
	});

	const { messages, handleSubmit, input, setMessages, isLoading, stop, reload } = useChat({
		initialMessages: [{ role: 'system', content: prompt, id: '0' }]
	});

	// function that will reset the messages array
	function clearChat() {
		setMessages([{ role: 'system', content: prompt, id: '0' }]);
	}

	// allows the user to submit the form by pressing enter
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit(event);
		}
	}
</script>

<main class="flex flex-col flex-1 pb-[200px] pt-4 md:pt-10">
	<div class="px-10">
		{#each $messages as message}
			<div class="flex justify-center">
				<div class="flex flex-col w-full lg:w-[650px]">
					{#if message.id === '0'}
						<div class="text-white p-4 border border-dark rounded-lg bg-black">
							<h1 class="mb-2 text-md text-white font-md">
								Welcome! I'm here to assist you with analyzing and improving your code. Please
								provide a code snippet, and I'll provide suggestions.
							</h1>
						</div>
					{:else}
						<div class="flex border-t-2 border-dark">
							{#if message.role === 'user'}
								<IconUser props="flex-shrink-0 inline w-6 h-6 mr-2 mt-5" />
								<div class="text-gray-200 p-2 rounded-md py-4">
									{message.content}
								</div>
							{:else}
								<IconOpenAi props="flex-shrink-0 inline w-6 h-6 mr-2 mt-5" />
								<div class="text-gray-200 p-2 rounded-md py-4">
									{@html marked(message.content)}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<div class="flex fixed inset-x-0 bottom-24 sm:bottom-36 justify-center">
		{#if $isLoading && $messages.length > 1}
			<button
				on:click={() => stop()}
				class="text-gray-200 inline-flex items-center justify-center rounded-md text-sm font-medium shadow border hover:bg-gray-200 hover:text-black h-8 px-4 py-2 bg-black"
				><IconStop />Stop generating</button
			>
		{:else if $messages.length > 1 && !$isLoading}
			<button
				on:click={() => reload()}
				class="text-gray-200 inline-flex items-center justify-center rounded-md text-sm font-medium shadow border hover:bg-gray-200 hover:text-black h-8 px-4 py-2"
				><IconRegenerate />Regenerate response</button
			>
		{/if}
	</div>
	<div class="fixed bottom-0 flex justify-center w-full">
		<div
			class="w-full lg:w-7/12 space-y-4 border-dark border-t px-4 py-2 sm:rounded-t-xl sm:border md:py-4 bg-black"
		>
			<form id="myForm" on:submit={handleSubmit}>
				<div
					class="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-black sm:rounded-md sm:border border-dark sm:px-12"
				>
					<button
						class="inline-flex items-center justify-center text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border absolute left-0 top-4 h-8 w-8 rounded-full bg-transparent hover:bg-red-400 p-0 sm:left-4"
						data-state="closed"
						on:click={clearChat}
						><IconNewChat /><span class="sr-only focus:not-sr-only">New Chat</span></button
					><textarea
						bind:value={$input}
						on:keydown={handleKeyDown}
						tabindex="0"
						rows="1"
						placeholder="Send a message."
						spellcheck="false"
						class="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm text-gray-200"
						style="height: 62px !important;"
					/>
					<div class="absolute right-0 top-4 sm:right-4">
						<button
							class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-primary-foreground shadow-md hover:bg-green-500 h-8 w-8 p-0"
							type="submit"
							data-state="closed"
							><IconSendMessage /><span class="sr-only">Send message</span></button
						>
					</div>
				</div>
			</form>
			<ChatFooter />
		</div>
	</div>
</main>
