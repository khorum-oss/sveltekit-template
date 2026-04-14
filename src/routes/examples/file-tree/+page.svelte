<script lang="ts">
	import FileTree from '$lib/components/ui/FileTree.svelte';
	import type { FileNode } from '$lib/types/file-tree';
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	let selectedPath = $state('');
	let selectedNode = $state<FileNode | null>(null);

	const projectTree: FileNode[] = [
		{
			name: 'src',
			type: 'folder',
			children: [
				{
					name: 'lib',
					type: 'folder',
					children: [
						{
							name: 'components',
							type: 'folder',
							children: [
								{
									name: 'ui',
									type: 'folder',
									children: [
										{ name: 'Button.svelte', type: 'file', meta: '1.2 KB' },
										{ name: 'DataTable.svelte', type: 'file', meta: '3.8 KB' },
										{ name: 'FileTree.svelte', type: 'file', meta: '0.8 KB' },
										{ name: 'Modal.svelte', type: 'file', meta: '1.5 KB' },
										{ name: 'Card.svelte', type: 'file', meta: '0.9 KB' },
										{ name: 'Badge.svelte', type: 'file', meta: '0.6 KB' },
									]
								},
								{
									name: 'layout',
									type: 'folder',
									children: [
										{ name: 'AppShell.svelte', type: 'file', meta: '1.8 KB' },
										{ name: 'TopNav.svelte', type: 'file', meta: '1.4 KB' },
										{ name: 'LeftNav.svelte', type: 'file', meta: '1.1 KB' },
									]
								}
							]
						},
						{
							name: 'stores',
							type: 'folder',
							children: [
								{ name: 'auth.ts', type: 'file', meta: '1.6 KB' },
								{ name: 'data-source.ts', type: 'file', meta: '0.9 KB' },
								{ name: 'example.ts', type: 'file', meta: '1.3 KB' },
							]
						},
						{
							name: 'data',
							type: 'folder',
							children: [
								{ name: 'types.ts', type: 'file', meta: '0.5 KB' },
								{ name: 'registry.ts', type: 'file', meta: '0.7 KB' },
								{
									name: 'sources',
									type: 'folder',
									children: [
										{ name: 'mocked', type: 'folder', children: [{ name: 'example.mock.ts', type: 'file', meta: '1.2 KB' }] },
										{ name: 'api', type: 'folder', children: [{ name: 'example.api.ts', type: 'file', meta: '0.8 KB' }] },
										{ name: 'local-db', type: 'folder', children: [{ name: 'example.db.ts', type: 'file', meta: '0.8 KB' }] },
									]
								}
							]
						}
					]
				},
				{
					name: 'routes',
					type: 'folder',
					children: [
						{ name: '+layout.svelte', type: 'file', meta: '0.3 KB' },
						{ name: '+page.svelte', type: 'file', meta: '2.1 KB' },
						{ name: 'login', type: 'folder', children: [{ name: '+page.svelte', type: 'file', meta: '2.8 KB' }] },
						{ name: 'settings', type: 'folder', children: [{ name: '+page.svelte', type: 'file', meta: '1.9 KB' }] },
					]
				},
				{ name: 'app.html', type: 'file', meta: '0.3 KB' },
				{ name: 'hooks.server.ts', type: 'file', meta: '2.0 KB' },
			]
		},
		{ name: 'package.json', type: 'file', meta: '2.1 KB' },
		{ name: 'Dockerfile', type: 'file', meta: '0.8 KB' },
		{ name: 'svelte.config.js', type: 'file', meta: '0.5 KB' },
		{ name: 'tsconfig.json', type: 'file', meta: '0.3 KB' },
	];

	function handleSelect(path: string, node: FileNode) {
		selectedPath = path;
		selectedNode = node;
	}
</script>

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Examples', href: '/examples' }, { label: 'File Tree' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">File Tree</h1>
		<p class="mt-1 text-sm text-gray-500">Expandable file/folder tree with selection. Click folders to expand, files to select.</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<Card title="Project Structure">
			<FileTree nodes={projectTree} bind:selectedPath onselect={handleSelect} />
		</Card>

		<Card title="Selected Item">
			{#if selectedNode}
				<dl class="space-y-3">
					<div>
						<dt class="text-xs font-medium text-gray-500">Path</dt>
						<dd class="mt-1 font-mono text-sm text-gray-900">{selectedPath}</dd>
					</div>
					<div>
						<dt class="text-xs font-medium text-gray-500">Type</dt>
						<dd class="mt-1 text-sm text-gray-900">{selectedNode.type}</dd>
					</div>
					{#if selectedNode.meta}
						<div>
							<dt class="text-xs font-medium text-gray-500">Size</dt>
							<dd class="mt-1 text-sm text-gray-900">{selectedNode.meta}</dd>
						</div>
					{/if}
					{#if selectedNode.children}
						<div>
							<dt class="text-xs font-medium text-gray-500">Children</dt>
							<dd class="mt-1 text-sm text-gray-900">{selectedNode.children.length} items</dd>
						</div>
					{/if}
				</dl>
			{:else}
				<p class="text-sm text-gray-500">Click a file or folder to see details.</p>
			{/if}
		</Card>
	</div>
</div>
