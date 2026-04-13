<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileTree from '$lib/components/ui/FileTree.svelte';

	const { Story } = defineMeta({
		title: 'Data/FileTree',
		component: FileTree,
		tags: ['autodocs'],
	});

	const simpleTree = [
		{
			name: 'src',
			type: 'folder' as const,
			children: [
				{ name: 'index.ts', type: 'file' as const, meta: '0.5 KB' },
				{ name: 'utils.ts', type: 'file' as const, meta: '1.2 KB' },
				{
					name: 'components',
					type: 'folder' as const,
					children: [
						{ name: 'Button.svelte', type: 'file' as const, meta: '1.1 KB' },
						{ name: 'Modal.svelte', type: 'file' as const, meta: '1.5 KB' },
					]
				}
			]
		},
		{ name: 'package.json', type: 'file' as const, meta: '2.1 KB' },
		{ name: 'README.md', type: 'file' as const, meta: '3.4 KB' },
	];

	const deepTree = [
		{
			name: 'project',
			type: 'folder' as const,
			children: [
				{
					name: 'apps',
					type: 'folder' as const,
					children: [
						{
							name: 'web',
							type: 'folder' as const,
							children: [
								{ name: 'index.html', type: 'file' as const },
								{ name: 'app.ts', type: 'file' as const },
								{
									name: 'pages',
									type: 'folder' as const,
									children: [
										{ name: 'home.svelte', type: 'file' as const },
										{ name: 'about.svelte', type: 'file' as const },
									]
								}
							]
						},
						{
							name: 'api',
							type: 'folder' as const,
							children: [
								{ name: 'server.ts', type: 'file' as const },
								{ name: 'routes.ts', type: 'file' as const },
							]
						}
					]
				},
				{
					name: 'packages',
					type: 'folder' as const,
					children: [
						{ name: 'ui', type: 'folder' as const, children: [{ name: 'index.ts', type: 'file' as const }] },
						{ name: 'config', type: 'folder' as const, children: [{ name: 'tsconfig.json', type: 'file' as const }] },
					]
				}
			]
		},
	];
</script>

<Story name="Simple">
	<div style="max-width: 400px;">
		<FileTree nodes={simpleTree} />
	</div>
</Story>

<Story name="Deep Nesting">
	<div style="max-width: 400px;">
		<FileTree nodes={deepTree} />
	</div>
</Story>

<Story name="Single File">
	<div style="max-width: 400px;">
		<FileTree nodes={[{ name: 'README.md', type: 'file', meta: '1.2 KB' }]} />
	</div>
</Story>
