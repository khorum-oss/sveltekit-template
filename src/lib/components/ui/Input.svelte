<script lang="ts">
	interface Props {
		id?: string;
		type?: string;
		value?: string;
		placeholder?: string;
		label?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		oninput?: (e: Event) => void;
	}

	let { id, type = 'text', value = $bindable(''), placeholder, label, error, required = false, disabled = false, oninput }: Props = $props();
</script>

<div>
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
	{/if}
	<input
		{id}
		{type}
		{placeholder}
		{required}
		{disabled}
		{oninput}
		bind:value
		class="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none {error
			? 'border-red-300 focus:border-red-500 focus:ring-red-500'
			: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}"
	/>
	{#if error}
		<p class="mt-1 text-sm text-red-600">{error}</p>
	{/if}
</div>
