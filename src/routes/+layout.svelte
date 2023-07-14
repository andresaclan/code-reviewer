<script>
	import IconGitHub from '$lib/components/IconGitHub.svelte';
	import IconOpenAi from '$lib/components/IconOpenAI.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<header
		class="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center border-dark-900 border-b bg-gradient-to-b from-black/10 via-black/50 to-black/80 px-4 backdrop-blur-xl"
	>
		<div class="flex space-x-2 flex-grow">
			<h1 class="text-[#808080] text-sm font-semibold sm:text-lg">
				Made with OpenAI <IconOpenAi fill="gray" props="flex-shrink-0 inline w-6 h-6 mb-1 ml-1" />
			</h1>
		</div>
		<IconGitHub />
	</header>
	<slot />
</div>
