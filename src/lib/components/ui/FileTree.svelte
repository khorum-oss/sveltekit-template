<script lang="ts">
	import FileTreeNode from './FileTreeNode.svelte';
	import type { FileNode } from '$lib/types/file-tree';

	interface Props {
		nodes: FileNode[];
		selectedPath?: string;
		onselect?: (path: string, node: FileNode) => void;
	}

	let { nodes, selectedPath = $bindable(''), onselect }: Props = $props();
</script>

<div class="rounded-lg border border-gray-200 bg-white text-sm" role="tree">
	<ul class="divide-y divide-gray-100">
		{#each nodes as node (node.name)}
			<FileTreeNode {node} path={node.name} {selectedPath} {onselect} depth={0} />
		{/each}
	</ul>
</div>
