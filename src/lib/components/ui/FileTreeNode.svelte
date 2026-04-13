<script lang="ts">
	import type { FileNode } from '$lib/types/file-tree';
	import FileTreeNode from './FileTreeNode.svelte';

	interface Props {
		node: FileNode;
		path: string;
		selectedPath: string;
		onselect?: (path: string, node: FileNode) => void;
		depth: number;
	}

	let { node, path, selectedPath, onselect, depth }: Props = $props();
	let expanded = $state(false);

	const isFolder = $derived(node.type === 'folder');
	const isSelected = $derived(path === selectedPath);

	function handleClick() {
		if (isFolder) {
			expanded = !expanded;
		}
		onselect?.(path, node);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	}
</script>

<li role="treeitem" aria-selected={isSelected} aria-expanded={isFolder ? expanded : undefined}>
	<button
		class="flex w-full items-center gap-2 px-3 py-1.5 text-left transition-colors
			{isSelected ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}"
		style="padding-left: {depth * 16 + 12}px"
		onclick={handleClick}
		onkeydown={handleKeydown}
	>
		<!-- Expand/collapse arrow for folders -->
		{#if isFolder}
			<svg
				class="h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform {expanded ? 'rotate-90' : ''}"
				fill="none" viewBox="0 0 24 24" stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		{:else}
			<span class="w-3.5 shrink-0"></span>
		{/if}

		<!-- Icon -->
		{#if isFolder}
			<svg class="h-4 w-4 shrink-0 {expanded ? 'text-indigo-500' : 'text-amber-500'}" fill="currentColor" viewBox="0 0 20 20">
				{#if expanded}
					<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v1H2V6z" />
					<path fill-rule="evenodd" d="M2 9h16v5a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" clip-rule="evenodd" />
				{:else}
					<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
				{/if}
			</svg>
		{:else}
			<svg class="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
			</svg>
		{/if}

		<!-- Name -->
		<span class="flex-1 truncate {isFolder ? 'font-medium' : ''}">{node.name}</span>

		<!-- Meta (file size, date, etc.) -->
		{#if node.meta}
			<span class="shrink-0 text-xs text-gray-400">{node.meta}</span>
		{/if}
	</button>

	{#if isFolder && expanded && node.children}
		<ul role="group">
			{#each node.children as child (child.name)}
				<FileTreeNode
					node={child}
					path="{path}/{child.name}"
					{selectedPath}
					{onselect}
					depth={depth + 1}
				/>
			{/each}
		</ul>
	{/if}
</li>
