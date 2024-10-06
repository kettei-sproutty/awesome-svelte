<script lang="ts">
	import { Search, LayoutGrid, List } from 'lucide-svelte';

	let { data } = $props();

	let search = $state('');
	let view = $state('grid');

	const filteredItems = $derived(
		data.components.filter(
			(item) =>
				(item.name as string).toLowerCase().includes(search.toLowerCase()) ||
				(item.author as string).toLowerCase().includes(search.toLowerCase())
		)
	);
</script>

<div class="container mx-auto p-4 space-y-4">
	<div class="flex items-center space-x-2 border rounded-md p-2">
		<Search class="w-5 h-5 text-gray-500" />
		<input
			type="search"
			placeholder="Search items..."
			bind:value={search}
			class="flex-grow outline-none w-full"
		/>
	</div>

	<div class="flex space-x-2">
		<button
			onclick={() => (view = 'grid')}
			class={`p-2 rounded-md ${view === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
			aria-label="Grid view"
		>
			<LayoutGrid class="h-5 w-5" />
		</button>
		<button
			onclick={() => (view = 'table')}
			class={`p-2 rounded-md ${view === 'table' ? 'bg-gray-200' : 'bg-white'}`}
			aria-label="Table view"
		>
			<List class="h-5 w-5" />
		</button>
	</div>

	{#if view === 'grid'}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each filteredItems as item (item.id)}
				<div class="border rounded-lg p-4 flex flex-col items-center">
					<h3 class="font-semibold">{item.name}</h3>
					<p class="text-sm text-gray-500">{item.author}</p>
				</div>
			{/each}
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="bg-gray-100">
						<th class="border p-2 text-left">Id</th>
						<th class="border p-2 text-left">Name</th>
						<th class="border p-2 text-left">Author</th>
						<th class="border p-2 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredItems as item (item.id)}
						<tr>
							<td class="border p-2">{item.id}</td>
							<td class="border p-2">{item.name}</td>
							<td class="border p-2">{item.author}</td>
							<td class="border p-2">
								<a href={`/${item.id}`} class="text-blue-500">View</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<pre>{JSON.stringify(data, undefined, '\t')}</pre>
