<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileTree from '$lib/components/ui/FileTree.svelte';
	import type { FileNode } from '$lib/types/file-tree';

	const { Story } = defineMeta({
		title: 'Data/FileTree',
		component: FileTree,
		tags: ['autodocs'],
	});

	const simpleTree: FileNode[] = [
		{
			name: 'src',
			type: 'folder',
			children: [
				{ name: 'index.ts', type: 'file', meta: '0.5 KB' },
				{ name: 'utils.ts', type: 'file', meta: '1.2 KB' },
				{
					name: 'components',
					type: 'folder',
					children: [
						{ name: 'Button.svelte', type: 'file', meta: '1.1 KB' },
						{ name: 'Modal.svelte', type: 'file', meta: '1.5 KB' },
					]
				}
			]
		},
		{ name: 'package.json', type: 'file', meta: '2.1 KB' },
		{ name: 'README.md', type: 'file', meta: '3.4 KB' },
	];

	const deepTree: FileNode[] = [
		{
			name: 'project',
			type: 'folder',
			children: [
				{
					name: 'apps',
					type: 'folder',
					children: [
						{
							name: 'web',
							type: 'folder',
							children: [
								{ name: 'index.html', type: 'file' },
								{ name: 'app.ts', type: 'file' },
								{
									name: 'pages',
									type: 'folder',
									children: [
										{ name: 'home.svelte', type: 'file' },
										{ name: 'about.svelte', type: 'file' },
									]
								}
							]
						},
						{
							name: 'api',
							type: 'folder',
							children: [
								{ name: 'server.ts', type: 'file' },
								{ name: 'routes.ts', type: 'file' },
							]
						}
					]
				},
				{
					name: 'packages',
					type: 'folder',
					children: [
						{ name: 'ui', type: 'folder', children: [{ name: 'index.ts', type: 'file' }] },
						{ name: 'config', type: 'folder', children: [{ name: 'tsconfig.json', type: 'file' }] },
					]
				}
			]
		},
	];
</script>

<Story name="Simple" args={{ nodes: simpleTree }}>
	{#snippet children()}
		<div style="max-width: 400px;">
			<FileTree nodes={simpleTree} />
		</div>
	{/snippet}
</Story>

<Story name="Deep Nesting" args={{ nodes: deepTree }}>
	{#snippet children()}
		<div style="max-width: 400px;">
			<FileTree nodes={deepTree} />
		</div>
	{/snippet}
</Story>

<Story name="Single File" args={{ nodes: [{ name: 'README.md', type: 'file', meta: '1.2 KB' }] }}>
	{#snippet children()}
		<div style="max-width: 400px;">
			<FileTree nodes={[{ name: 'README.md', type: 'file', meta: '1.2 KB' }]} />
		</div>
	{/snippet}
</Story>
